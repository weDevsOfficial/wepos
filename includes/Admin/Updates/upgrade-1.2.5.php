<?php

/**
 * Updater function for wePOS v1.2.5.
 *
 * @since WEPOS_LITE_SINCE
 *
 * @return void
 */
function wepos_1_2_5_updates() {
    wepos_create_product_log_tables();
    wepos_register_product_log_cron_schedules();
}

/**
 * Create product log database tables.
 *
 * @since WEPOS_LITE_SINCE
 *
 * @return void
 */
function wepos_create_product_log_tables() {
    global $wpdb;

    include_once ABSPATH . 'wp-admin/includes/upgrade.php';

    $tables = [
        "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}wepos_product_logs` (
            `id` bigint unsigned NOT NULL AUTO_INCREMENT,
            `product_id` bigint unsigned NOT NULL,
            `product_title` varchar(255) NOT NULL,
            `product_type` varchar(255) NOT NULL,
            `product_sku` varchar(255) NULL,
            `product_price` decimal (19,
            4) NOT NULL DEFAULT 0.0000,
        `product_stock` bigint signed NULL,
        `counter_counts` bigint unsigned NULL DEFAULT 0,
        PRIMARY KEY (`id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;",

        "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}wepos_product_log_counters` (
            `id` bigint unsigned NOT NULL AUTO_INCREMENT,
            `product_log_id` bigint unsigned NOT NULL,
            `counter_id` bigint unsigned NOT NULL,
            PRIMARY KEY (`id`),
        FOREIGN KEY (product_log_id) REFERENCES wp_wepos_product_logs (id) ON DELETE CASCADE
        ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;",
    ];

    // Include 'upgrade.php' if not included earlier.
    if ( ! function_exists( 'dbDelta' ) ) {
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    }

    // Create tables through looping.
    foreach ( $tables as $key => $table ) {
        dbDelta( $table );
    }
}

/**
* Register product log cron schedules.
*
* @since WEPOS_LITE_SINCE
*
* @return void
*/
function wepos_register_product_log_cron_schedules() {
    if ( ! wp_next_scheduled( 'wepos_product_log_cron_hook' ) ) {
        wp_schedule_event( time(), 'daily', 'wepos_product_log_cron_hook' );
    }
}

wepos_1_2_5_updates();
