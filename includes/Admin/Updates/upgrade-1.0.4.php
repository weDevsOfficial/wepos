<?php

/**
 * Handle a custom 'is_pos_order' query var to get orders with the 'is_pos_order' meta.
 *
 * @since 1.0.4
 *
 * @param array $query - Args for WP_Query.
 * @param array $query_vars - Query vars from WC_Order_Query.
 *
 * @return array modified $query
 */
function wepso_handle_custom_query_var( $query, $query_vars ) {
    if ( ! empty( $query_vars['is_pos_order'] ) ) {
        $query['meta_query'][] = array(
            'key'   => '_wepos_is_pos_order',
            'value' => 'true',
        );
    }

    return $query;
}

add_filter( 'woocommerce_order_data_store_cpt_get_orders_query', 'wepso_handle_custom_query_var', 10, 2 );

/**
 * Updates all order meta key into `_created_via` meta
 *
 * @since 1.0.4
 *
 * @return void
 */
function wepos_1_0_4_updates() {
    $orders = wc_get_orders( [ 'return' => 'ids', 'posts_per_page' => '-1', 'created_via' => 'rest-api', 'is_pos_order' => 'true' ] );
    foreach ( $orders as $order_id ) {
        $order = wc_get_order( $order_id );
        $order->set_created_via( 'wepos' );
        $order->save();
    }
}

wepos_1_0_4_updates();