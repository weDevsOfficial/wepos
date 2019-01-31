import Home from 'admin/components/Home.vue'
import Settings from 'admin/components/Settings.vue'

let Vue    = wepos_get_lib( 'Vue' )
let Router = wepos_get_lib( 'Router' )

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings
        },
    ]
})
