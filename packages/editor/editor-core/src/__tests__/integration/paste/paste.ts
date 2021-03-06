import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  getDocFromElement,
  clipboardHelper,
  clipboardInput,
  copyAsPlaintextButton,
  copyAsHTMLButton,
  gotoEditor,
} from '../_helpers';

const editorSelector = '.ProseMirror';

BrowserTestCase(
  'paste.ts: paste tests on message editor: plain text',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const sample = new Page(client);
    await sample.goto(clipboardHelper);
    await sample.isVisible(clipboardInput);
    await sample.type(clipboardInput, 'This text is plain.');
    await sample.click(copyAsPlaintextButton);

    await gotoEditor(sample);
    await sample.waitFor(editorSelector);
    await sample.paste(editorSelector);

    await sample.waitForSelector('p');
    const doc = await sample.$eval(editorSelector, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'paste.ts: paste tests on message editor: text formatting',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const sample = new Page(client);
    await sample.goto(clipboardHelper);
    await sample.isVisible(clipboardInput);
    const testData =
      '<strong>bold </strong><em><strong>italics and bold </strong>some italics only </em><span class="code" style="font-family: monospace; white-space: pre-wrap;">add some code to this </span><u>underline this text</u><s> strikethrough </s><span style="color: rgb(0, 184, 217);">blue is my fav color</span> <a href="http://www.google.com">www.google.com</a>';
    await sample.type(clipboardInput, testData);
    await sample.click(copyAsHTMLButton);

    await gotoEditor(sample);
    await sample.waitFor(editorSelector);
    await sample.paste(editorSelector);

    await sample.waitForSelector('strong');
    const doc = await sample.$eval(editorSelector, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'paste.ts: paste tests on message editor: bullet list',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const sample = new Page(client);
    await sample.goto(clipboardHelper);
    await sample.isVisible(clipboardInput);
    await sample.type(
      clipboardInput,
      '<ul><li><p>list ele 1</p></li><li><p>list ele 2</p><ul><li><p>more ele 1</p></li><li><p>more ele 2</p></li></ul></li><li><p>this is the last ele</p></li></ul>',
    );
    await sample.click(copyAsHTMLButton);

    await gotoEditor(sample);
    await sample.waitFor(editorSelector);
    await sample.paste(editorSelector);

    await sample.waitForSelector('ul');
    const doc = await sample.$eval(editorSelector, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'paste.ts: paste tests on message editor: ordered list',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const sample = new Page(client);
    await sample.goto(clipboardHelper);
    await sample.isVisible(clipboardInput);
    await sample.type(
      clipboardInput,
      '<ol><li><p>this is ele1</p></li><li><p>this is a link <a href="http://www.google.com">www.google.com</a></p><ol><li><p>more elements with some <strong>format</strong></p></li><li><p>some addition<em> formatting</em></p></li></ol></li><li><p>last element</p></li></ol>',
    );
    await sample.click(copyAsHTMLButton);

    await gotoEditor(sample);
    await sample.waitFor(editorSelector);
    await sample.paste(editorSelector);

    await sample.waitForSelector('p');
    const doc = await sample.$eval(editorSelector, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
