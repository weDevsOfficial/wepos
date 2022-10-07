<?php
namespace WeDevs\WePOS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Installer class.
 */
class Uninstaller {

    /**
     * Run uninstaller.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return void
     */
    public function run() {
        $this->remove_capabilities();
        $this->deregister_action_schedulers();
    }

    /**
     * Remove capabilities.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return void
     */
    public function remove_capabilities() {
        $users_query = new \WP_User_Query( [
            'role__in' => [ 'seller', 'vendor_staff' ]
        ] );
        
        $users = $users_query->get_results();

        if ( count( $users ) > 0 ) {
            foreach ( $users as $user ) {
                $user->remove_cap( 'publish_shop_orders' );
                $user->remove_cap( 'list_users' );
            }
        }
    }

    /**
     * Deregister action schedulers.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return void
     */
    public function deregister_action_schedulers() {
        wepos()->action_scheduler->deregister_product_log_clean_action_scheduler();
    }
}
