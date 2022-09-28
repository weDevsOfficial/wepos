<?php
namespace WeDevs\WePOS;

// Don't call the file directly.
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
        $this->insert_product_log_counter( 4 );
    }

    /**
     * Get product logs.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param array $args
     *
     * @return bool|array|\WP_Error
     */
    public function get_product_logs( $args = [] ) {
        global $wpdb;

        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return false;
        }

        $defaults = [
            'limit'  => 20,
            'offset' => 0,
        ];

        $args            = wp_parse_args( $args, $defaults );
        $where_condition = $this->generate_where_condition( $args );
        $limit_condition = $this->generate_limit_condition( $args );
        $query_args      = array_merge( $where_condition['args'], $limit_condition['args'] );

        $product_logs_query = $wpdb->prepare(
            "SELECT * FROM {$this->table_product_logs}
            {$where_condition['clause']}
            {$limit_condition['clause']}",
            $query_args
        );

        return $wpdb->get_results( $product_logs_query );
    }

    /**
     * Insert product log.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int    $product_id
     * @param object $product
     *
     * @return void|\WP_Error
     */
    public function insert_product_log( $product_id, $product ) {
        global $wpdb;

        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return false;
        }

        // if ( ! current_user_can( 'cashier' ) ) {
        // 	return;
        // }

        // Delete existing log for this product, if had any.
        $this->delete_product_log( $product_id );

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
     * Insert product log counter.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int $product_log_id
     *
     * @return int|\WP_Error
     */
    public function insert_product_log_counter( $args = [] ) {
        global $wpdb;

        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return false;
        }

        // if ( ! current_user_can( 'cashier' ) ) {
        // 	return;
        // }

        if ( empty( $args['product_log_id'] ) ) {
            return false;
        }

        $userinfo   = wp_get_current_user();

        $login_data = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}wepos_login WHERE user_id=%d AND `is_logged_in`='1'",
                $userinfo->ID
            )
        );

        $counter_data = [
            'product_log_id' => $args['product_log_id'],
            'counter_id'     => $login_data->counter_id,
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
     * Update product log counter counts.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int $product_log_id
     *
     * @return bool|\WP_Error
     */
    public function update_product_log_counter_counts( $args = [] ) {
        global $wpdb;

        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return false;
        }

        if ( empty( $args['product_log_id'] ) ) {
            return false;
        }

        $counts_updated = $wpdb->query(
            $wpdb->prepare(
                "UPDATE {$this->table_product_logs} SET counter_counts = counter_counts + 1 WHERE id = %d",
                $args['product_log_id']
            )
        );

        if ( ! $counts_updated ) {
            return new \WP_Error( 'failed-to-update', __( 'Failed to update product log counter counts', 'wepos' ) );
        }

        return true;
    }

    /**
     * Delete product log.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param int $product_id
     *
     * @return bool|\WP_Error
     */
    public function delete_product_log( $product_id = 0 ) {
        global $wpdb;

        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return false;
        }

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
     * Generate where condition.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param array $args
     *
     * @return array $where_condition
     */
    public function generate_where_condition( $args ) {
        $where_condition['clause'] = ' WHERE %d = %d';
        $where_condition['args']   = [ 1, 1 ];

        if ( ! empty( $args['counter_id'] ) ) {
            $where_condition['clause'] .= " AND id NOT IN( SELECT product_log_id FROM {$this->table_product_log_counters} WHERE counter_id = %d)";
            $where_condition['args'][] = $args['counter_id'];
        }

        return $where_condition;
    }

    /**
     * Generate limit condition.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param array $args
     *
     * @return array $limit_condition
     */
    public function generate_limit_condition( $args ) {
        $limit_condition['clause'] = '';
        $limit_condition['args']   = [];

        if ( ! empty( $args['limit'] ) && isset( $args['offset'] ) ) {
            $limit_condition['clause'] .= ' LIMIT %d OFFSET %d';
            $limit_condition['args'][] = $args['limit'];
            $limit_condition['args'][] = $args['offset'];
        }

        return $limit_condition;
    }
}
