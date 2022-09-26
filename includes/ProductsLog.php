<?php
namespace WeDevs\WePOS;

// don't call the file directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Products Log Class.
 */
class ProductsLog {

    /**
     * Table name for product logs.
     *
     * @var string
     *
     * @since WEPOS_LITE_SINCE
     */
    private $table_product_logs;

    /**
     * Table name for product log counters.
     *
     * @var string
     *
     * @since WEPOS_LITE_SINCE
     */
    private $table_product_log_counters;

    /**
     * Class Constructor.
     *
     * @since WEPOS_LITE_SINCE
     */
    public function __construct() {
        global $wpdb;

        $this->table_product_logs         = "{$wpdb->prefix}wepos_product_logs";
        $this->table_product_log_counters = "{$wpdb->prefix}wepos_product_log_counters";

        add_action( 'woocommerce_new_product', [ $this, 'insert_product_log_data' ], 10, 2 );
        add_action( 'woocommerce_update_product', [ $this, 'insert_product_log_data' ], 10, 2 );
    }

    /**
     * Product log data inserter function.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int    $product_id
     * @param object $product
     *
     * @return void|\WP_Error
     */
    public function insert_product_log_data( $product_id, $product ) {
        global $wpdb;

        // if ( ! current_user_can( 'cashier' ) ) {
        // 	return;
        // }

        $wpdb->delete(
            $this->table_product_logs,
            [ 'product_id' => $product_id ],
            [ '%d']
        );

        $log_data = [
            'product_id'     => $product_id,
            'product_title'  => $product->get_title(),
            'product_type'   => $product->get_type(),
            'product_sku'    => $product->get_sku(),
            'product_price'  => $product->get_price(),
            'product_stock'  => $product->get_stock_quantity(),
            'counter_counts' => 0,
        ];

        $log_inserted = $wpdb->insert(
            $this->table_product_logs,
            $log_data,
            [
                '%d',
                '%s',
                '%s',
                '%s',
                '%f',
                '%d',
                '%d',
            ]
        );

        if ( ! $log_inserted ) {
            return new \WP_Error( 'failed-to-insert', __( 'Failed to insert product log data', 'wepos' ) );
        }
    }

    /**
     * Product log counter data inserter function.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int $product_log_id
     *
     * @return int|\WP_Error
     */
    public function insert_product_log_counter_data( $product_log_id = 0 ) {
        global $wpdb;

        if ( empty( $product_log_id ) ) {
            return;
        }

        // if ( ! current_user_can( 'cashier' ) ) {
        // 	return;
        // }

        $userinfo   = wp_get_current_user();

        $login_data = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}wepos_login WHERE user_id=%d AND `is_logged_in`='1'",
                $userinfo->ID
            ),
            ARRAY_A
        );

        $counter_data = [
            'product_log_id' => $product_log_id,
            'counter_id'     => $login_data['counter_id'],
        ];

        $counter_inserted = $wpdb->insert(
            $this->table_product_log_counters,
            $counter_data,
            [
                '%d',
                '%d',
            ]
        );

        if ( ! $counter_inserted ) {
            return new \WP_Error( 'failed-to-insert', __( 'Failed to insert product counter data', 'wepos' ) );
        }

        return $wpdb->insert_id;
    }

    /**
     * Product log counter counts updater function.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int $product_log_id
     *
     * @return bool|\WP_Error
     */
    public function update_product_log_counter_counts( $product_log_id = 0 ) {
        global $wpdb;

        if ( empty( $product_log_id ) ) {
            return false;
        }

        $counts_updated = $wpdb->query(
            $wpdb->prepare(
                "UPDATE {$this->table_product_logs} SET counter_counts = counter_counts + 1 WHERE id = %d",
                $product_log_id
            )
        );

        if ( ! $counts_updated ) {
            return new \WP_Error( 'failed-to-update', __( 'Failed to update product log counter counts', 'wepos' ) );
        }

        return true;
    }

    /**
     * Product log data remover function.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int $product_id
     *
     * @return bool|\WP_Error
     */
    public function delete_product_log_data( $product_id = 0 ) {
        global $wpdb;

        if ( empty( $product_id ) ) {
            return false;
        }

        $log_deleted =  $wpdb->delete(
            $this->table_product_logs,
            [ 'product_id' => $product_id ],
            [ '%d']
        );

        if ( ! $log_deleted ) {
            return new \WP_Error( 'failed-to-delete', __( 'Failed to delete product log data', 'wepos' ) );
        }

        return true;
    }

    /**
     * Product log data getter function.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int $counter_id
     *
     * @return bool|array|\WP_Error
     */
    public function get_product_logs( $counter_id = 0 ) {
        global $wpdb;

        if ( empty( $counter_id ) ) {
            return false;
        }

        $product_logs_query = $wpdb->prepare(
            "SELECT * FROM {$this->table_product_logs} WHERE id NOT IN( SELECT product_log_id FROM {$this->wepos_product_log_counters} WHERE counter_id = %d);",
            $counter_id
        );

        return $wpdb->get_results( $product_logs_query, ARRAY_A );
    }
}
