import {computed, get, set} from '@ember/object';
import {assert} from '@ember/debug';
import Service from '@ember/service';
import {isArray} from '@ember/array';
import {defer} from 'rsvp';

/**
 * @name PromiseFactory
 * @function
 * @return {RSVP.Promise}
 */

/**
 * @class ModalsManager
 * @namespace Services
 * @extends Ember.Service
 */
export default Service.extend({

  /**
   * @property modalIsOpened
   * @type boolean
   * @default false
   * @private
   */
  modalIsOpened: false,

  /**
   * @property modalDefer
   * @type RSVP.Defer
   * @default null
   * @private
   */
  modalDefer: null,

  /**
   * POJO with default options for all modals
   *
   * @property defaultOptions
   * @type object
   */
  defaultOptions: computed(function () {
    return {
      title: 'Default Title',
      body: 'Default Body',
      footer: '',
      confirm: 'Yes',
      decline: 'No'
    };
  }),

  /**
   * @property options
   * @type object
   * @private
   */
  options: computed(function () {
    return {};
  }),

  /**
   * @property componentName
   * @type string
   * @default null
   * @private
   */
  componentName: null,

  /**
   * Shows provided modal
   *
   * @method show
   * @param {string} componentName
   * @param {object} options
   * @return {RSVP.Promise}
   */
  show(componentName, options) {
    assert('Only one modal may be opened in the same time!', !get(this, 'modalIsOpened'));
    const defaultOptions = get(this, 'defaultOptions');
    const opts = Object.assign({}, defaultOptions, options);
    set(this, 'modalIsOpened', true);
    set(this, 'options', opts);
    set(this, 'componentName', componentName);
    const modalDefer = defer();
    set(this, 'modalDefer', modalDefer);
    return modalDefer.promise;
  },

  /**
   * Shows `alert`-modal
   *
   * @method alert
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  alert(options) {
    return this.show('modals-container/alert', options);
  },

  /**
   * Shows `confirm`-modal
   *
   * @method confirm
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  confirm(options) {
    return this.show('modals-container/confirm', options);
  },

  /**
   * Shows `prompt`-modal
   *
   * @method prompt
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  prompt(options) {
    return this.show('modals-container/prompt', options);
  },

  /**
   * Shows `prompt-confirm`-modal
   *
   * @method promptConfirm
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  promptConfirm(options) {
    assert('"options.promptValue" must be defined and not empty', !!options.promptValue);
    return this.show('modals-container/prompt-confirm', options);
  },

  /**
   * Show `check-confirm`-modal
   *
   * @method checkConfirm
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  checkConfirm(options) {
    return this.show('modals-container/check-confirm', options);
  },

  /**
   * Shows `progress`-modal. This modal doesn't have any controls and is auto-closed when progress is completed
   *
   * @method progress
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  progress(options) {
    assert('`options.promises` must be an array', options && isArray(options.promises));
    return this.show('modals-container/progress', options);
  },

  /**
   * @method process
   * @param {object} options
   * @returns {RSVP.Promise}
   */
  process(options) {
    assert('`options.process` must be defined', options && options.process);
    return this.show('modals-container/process', options);
  },

  /**
   * @method onConfirmClick
   * @private
   */
  onConfirmClick(v) {
    set(this, 'modalIsOpened', false);
    get(this, 'modalDefer').resolve(v);
    set(this, 'options', {});
  },

  /**
   * @method onDeclineClick
   * @private
   */
  onDeclineClick(v) {
    set(this, 'modalIsOpened', false);
    get(this, 'modalDefer').reject(v);
    set(this, 'options', {});
  }
});
