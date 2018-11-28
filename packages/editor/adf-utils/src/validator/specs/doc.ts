export default {
  props: {
    version: { type: 'enum', values: [1] },
    type: { type: 'enum', values: ['doc'] },
    content: {
      type: 'array',
      items: [
        [
          'paragraph_with_no_marks',
          'paragraph_with_marks',
          'bulletList',
          'mediaSingle',
          'table',
          'codeBlock_with_no_marks',
          'codeBlock_with_marks',
          'orderedList',
          'heading_with_no_marks',
          'heading_with_marks',
          'panel',
          'blockquote',
          'rule',
          'mediaGroup',
          'applicationCard',
          'decisionList',
          'taskList',
          'extension',
          'bodiedExtension',
          'blockCard',
          'layoutSection',
        ],
      ],
      allowUnsupportedBlock: true,
    },
  },
};
