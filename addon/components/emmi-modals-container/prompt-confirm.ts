import PromptModal from './prompt';

/**
 * Prompt-confirm-modal
 *
 * @class PromptConfirmModal
 * @namespace Components
 * @extends Components.PromptModal
 */
export default class PromptConfirmModal extends PromptModal {
  get confirmDisabled(): boolean {
    return this.promptValue !== this.options.promptValue;
  }
}
