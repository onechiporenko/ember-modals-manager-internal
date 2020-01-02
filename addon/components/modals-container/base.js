import Component from '@ember/component';
import {action, get} from '@ember/object';

/**
 * Base Components for modals. All of them extends this one
 *
 * @class BaseModal
 * @namespace Components
 * @extends Ember.Component
 */
export default class BaseModal extends Component {

  /**
   * @property modalIsOpened
   * @type boolean
   * @default false
   * @protected
   * @readonly
   */
  modalIsOpened = false;

  /**
   * @property options
   * @type object
   * @default null
   * @protected
   */
  options = null;

  /**
   * @event onConfirm
   */
  onConfirm = null;

  /**
   * @event onDecline
   */
  onDecline = null;

  /**
   * @param {*} [v]
   */
  @action
  confirm(v) {
    get(this, 'onConfirm')(v);
  }

  /**
   * @param {*} [v]
   */
  @action
  decline(v) {
    get(this, 'onDecline')(v);
  }
}
