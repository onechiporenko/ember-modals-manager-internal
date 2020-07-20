import PromptModal from './prompt';
import { computed } from '@ember/object';

/**
 * Prompt-confirm-modal
 *
 * @class PromptConfirmModal
 * @namespace Components
 * @extends Components.PromptModal
 */
export default class PromptConfirmModal extends PromptModal {

  @computed('promptValue', 'options.promptValue')
  get confirmDisabled(): boolean {
    return this.promptValue !== this.options.promptValue;
  }
}
