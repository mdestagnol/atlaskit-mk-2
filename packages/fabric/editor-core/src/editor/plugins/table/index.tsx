import * as React from 'react';
import {
  table,
  tableCell,
  tableHeader,
  tableRow,
} from '@atlaskit/editor-common';
import { tableEditing, columnResizing } from 'prosemirror-tables';
import { EditorPlugin } from '../../types';
import { plugin, stateKey } from '../../../plugins/table';
import hoverSelectionPlugin from './hover-selection-plugin';
import tableColumnResizingPlugin from './table-column-resizing-plugin';
import TableFloatingToolbar from '../../../ui/TableFloatingToolbar';

const tablesPlugin: EditorPlugin = {
  nodes() {
    return [
      { rank: 1700, name: 'table', node: table },
      { rank: 1800, name: 'tableHeader', node: tableHeader },
      { rank: 1900, name: 'tableRow', node: tableRow },
      { rank: 2000, name: 'tableCell', node: tableCell },
    ];
  },

  pmPlugins() {
    return [
      {
        rank: 900,
        plugin: ({
          props: { allowTableColumnResizing: allowColumnResizing },
        }) =>
          plugin({
            allowColumnResizing,
          }),
      },
      {
        rank: 910,
        plugin: ({ props }) =>
          props.allowTableColumnResizing
            ? columnResizing({ handleWidth: 6 })
            : undefined,
      },
      {
        rank: 920,
        plugin: ({ props }) =>
          props.allowTableColumnResizing
            ? tableColumnResizingPlugin
            : undefined,
      },
      { rank: 930, plugin: () => tableEditing() },
      { rank: 940, plugin: () => hoverSelectionPlugin },
    ];
  },

  contentComponent({ editorView, popupsMountPoint, popupsBoundariesElement }) {
    const pluginState = stateKey.getState(editorView.state);

    return (
      <TableFloatingToolbar
        editorView={editorView}
        pluginState={pluginState}
        popupsMountPoint={popupsMountPoint}
        popupsBoundariesElement={popupsBoundariesElement}
      />
    );
  },
};

export default tablesPlugin;
