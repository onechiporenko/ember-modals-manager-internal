import Component from '@ember/component';
import { layout as templateLayout } from '@ember-decorators/component';
import layout from 'ember-modals-manager-internal/templates/components/emmi-modals-container';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import ModalsManager from 'ember-modals-manager-internal/services/emmi-modals-manager';
import { EmmiConfirmPayload, EmmiDeclinePayload, EmmiModalOptions } from 'ember-modals-manager-internal';

/**
 * You should place this component in the `application.hbs`:
 *
 * ```hbs
 * <ModalsContainer/>
 * ```
 *
 * That's all what you have to do with it
 */
@templateLayout(layout)
class ModalsContainer<T> extends Component {

  @service
  protected modalsManager: ModalsManager<T>;

  @readOnly('modalsManager.options')
  protected readonly options: EmmiModalOptions;

  @readOnly('modalsManager.modalIsOpened')
  protected readonly modalIsOpened: boolean;

  @readOnly('modalsManager.componentName')
  protected readonly componentName: string;

  @action
  confirm(v: EmmiConfirmPayload): void {
    this.modalsManager.onConfirmClick(v);
  }

  @action
  decline(v: EmmiDeclinePayload): void {
    this.modalsManager.onDeclineClick(v);
  }
}

export default ModalsContainer;
