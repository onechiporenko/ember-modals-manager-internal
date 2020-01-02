import PromptModal from './prompt';
import {not} from '@ember/object/computed';

/**
 * Check-confirm-modal
 *
 * @class CheckConfirmModal
 * @namespace Components
 * @extends Components.PromptModal
 */
export default class CheckConfirmModal extends PromptModal {

  /**
   * @property promptValue
   * @type boolean
   * @default false
   * @protected
   * @readonly
   */
  promptValue = false;

  /**
   * @property simplifiedInput
   * @type boolean
   * @default true
   * @protected
   * @readonly
   */
  simplifiedInput = true;

  /**
   * @property confirmDisabled
   * @type boolean
   * @default true
   * @protected
   * @readonly
   */
  @not('promptValue')
  confirmDisabled;
}
