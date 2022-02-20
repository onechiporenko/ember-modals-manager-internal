import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ModalsManager, {
  EmmiConfirmPayload,
  EmmiDeclinePayload,
  EmmiModalOptions,
} from '../services/emmi-modals-manager';

class ModalsContainer<T> extends Component {
  @service
  protected modalsManager: ModalsManager<T>;

  protected get options(): EmmiModalOptions {
    return this.modalsManager.options;
  }

  protected get modalIsOpened(): boolean {
    return this.modalsManager.modalIsOpened;
  }

  protected get componentName(): string | null {
    return this.modalsManager.componentName;
  }

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
