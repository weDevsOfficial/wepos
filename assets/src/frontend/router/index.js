import Home from "frontend/components/Home.vue";
import Login from "frontend/components/Login.vue";

let Vue = wepos_get_lib("Vue");
let Router = wepos_get_lib("Router");

Vue.use(Router);
const router = new Router({
    routes: wepos.hooks.applyFilters("wepos_frontend_routes", [
        {
            path: "/",
            name: "Home",
            component: Home,
            extract: true,
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
    ]),
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
