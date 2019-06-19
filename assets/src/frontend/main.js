// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/utils/store/'

let Vue = wepos_get_lib('Vue');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#vue-frontend-app',
    router,
    store,
    render: h => h(App),
    created() {
        this.setLocaleData( wepos.i18n['wepos'] )
    }
})
