// Types for compiled templates
declare module 'ember-modals-manager-internal/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
