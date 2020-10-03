import Home from 'frontend/components/Home.vue'

let Vue    = wepos_get_lib( 'Vue' )
let Router = wepos_get_lib( 'Router' )

Vue.use(Router)

export default new Router({
    routes: wepos.hooks.applyFilters( 'wepos_frontend_routes', [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
    ] )
})
