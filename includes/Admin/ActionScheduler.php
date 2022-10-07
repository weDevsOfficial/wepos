<?php
namespace WeDevs\WePOS\Admin;

// Don't call the file directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Action Scheduler Class.
 */
class ActionScheduler {

    /**
     * Class constructor.
     *
     * @since WEPOS_LITE_SINCE
     */
    function __construct() {
        $this->register_product_log_clean_action_scheduler();
    }

    /**
     * Register product log clean action scheduler.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return void
     */
    public function register_product_log_clean_action_scheduler() {
        if ( ! WC()->queue()->get_next( 'wepos_product_log_cleaner_action_schedule' ) ) {
            WC()->queue()->schedule_recurring( strtotime( 'tomorrow' ), MINUTE_IN_SECONDS, 'wepos_product_log_cleaner_action_schedule' );
        }
    }

    /**
     * Deregister product log clean action scheduler.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return void
     */
    public function deregister_product_log_clean_action_scheduler() {
        WC()->queue()->cancel_all( 'wepos_product_log_cleaner_action_schedule' );
    }
}
