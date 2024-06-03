<?php
namespace WeDevs\WePOS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Installer class.
 */
class Installer {

    /**
     * Run installer.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return void
     */
    public function run() {
        $this->add_installation_data();
        $this->create_tables();
    }

    /**
     * Add installation data.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return void
     */
    public function add_installation_data() {
        $installed = get_option( 'we_pos_installed' );

        if ( ! $installed ) {
            update_option( 'we_pos_installed', time() );
        }

        if ( function_exists( 'dokan' ) ) {
            $users_query = new \WP_User_Query( [
                'role__in' => [ 'seller', 'vendor_staff' ]
            ] );
            $users       = $users_query->get_results();

            if ( count( $users ) > 0 ) {
                foreach ( $users as $user ) {
                    $user->add_cap( 'publish_shop_orders' );
                    $user->add_cap( 'list_users' );
                }
            }
        }

        update_option( 'we_pos_version', WEPOS_VERSION );
        set_transient( 'wepos-flush-rewrites', 1 );
    }

    /**
     * Create database tables.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return void
     */
    public function create_tables() {
        global $wpdb;

        include_once ABSPATH . 'wp-admin/includes/upgrade.php';

        $collate = $wpdb->get_charset_collate();
        $tables  = [
            "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}wepos_product_logs` (
                `id` bigint unsigned NOT NULL AUTO_INCREMENT,
                `product_id` bigint unsigned NOT NULL,
                `product_title` text(255) NOT NULL,
                `product_type` varchar(100) NOT NULL,
                `product_sku` varchar(100) NULL,
                `product_price` decimal (19,
                4) NOT NULL DEFAULT 0.0000,
            `product_stock` bigint signed NULL,
            `counter_counts` bigint unsigned NULL DEFAULT 0,
            PRIMARY KEY (`id`)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 {$collate};",

            "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}wepos_product_log_counters` (
                `id` bigint unsigned NOT NULL AUTO_INCREMENT,
                `product_log_id` bigint unsigned NOT NULL,
                `counter_id` bigint unsigned NOT NULL,
                PRIMARY KEY (`id`),
            FOREIGN KEY (product_log_id) REFERENCES {$wpdb->prefix}wepos_product_logs (id) ON DELETE CASCADE
            ) ENGINE=InnoDB AUTO_INCREMENT=1 {$collate};",
        ];

        foreach ( $tables as $key => $table ) {
            dbDelta( $table );
        }
    }
}
