import App from './App.vue'
import router from './router'
import menuFix from './utils/admin-menu-fix'

let Vue = wepos_get_lib('Vue');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#wepos-admin-app',
    router,
    render: h => h(App)
});


// fix the admin menu for the slug "wepos-app"
menuFix('wepos');
