import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import BaseModal from './base';
import { EmmiConfirmPayload } from '../../services/emmi-modals-manager';

/**
 * Prompt-modal
 *
 * @class PromptModal
 * @namespace Components
 * @extends Components.BaseModal
 */
export default class PromptModal extends BaseModal {
  @tracked
  promptValue: EmmiConfirmPayload = '';

  inputType = 'text';

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
    this.promptValue = val;
  }
}
