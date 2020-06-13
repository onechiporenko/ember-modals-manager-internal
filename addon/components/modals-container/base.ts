import Component from '@ember/component';
import {action} from '@ember/object';
import { EmmiConfirmPayload, EmmiDeclinePayload, EmmiModalOptions } from 'dummy';

/**
 * Base Components for modals. All of them extends this one
 */
export default class BaseModal extends Component {

  protected modalIsOpened = false;

  protected options: EmmiModalOptions = {} as EmmiModalOptions;

  /**
   * @event onConfirm
   */
  onConfirm: (v: EmmiConfirmPayload) => void;

  /**
   * @event onDecline
   */
  onDecline: (v: EmmiDeclinePayload) => void;

  @action
  confirm(v: EmmiConfirmPayload): void {
    this.onConfirm(v);
  }

  @action
  decline(v: EmmiDeclinePayload): void {
    this.onDecline(v);
  }
}
