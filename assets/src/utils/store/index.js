let Vue = wepos_get_lib('Vue');
let Vuex = wepos_get_lib('Vuex');

Vue.use(Vuex);

import Cart from './modules/Cart.module';
import Order from './modules/Order.module';

export default new Vuex.Store({
    modules: {
        Cart,
        Order
    }
});