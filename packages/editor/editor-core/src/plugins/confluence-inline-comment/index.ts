import { EditorPlugin } from '../../types';
import { confluenceInlineComment } from '@atlaskit/adf-schema';

// tslint:disable-next-line:variable-name
const confluenceInlineCommentPlugin: EditorPlugin = {
  marks() {
    return [
      {
        name: 'confluenceInlineComment',
        mark: confluenceInlineComment,
      },
    ];
  },
};

export default confluenceInlineCommentPlugin;
