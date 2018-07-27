import * as React from 'react';
import styled from 'styled-components';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { akBorderRadius, akColorB200 } from '@atlaskit/util-shared-styles';
import {
  timestampToString,
  timestampToTaskContext,
  isPastDate,
} from '@atlaskit/editor-common';
import { Date } from '@atlaskit/date';
import { setDatePickerAt } from '../actions';
import { defaultEditorFontStyles } from '../../../styles';

const SelectableDate = styled(Date)`
  ${defaultEditorFontStyles};

  .ProseMirror-selectednode & {
    display: 'relative';
    &:before {
      content: '';
      border: 2px solid ${akColorB200};
      display: 'absolute';
      background: transparent;
      border-radius: ${akBorderRadius};
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
`;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

export default class DateNodeView extends React.Component<Props> {
  render() {
    const {
      attrs: { timestamp },
    } = this.props.node;
    const {
      view: {
        state: { schema, selection },
      },
    } = this.props;
    const parent = selection.$from.parent;
    const withinIncompleteTask =
      parent.type === schema.nodes.taskItem && parent.attrs.state !== 'DONE';

    const color =
      withinIncompleteTask && isPastDate(timestamp) ? 'red' : undefined;

    return (
      <SelectableDate
        id={Math.random().toString()}
        color={color}
        value={timestamp}
        onClick={this.handleClick}
      >
        {withinIncompleteTask
          ? timestampToTaskContext(timestamp)
          : timestampToString(timestamp)}
      </SelectableDate>
    );
  }

  private handleClick = (timestamp, event: React.SyntheticEvent<any>) => {
    event.nativeEvent.stopImmediatePropagation();
    const { state, dispatch } = this.props.view;
    setDatePickerAt(state.selection.from)(state, dispatch);
  };
}
