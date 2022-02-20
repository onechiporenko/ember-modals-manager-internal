import PromptModal from './prompt';

/**
 * Check-confirm-modal
 *
 * @class CheckConfirmModal
 * @namespace Components
 * @extends Components.PromptModal
 */
export default class CheckConfirmModal extends PromptModal {
  promptValue = false;

  protected readonly simplifiedInput = true;

  protected get confirmDisabled(): boolean {
    return !this.promptValue;
  }
}
