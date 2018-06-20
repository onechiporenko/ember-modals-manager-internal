import {click, find, fillIn} from '@ember/test-helpers';
import $ from 'jquery';

export function getConfirmButtonState(selector) {
  return function (assert, state) {
    state ?
      assert.ok($(selector).is(':disabled')) :
      assert.ok($(selector).is(':enabled'));
  }
}

export function getConfirmModal(selector) {
  return async function () {
    return await click(selector);
  }
}

export function getDeclineModal(selector) {
  return async function () {
    await click(selector);
  }
}

export function getCustomModalText(selectorsMap) {
  return function (assert, part, text) {
    assert.ok(find(selectorsMap[part]).innerText.includes(text), `${part} has "${text}"`);
  }
}

export async function lastLogMessageAssert(assert, msg) {
  const lastLogMsg = await find('.logs').innerHTML.split('<br>').slice(0, -1).pop().trim();
  assert.equal(lastLogMsg, msg);
}

export function getModalIsOpened(selector) {
  return async function (assert, expected) {
    if (expected) {
      const modals = await find(selector);
      assert.ok(!!modals, 'modal is opened');
    }
    else {
      const modals = await find(selector);
      assert.notOk(!!modals, 'modal is not opened');
    }
  }
}

export async function openModal(type) {
  return await click(`button.${type}-modal`);
}

export function getPromptValue(selector) {
  return async function (val) {
    await fillIn(selector, val);
  }
}
