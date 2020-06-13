import {click, find, fillIn} from '@ember/test-helpers';

export function getConfirmButtonState(selector: string): (a: Assert, s: boolean) => void {
  return function (assert: Assert, state: boolean): void {
    const btn = document.querySelector<HTMLButtonElement>(selector);
    state ?
      assert.ok(btn?.disabled) :
      assert.ok(!btn?.disabled);
  }
}

export function getConfirmModal(selector: string): () => void {
  return async function (): Promise<void> {
    return await click(selector);
  }
}

export function getDeclineModal(selector: string): () => void {
  return async function (): Promise<void> {
    await click(selector);
  }
}

export function getCustomModalText(selectorsMap: {[key: string]: string}): (a: Assert, p: string, t: string) => void {
  return function (assert: Assert, part: string, text: string) {
    const el: HTMLElement = find(selectorsMap[part]) as HTMLElement;
    assert.ok(el?.innerText.includes(text), `${part} has "${text}"`);
  }
}

export async function lastLogMessageAssert(assert: Assert, msg: string): Promise<void> {
  const lastLogMsg = await find('.logs')?.innerHTML?.split('<br>').slice(0, -1).pop()?.trim();
  assert.equal(lastLogMsg, msg);
}

export function getModalIsOpened(selector: string): (a: Assert, e: boolean) => void {
  return async function (assert: Assert, expected: boolean): Promise<void> {
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

export async function openModal(type: string): Promise<void> {
  return await click(`button.${type}-modal`);
}

export function getPromptValue(selector: string): (v: string) => void {
  return async function (val: string): Promise<void> {
    await fillIn(selector, val);
  }
}
