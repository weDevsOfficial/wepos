<?php

namespace WeDevs\WePOS;

defined( 'ABSPATH' ) || exit;

/**
 * Common Class.
 *
 * Class for doing generic common operations from both frontend and backend.
 *
 * @since WEPOS_LITE_SINCE
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

        // Manipulate Tax Amount of Fees Item.
        add_action( 'woocommerce_order_item_fee_after_calculate_taxes', [ $this, 'remove_tax_amount_from_discount_fee' ], 10, 1 );
    }

    /**
     * Set order created via wepos.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int       $order_id The order ID.
     * @param \WC_Order $order    The order object.
     *
     * @return void|\WP_Error
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

    /**
     * Remove Tax Amount from Discount Fees.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param \WC_Order_Item_Fee $item The order item fee object.
     *
     * @return void|\WP_Error
     */
    public function remove_tax_amount_from_discount_fee( $item ) {
        // Check if the discount applied via wePOS.
        if ( 'wepos_discount' !== $item->get_meta( 'fee_type' ) ) {
            return;
        }

        // Check if the WooCommerce tax setting 
        if ( 'incl' !== get_option( 'woocommerce_tax_display_shop', 'excl' ) ) {
            return;
        }

        $item->set_taxes( [] );
    }
}
