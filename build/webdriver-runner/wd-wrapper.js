//TODO :move this to a new npm-pkg
const webdriverio = require('webdriverio');

export default class Page {
  constructor(client) {
    this.browser = client;
  }
  // Navigation
  goto(url) {
    return this.browser.url(url);
  }

  // Get
  getAttribute(selector, attributeName) {
    return this.browser.getAttribute(selector, attributeName);
  }
  getCssProperty(selector, cssProperty) {
    return this.browser.getCssProperty(selector, cssProperty);
  }
  getElementSize(selector, prop) {
    return this.browser.getElementSize(selector, prop);
  }
  getText(selector) {
    return this.browser.getText(selector);
  }
  getTitle() {
    return this.browser.getTitle();
  }
  getUrl() {
    return this.browser.getUrl();
  }
  getValue(selector) {
    return this.browser.getValue(selector);
  }
  // Protocol
  back() {
    return this.browser.back();
  }

  // Selenium Actions
  addValue(selector, values) {
    return this.browser.addValue(selector, values);
  }
  clearElement(selector) {
    return this.browser.clearElement(selector);
  }
  click(selector) {
    return this.browser.click(selector);
  }
  doubleClick(selector) {
    return this.browser.doubleClick(selector);
  }
  dragAndDrop(sourceElem, destinationElem) {
    return this.browser.dragAndDrop(sourceElem, destinationElem);
  }
  element(selector) {
    return this.browser.element(selector);
  }
  elements(selector) {
    return this.browser.elements(selector);
  }
  keys(value) {
    return this.browser.keys(value); // more documentation - https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions
  }
  select(selector) {
    return this.browser.element(selector);
  }
  selectByAttribute(selector, attribute, value) {
    return this.browser.selectByAttribute(selector, attribute, value);
  }
  selectByValue(selector, value) {
    return this.browser.selectByValue(selector, value);
  }
  selectByVisibleText(selector, text) {
    return this.browser.selectByVisibleText(selector, text);
  }
  setValue(selector, values) {
    return this.browser.setValue(selector, values);
  }
  // State
  hasFocus(selector) {
    return this.browser.hasFocus(selector);
  }
  isEnabled(selector) {
    return this.browser.isEnabled(selector);
  }
  isVisible(selector) {
    return this.browser.isVisible(selector);
  }
  // Wait
  waitForSelector(selector) {
    return this.browser.waitForSelector(selector);
  }
  waitForVisible(selector, [, ms], [, reverse]) {
    return this.browser.waitForVisible(selector, [, ms], [, reverse]);
  }
  // Window
  // close
  // getViewportSize
  // setViewPortSize
  // switchTab
}
//TODO: Maybe wrapping all functions?
async function wrapper(fn) {
  return fn;
}
