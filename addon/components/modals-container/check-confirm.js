import PromptModal from './prompt';
import {not} from '@ember/object/computed';

/**
 * Check-confirm-modal
 *
 * @class CheckConfirmModal
 * @namespace Components
 * @extends Components.PromptModal
 */
export default PromptModal.extend({

  /**
   * @property promptValue
   * @type boolean
   * @default false
   * @private
   * @readonly
   */
  promptValue: false,

  /**
   * @property simplifiedInput
   * @type boolean
   * @default true
   * @private
   * @readonly
   */
  simplifiedInput: true,

  /**
   * @property confirmDisabled
   * @type boolean
   * @default true
   * @private
   * @readonly
   */
  confirmDisabled: not('promptValue')
});
