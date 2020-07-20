declare module 'ember-modals-manager-internal' {

  import RSVP from 'rsvp';

  export type EmmiPromiseFactory = () => RSVP.Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  export type EmmiConfirmPayload = any; // eslint-disable-line @typescript-eslint/no-explicit-any
  export type EmmiDeclinePayload = any; // eslint-disable-line @typescript-eslint/no-explicit-any

  export interface EmmiModalOptions {
    title?: string;
    titleComponent?: string;
    body?: string;
    bodyComponent?: string;
    footer?: string;
    footerComponent?: string;
    confirm?: string;
    decline?: string;
    cancel?: string;
    promptValue?: string;
    process?: EmmiPromiseFactory;
    promises?: EmmiPromiseFactory[];
    settled?: boolean;
    disallowEmpty?: boolean;
  }

}
