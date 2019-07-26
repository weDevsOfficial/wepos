import App from './App.vue'
import router from './router'
import store from '@/utils/store/'
import menuFix from './utils/admin-menu-fix'

let Vue = wepos_get_lib('Vue');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#wepos-admin-app',
    router,
    store,
    render: h => h(App),
    created() {
        this.setLocaleData( wepos.i18n['wepos'] )
    }
});


// fix the admin menu for the slug "wepos-app"
menuFix('wepos');
