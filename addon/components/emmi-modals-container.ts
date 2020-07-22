import Component from '@ember/component';
import { layout as templateLayout } from '@ember-decorators/component';
import layout from 'ember-modals-manager-internal/templates/components/emmi-modals-container';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import ModalsManager, {
  EmmiConfirmPayload, EmmiDeclinePayload,
  EmmiModalOptions
} from '../services/emmi-modals-manager';

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
