<?php
namespace WePOS;

/**
 * Admin Pages Handler
 */
class Admin {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
        add_action( 'woocommerce_payment_gateways', [ $this, 'payment_gateways' ] );
    }

    /**
     * Register our menu page
     *
     * @return void
     */
    public function admin_menu() {
        global $submenu;

        $capability = 'manage_options';
        $slug       = 'wepos';

        $hook = add_menu_page( __( 'WePOS', 'wepos' ), __( 'WePOS', 'wepos' ), $capability, $slug, [ $this, 'plugin_page' ], 'dashicons-text' );

        if ( current_user_can( $capability ) ) {
            $submenu[ $slug ][] = array( __( 'App', 'wepos' ), $capability, 'admin.php?page=' . $slug . '#/' );
            $submenu[ $slug ][] = array( __( 'Settings', 'wepos' ), $capability, 'admin.php?page=' . $slug . '#/settings' );
        }

        add_action( 'load-' . $hook, [ $this, 'init_hooks' ] );
    }

    /**
    * Add POS gateways
    *
    * @param $gateways
    *
    * @return array
    */
    public function payment_gateways( $gateways ) {
        $available_gateway = \WC_POS::init()->available_gateway();
        // else add default POS gateways
        return array_merge( $gateways, apply_filters( 'wepos_payment_gateway', array_keys( $available_gateway ) ) );
    }


    /**
     * Initialize our hooks for the admin page
     *
     * @return void
     */
    public function init_hooks() {
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
    }

    /**
     * Load scripts and styles for the app
     *
     * @return void
     */
    public function enqueue_scripts() {
        wp_enqueue_style( 'wepos-admin' );
        wp_enqueue_script( 'wepos-admin' );
    }

    /**
     * Render our admin page
     *
     * @return void
     */
    public function plugin_page() {
        echo '<div class="wrap"><div id="wepos-admin-app"></div></div>';
    }
}
