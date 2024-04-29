import Home from "frontend/components/Home.vue";
import Login from "frontend/components/Login.vue";
import Orders from "frontend/components/Orders.vue";
import Customers from "../components/Customers.vue";
import DashBoard from "../components/DashBoard.vue";
import OrderDetail from "../components/OrderDetail.vue";
import Products from "../components/Products.vue";

let Vue = wepos_get_lib("Vue");
let Router = wepos_get_lib("Router");

Vue.use(Router);
const router = new Router({
    routes: wepos.hooks.applyFilters("wepos_frontend_routes", [
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/",
            name: "Dashboard",
            component: DashBoard,
            children: [
                { path: "", name: "Home", component: Home },
                {
                    path: "/products",
                    name: "Products",
                    component: Products,
                },

                {
                    path: "/orders",
                    name: "Orders",
                    component: Orders,
                    exact: true,
                },
                {
                    path: "/orders/:orderId(\\d+)",
                    name: "OrderDetail",
                    component: OrderDetail,
                },

                {
                    path: "/customers",
                    name: "Customers",
                    component: Customers,
                },
            ],
        },
    ]),
    duplicateNavigationPolicy: "ignore",
});
router.beforeEach((to, from, next) => {
    if (to.name !== "Login" && !wepos.loggedin) {
        next({ name: "Login" });
    } else if (to.name === "Login" && !!wepos.loggedin) {
        next({ name: "Home" });
    } else {
        next();
    }
});

export default router;
