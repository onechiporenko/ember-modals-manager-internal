import BaseModal from './base';
import {action, computed, get, set} from '@ember/object';
import {isEmpty} from '@ember/utils';

/**
 * Prompt-modal
 *
 * @class PromptModal
 * @namespace Components
 * @extends Components.BaseModal
 */
export default class PromptModal extends BaseModal {
  /**
   * @property promptValue
   * @type string
   * @default ''
   * @protected
   * @readonly
   */
  promptValue = '';

  /**
   * @property inputType
   * @type string
   * @default 'text'
   * @protected
   * @readonly
   */
  inputType = 'text';

  /**
   * @property confirmDisabled
   * @type boolean
   * @default true
   * @protected
   * @readonly
   */
  @computed('promptValue', 'options.disallowEmpty')
  get confirmDisabled () {
    return get(this, 'options.disallowEmpty') ? isEmpty(get(this, 'promptValue')) : false;
  }

  /**
   * @event confirm
   */
  @action
  confirm() {
    super.confirm(get(this, 'promptValue'));
  }

  /**
   * @event updatePromptValue
   * @param {*} val
   */
  @action
  updatePromptValue(val) {
    set(this, 'promptValue', val);
  }

}
