var e=function(e,n,t,o,i,r,a,s,d,l){"boolean"!=typeof a&&(d=s,s=a,a=!1);var c,u="function"==typeof t?t.options:t;if(e&&e.render&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0,i&&(u.functional=!0)),o&&(u._scopeId=o),r?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,d(e)),e&&e._registeredComponents&&e._registeredComponents.add(r)},u._ssrRegister=c):n&&(c=a?function(){n.call(this,l(this.$root.$options.shadowRoot))}:function(e){n.call(this,s(e))}),c)if(u.functional){var f=u.render;u.render=function(e,n){return c.call(n),f(e,n)}}else{var p=u.beforeCreate;u.beforeCreate=p?[].concat(p,c):[c]}return t}({render:function(){var e=this.$createElement,n=this._self._c||e;return n("b-row",[n("b-col",{staticClass:"text-center"},[n("h4",[this._v("Hello world!!")])])],1)},staticRenderFns:[]},void 0,{name:"CientificaModule"},void 0,!1,void 0,void 0,void 0);function n(t){n.installed||(n.installed=!0,t.component("CientificaModule",e))}var t={install:n},o=null;"undefined"!=typeof window?o=window.Vue:"undefined"!=typeof global&&(o=global.Vue),o&&o.use(t),e.install=n;var i={name:"Módulo péndulo",description:"Ejemplo de construcción de un módulo para la aplicación de programación científica",type:"fisica",tags:["pendulo","masa","física"],slug:"pendulo",guid:"49204621-9ed8-4b28-8c6e-86e4cb380422"};export default e;export{i as Info};
