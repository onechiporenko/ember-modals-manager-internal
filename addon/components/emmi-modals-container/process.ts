import Base from './base';
import {
  EmmiConfirmPayload,
  EmmiDeclinePayload,
} from '../../services/emmi-modals-manager';

/**
 * Here `process` means function thar return Promise
 *
 * @class Process
 * @namespace Components
 * @extends Components.BaseModal
 */
export default class ProcessModal extends Base {
  didInsertElement(): void {
    const process = this.options.process;
    if (process) {
      process()
        .then((v: EmmiConfirmPayload): void => this.send('confirm', v))
        .catch((e: EmmiDeclinePayload): void => this.send('decline', e));
    }
  }
}
