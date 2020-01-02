import PromptModal from './prompt';
import {computed, get} from '@ember/object';

/**
 * Prompt-confirm-modal
 *
 * @class PromptConfirmModal
 * @namespace Components
 * @extends Components.PromptModal
 */
export default class PromptConfirmModal extends PromptModal {

  /**
   * @property confirmDisabled
   * @type boolean
   * @default true
   * @protected
   * @readonly
   */
  @computed('promptValue', 'options.promptValue')
  get confirmDisabled () {
    return get(this, 'promptValue') !== get(this, 'options.promptValue');
  }
}
