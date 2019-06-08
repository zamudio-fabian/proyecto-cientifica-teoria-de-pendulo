// Import vue component
import component from './cientifica-module.vue';

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('CientificaModule', component);
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install;

// Export component by default
export default component;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
const info =  {
  name: 'Módulo péndulo',
  description: 'Ejemplo de construcción de un módulo para la aplicación de programación científica',
  type: 'fisica',
  tags: [ 'pendulo', 'masa', 'física' ],
  slug: 'pendulo',
  guid: '49204621-9ed8-4b28-8c6e-86e4cb380422'
};
export { info as Info  };
