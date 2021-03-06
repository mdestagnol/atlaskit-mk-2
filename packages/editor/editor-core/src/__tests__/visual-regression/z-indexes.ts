import { initEditor, clearEditor, snapshot } from './_utils';
import { messages as insertBlockMessages } from '../../plugins/insert-block/ui/ToolbarInsertBlock';
import { messages as blockTypeMessages } from '../../plugins/block-type/ui/ToolbarBlockType';

const table = `span[aria-label="${insertBlockMessages.table.defaultMessage}"]`;

const insertTable = async page => {
  await page.click(table);
  await page.waitForSelector('table td p');
};

const blockFormattingDropdown = `span[aria-label="${blockTypeMessages}"]`;
const removeTablePopup = '.pm-table-column-controls__button-wrap';
const dropList = 'div[data-role="droplistContent"]';
const insertBlockDropdown = `span[aria-label="${
  insertBlockMessages.insertMenu.defaultMessage
}"]`;
// const popupPresent = 'div[data-editor-popup="true"]';
const emojiButton = `span[aria-label="${
  insertBlockMessages.emoji.defaultMessage
}"]`;
const emojiPicker = 'div[data-emoji-picker-container="true"]';
const mentionButton = `span[aria-label="${
  insertBlockMessages.mention.defaultMessage
}"]`;
const mentionQuery = 'span[data-type-ahead-query]';

describe('Snapshot Test: z-indexes', () => {
  ['full-page', 'comment'].forEach(appearance => {
    let page;

    describe(`${appearance}`, () => {
      beforeAll(async () => {
        // @ts-ignore
        page = global.page;
        await initEditor(page, appearance);
      });

      beforeEach(async () => {
        await clearEditor(page);
      });

      // TODO enable after fixing selectors on tables
      it.skip('should always position table trash icon below dropdowns from main menu', async () => {
        await insertTable(page);
        await page.waitForSelector(removeTablePopup);
        await page.click(blockFormattingDropdown);
        await page.waitForSelector(dropList);
        await page.click(insertBlockDropdown);
        await page.waitForSelector(dropList);
        await snapshot(page);
      });

      it('should always position table trash icon below emoji picker', async () => {
        await insertTable(page);
        await page.waitForSelector(removeTablePopup);
        await page.click(emojiButton);
        await page.waitForSelector(emojiPicker);
        await page.click(mentionButton);
        await page.waitForSelector(mentionQuery);
        await snapshot(page);
      });
    });
  });
});
