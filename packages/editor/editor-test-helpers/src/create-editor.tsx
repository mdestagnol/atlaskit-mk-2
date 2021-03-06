import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { CellSelection } from 'prosemirror-tables';
import { findCellClosestToPos } from 'prosemirror-utils';
import {
  EditorProps,
  EditorInstance,
  ReactEditorView,
  setTextSelection,
  getDefaultPluginsList,
  EditorPlugin,
  PortalProvider,
  PortalProviderAPI,
  PortalRenderer,
} from '@atlaskit/editor-core';
import { ProviderFactory } from '@atlaskit/editor-common';
import { mount } from 'enzyme';
import { RefsNode, Refs } from './schema-builder';
import { Schema } from 'prosemirror-model';
import { PluginKey } from 'prosemirror-state';
import patchEditorViewForJSDOM from './jsdom-fixtures';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';

class TestReactEditorView extends ReactEditorView<{
  plugins?: EditorPlugin[];
}> {
  getPlugins(editorProps: EditorProps): EditorPlugin[] {
    return (
      this.props.plugins ||
      super.getPlugins(editorProps, this.props.createAnalyticsEvent)
    );
  }
}

/**
 * Currently skipping these three failing tests
 * TODO: JEST-23 Fix these tests
 */

export type Options = {
  doc?: (schema: Schema) => RefsNode;
  // It needs to be any, otherwise TypeScript complains about mismatching types when dist folder exists
  editorPlugins?: any[];
  editorProps?: EditorProps;
  providerFactory?: ProviderFactory;
  pluginKey?: PluginKey;
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature;
};

export default function createEditorForTests<T = any>({
  doc,
  editorProps = {},
  editorPlugins,
  providerFactory,
  pluginKey,
  createAnalyticsEvent,
}: Options): EditorInstance & {
  portalProviderAPI: PortalProviderAPI;
  refs: Refs;
  sel: number;
  plugin: any;
  pluginState: T;
} {
  const plugins = editorPlugins
    ? [...getDefaultPluginsList(editorProps), ...editorPlugins]
    : undefined;
  const place = document.body.appendChild(document.createElement('div'));
  let portalProviderAPI;
  const wrapper = mount(
    <PortalProvider
      render={(portalProvider: any) => {
        portalProviderAPI = portalProvider;
        return (
          <IntlProvider locale="en">
            <>
              <TestReactEditorView
                editorProps={editorProps}
                createAnalyticsEvent={createAnalyticsEvent}
                portalProviderAPI={portalProvider}
                providerFactory={
                  providerFactory ? providerFactory : new ProviderFactory()
                }
                onEditorCreated={() => {}}
                onEditorDestroyed={() => {}}
                plugins={plugins}
              />
              <PortalRenderer portalProviderAPI={portalProviderAPI} />
            </>
          </IntlProvider>
        );
      }}
    />,
    { attachTo: place },
  );
  const editor = wrapper.find(TestReactEditorView);

  // Work around JSDOM/Node not supporting DOM Selection API
  if (!('getSelection' in window)) {
    // TODO JEST-23
    patchEditorViewForJSDOM((editor.instance() as ReactEditorView).view);
  }

  let refs;
  const { view: editorView } = editor.instance() as ReactEditorView;

  if (doc && editorView) {
    const { state, dispatch } = editorView;
    const defaultDoc = doc(state.schema);
    const tr = state.tr.replaceWith(
      0,
      state.doc.nodeSize - 2,
      defaultDoc.content,
    );

    tr.setMeta('addToHistory', false);
    dispatch(tr);

    refs = defaultDoc.refs;
    if (refs) {
      // Collapsed selection.
      if ('<>' in refs) {
        setTextSelection(editorView, refs['<>']);
        // Expanded selection
      } else if ('<' in refs || '>' in refs) {
        if ('<' in refs === false) {
          throw new Error('A `<` ref must complement a `>` ref.');
        }
        if ('>' in refs === false) {
          throw new Error('A `>` ref must complement a `<` ref.');
        }
        setTextSelection(editorView!, refs['<'], refs['>']);
      }
      // CellSelection
      else if (refs['<cell'] && refs['cell>']) {
        const { state } = editorView;
        const anchorCell = findCellClosestToPos(
          state.doc.resolve(refs['<cell']),
        );
        const headCell = findCellClosestToPos(state.doc.resolve(refs['cell>']));
        if (anchorCell && headCell) {
          dispatch(
            state.tr.setSelection(new CellSelection(
              state.doc.resolve(anchorCell.pos),
              state.doc.resolve(headCell.pos),
            ) as any),
          );
        }
      }
    }
  }

  let plugin;
  let pluginState;

  if (pluginKey) {
    plugin = pluginKey.get(editorView!.state);
    pluginState = pluginKey.getState(editorView!.state);
  }

  afterEach(() => {
    if (wrapper.length > 0) {
      wrapper.unmount();
    }
    wrapper.detach();
    if (place && place.parentNode) {
      place.parentNode.removeChild(place);
    }
  });

  const {
    eventDispatcher,
    config: {
      contentComponents,
      primaryToolbarComponents,
      secondaryToolbarComponents,
    },
  } = editor.instance() as ReactEditorView;
  return {
    portalProviderAPI,
    editorView: editorView!,
    eventDispatcher,
    contentComponents,
    primaryToolbarComponents,
    secondaryToolbarComponents,
    refs,
    sel: refs ? refs['<>'] : 0,
    plugin,
    pluginState,
  };
}
