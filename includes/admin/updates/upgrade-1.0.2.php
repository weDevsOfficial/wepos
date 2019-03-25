<?php

function wepos_1_0_2_updates() {
    if ( function_exists( 'dokan' ) ) {
        $users_query = new WP_User_Query( array(
            'role__in' => [ 'seller', 'vendor_staff' ]
        ) );
        $users = $users_query->get_results();

        if ( count( $users ) > 0 ) {
            foreach ( $users as $user ) {
                $user->add_cap( 'publish_shop_orders' );
                $user->add_cap( 'list_users' );
            }
        }
    }
}

wepos_1_0_2_updates();