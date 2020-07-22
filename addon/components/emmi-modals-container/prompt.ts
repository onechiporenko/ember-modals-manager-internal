import BaseModal from './base';
import { action, computed, set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { EmmiConfirmPayload } from '../../services/emmi-modals-manager';

/**
 * Prompt-modal
 *
 * @class PromptModal
 * @namespace Components
 * @extends Components.BaseModal
 */
export default class PromptModal extends BaseModal {

  promptValue: EmmiConfirmPayload = '';

  inputType = 'text';

  @computed('promptValue', 'options.disallowEmpty')
  protected get confirmDisabled(): boolean {
    return this.options.disallowEmpty ? isEmpty(this.promptValue) : false;
  }

  /**
   * @event confirm
   */
  @action
  confirm(): void {
    super.confirm(this.promptValue);
  }

  /**
   * @event updatePromptValue
   * @param {*} val
   */
  @action
  updatePromptValue(val: string): void {
    set(this, 'promptValue', val);
  }

}
