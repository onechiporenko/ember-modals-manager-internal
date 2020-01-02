import Component from '@ember/component';
import {layout as templateLayout} from '@ember-decorators/component';
import layout from '../templates/components/modals-container';
import {inject as service} from '@ember/service';
import {action, get} from '@ember/object';
import {readOnly} from '@ember/object/computed';

/**
 * You should place this component in the `application.hbs`:
 *
 * ```hbs
 * {{modals-container}}
 * ```
 *
 * That's all what you have to do with it
 *
 * @class ModalsContainer
 * @namespace Components
 * @extends Ember.Component
 */
export default
@templateLayout(layout)
class ModalsContainer extends Component{

  /**
   * @property modalsManager
   * @type Services.ModalsManager
   * @protected
   * @readonly
   */
  @service
  modalsManager;

  /**
   * @property options
   * @type object
   * @protected
   * @readonly
   */
  @readOnly('modalsManager.options')
  options;

  /**
   * @property modalIsOpened
   * @type boolean
   * @default false
   * @protected
   * @readonly
   */
  @readOnly('modalsManager.modalIsOpened')
  modalIsOpened;

  /**
   * @property componentName
   * @type string
   * @default null
   * @protected
   * @readonly
   */
  @readOnly('modalsManager.componentName')
  componentName;

  /**
   * @param {*} [v]
   */
  @action
  confirm(v) {
    get(this, 'modalsManager').onConfirmClick(v);
  }

  /**
   * @param {*} [v]
   */
  @action
  decline(v) {
    get(this, 'modalsManager').onDeclineClick(v);
  }
}
