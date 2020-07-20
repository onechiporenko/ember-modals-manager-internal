import { set } from '@ember/object';
import { assert } from '@ember/debug';
import Service from '@ember/service';
import { isArray } from '@ember/array';
import RSVP, { defer } from 'rsvp';
import { EmmiConfirmPayload, EmmiDeclinePayload, EmmiModalOptions } from 'ember-modals-manager-internal';

export default class ModalsManager<T> extends Service {

  modalIsOpened = false;

  modalsContainerPath = 'emmi-modals-container';

  modalDefer: RSVP.Deferred<T> | null = null;

  defaultOptions: EmmiModalOptions = {
    title: 'Default Title',
    body: 'Default Body',
    footer: '',
    confirm: 'Yes',
    decline: 'No',
    cancel: 'Cancel'
  };

  options: EmmiModalOptions = {} as EmmiModalOptions;

  componentName: string | null = null;

  show(componentName: string, options: EmmiModalOptions): RSVP.Promise<T> {
    assert('Only one modal may be opened in the same time!', !this.modalIsOpened);
    const opts = Object.assign({}, this.defaultOptions, options);
    set(this, 'modalIsOpened', true);
    set(this, 'options', opts);
    set(this, 'componentName', componentName);
    const modalDefer = defer<T>();
    set(this, 'modalDefer', modalDefer);
    return modalDefer.promise;
  }

  /**
   * Shows `alert`-modal
   */
  alert(options: EmmiModalOptions): RSVP.Promise<T> {
    return this.show(`${this.modalsContainerPath}/alert`, options);
  }

  /**
   * Shows `confirm`-modal
   */
  confirm(options: EmmiModalOptions): RSVP.Promise<T> {
    return this.show(`${this.modalsContainerPath}/confirm`, options);
  }

  /**
   * Shows `prompt`-modal
   */
  prompt(options: EmmiModalOptions): RSVP.Promise<T> {
    return this.show(`${this.modalsContainerPath}/prompt`, options);
  }

  /**
   * Shows `prompt-confirm`-modal
   */
  promptConfirm(options: EmmiModalOptions): RSVP.Promise<T> {
    assert('"options.promptValue" must be defined and not empty', !!options.promptValue);
    return this.show(`${this.modalsContainerPath}/prompt-confirm`, options);
  }

  /**
   * Show `check-confirm`-modal
   */
  checkConfirm(options: EmmiModalOptions): RSVP.Promise<T> {
    return this.show(`${this.modalsContainerPath}/check-confirm`, options);
  }

  /**
   * Shows `progress`-modal. This modal doesn't have any controls and is auto-closed when progress is completed
   */
  progress(options: EmmiModalOptions): RSVP.Promise<T> {
    assert('`options.promises` must be an array', options && isArray(options.promises));
    return this.show(`${this.modalsContainerPath}/progress`, options);
  }

  process(options: EmmiModalOptions): RSVP.Promise<T> {
    assert('`options.process` must be defined', options && options.process);
    return this.show(`${this.modalsContainerPath}/process`, options);
  }

  onConfirmClick(v: EmmiConfirmPayload): void {
    set(this, 'modalIsOpened', false);
    this.modalDefer?.resolve(v);
    this.clearOptions();
  }

  onDeclineClick(v: EmmiDeclinePayload): void {
    set(this, 'modalIsOpened', false);
    this.modalDefer?.reject(v);
    this.clearOptions();
  }

  protected clearOptions(): void {
    set(this, 'options', {} as EmmiModalOptions);
  }
}
