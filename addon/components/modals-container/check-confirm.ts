import PromptModal from './prompt';
import { not } from '@ember/object/computed';

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

  @not('promptValue')
  protected readonly confirmDisabled: boolean;
}
