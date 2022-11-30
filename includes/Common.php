<?php
namespace WeDevs\WePOS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
* Common Class.
*/
class Common {

    /**
     * Constructor method.
     */
    public function __construct() {
        $this->init_hooks();
    }


    /**
     * Init hooks method.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return void
     */
    public function init_hooks() {
        // Manipulate WooCommerce Order Data.
        add_action( 'woocommerce_new_order', [ $this, 'set_order_created_via_wepos' ], 10, 2 );
    }

    /**
     * Set order created via wepos.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int    $order_id
     * @param object $order
     *
     * @return void|\WP_ERROR
     */
    public function set_order_created_via_wepos( $order_id, $order ) {
        if ( ! $order instanceof \WC_Order ) {
            return;
        }

        if ( empty( $order->get_meta( '_wepos_is_pos_order' ) ) ) {
            return;
        }

        $order->set_created_via( 'wepos' );
    }
}
