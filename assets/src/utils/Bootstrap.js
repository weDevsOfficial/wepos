import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import API_Helper from '@/utils/Api'
import _ from '@/utils/lodash'
import Mixin from './Mixin'
import Popover  from 'vue-js-popover'
import TextEditor from "admin/components/TextEditor.vue"
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'
import VueHotkey from 'v-hotkey'
import Multiselect from 'vue-multiselect'
import Modal from './components/Modal.vue'
import Switches from './components/Switches.vue'
import "vue-multiselect/dist/vue-multiselect.min.css"
import moment from 'moment'

window.moment = moment

Vue.directive( 'tooltip', VTooltip )
Vue.directive( 'close-popover', VClosePopover )
Vue.component( 'v-popover', VPopover )
Vue.component( 'multiselect', Multiselect )

Vue.directive('click-outside', {
    bind: function(el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== 'function') {
        const compName = vNode.context.name
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) { warn += `Found in component '${compName}'` }

      console.warn(warn)
    }
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble
    const handler = (e) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler

    // add Event Listeners
    document.addEventListener('click', handler)
        },

  unbind: function(el, binding) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
});

Vue.mixin( Mixin );
Vue.use( Popover, { defaultBoundariesElement: document.body } );
Vue.use(VueHotkey);

window.wepos_get_lib = function( lib ) {
    return window.wepos.libs[lib];
}

export const EventBus = new Vue();

window.weLo_                    = _;
window.wepos._                  = _;
window.wepos.api                = new API_Helper();
window.wepos.libs['Vue']        = Vue;
window.wepos.libs['Router']     = Router;
window.wepos.libs['Vuex']       = Vuex;
window.wepos.libs['TextEditor'] = TextEditor;
window.wepos.libs['EventBus']   = EventBus;
window.wepos.libs['Modal']      = Modal;
window.wepos.libs['Switches']   = Switches;

window.wepos.hooks = ( wp && wp.hooks ) ? wp.hooks : window.wepos.wpPackages.hooks;

wepos.addFilter = ( hookName, namespace, component, priority = 10 ) => {
    wepos.hooks.addFilter(hookName, namespace, (components) => {
        components.push(component);
        return components;
    }, priority );
};