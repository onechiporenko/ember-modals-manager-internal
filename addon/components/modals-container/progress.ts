import Base from './base';
import { action, computed, set } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { later } from '@ember/runloop';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { EmmiConfirmPayload, EmmiDeclinePayload, EmmiPromiseFactory } from 'dummy';
import RSVP from 'rsvp';

/**
 * Here `promises` means functions that return Promise
 *
 * @class ProgressModal
 * @namespace Components
 * @extends Components.BaseModal
 */
export default class ProgressModal<T> extends Base {

  /**
   * Number of fulfilled promises
   */
  done = 0;

  /**
   * Number of promises
   *
   * This value is set initially and must be used instead of `promises.length`,
   * because `promises`-array is changed while execution
   */
  promisesCount = 0;

  canceled = false;

  @readOnly('options.settled')
  protected readonly settled: boolean;

  protected errors = A<EmmiDeclinePayload>([]);

  protected results = A<EmmiConfirmPayload>([]);

  /**
   * List of promises to fulfill
   */
  @readOnly('options.promises')
  protected readonly promises: EmmiPromiseFactory[];

  @computed('done', 'promisesCount')
  get progress(): number {
    if (!this.promisesCount) {
      return 100;
    }
    return this.done / this.promisesCount * 100;
  }

  @action
  cancel(): void {
    set(this, 'canceled', true);
  }

  didInsertElement(): void {
    set(this, 'promisesCount', this.promises.length);
    const promise = this.promises.shift();
    if (promise) {
      void this.next(promise);
    }
  }

  next(promiseFactory: EmmiPromiseFactory): RSVP.Promise<T> | void {
    if (this.canceled) {
      return this._complete();
    }
    return promiseFactory()
      .then((result: T) => {
        this._next(result);
        return result;
      })
      .catch(<EmmiDeclinePayload>(error: EmmiDeclinePayload): EmmiDeclinePayload => {
        if (this.settled) {
          this.errors.pushObject(error);
          this._next();
        } else {
          this.send('decline', [this.results, error]);
        }
        return error;
      });
  }

  _next(result?: EmmiConfirmPayload): void {
    run(() => {
      if (arguments.length === 1) {
        this.results.pushObject(result);
      }
      this.incrementProperty('done');
    });
    const promise = this.promises.shift();
    if (promise) {
      void this.next(promise);
    } else {
      // wait for last "tick" animation
      this._complete();
    }
  }

  _complete(): void {
    later(() => this.send('confirm', this.settled ? [this.results, this.errors] : this.results), 500);
  }

}
