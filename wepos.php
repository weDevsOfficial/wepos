<?php
/*
Plugin Name: WePOS - Point Of Sale(POS) for WooCommerce
Plugin URI: https://wedevs.com/wepos
Description: A beautiful and fast Point of Sale(POS) system for WooCommerce
Version: 1.0.0
Author: weDevs
Author URI: https://wedevs.com/
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: wepos
Domain Path: /languages
*/

/**
 * Copyright (c) YEAR weDevs (email: info@wedevs.com). All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * **********************************************************************
 */

// don't call the file directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * We_POS class
 *
 * @class We_POS The class that holds the entire We_POS plugin
 */
final class We_POS {

    /**
     * Plugin version
     *
     * @var string
     */
    public $version = '1.0.0';

    /**
     * Holds various class instances
     *
     * @var array
     */
    private $container = [];

    /**
     * Constructor for the We_POS class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     */
    public function __construct() {
        $this->define_constants();

        register_activation_hook( __FILE__, array( $this, 'activate' ) );
        register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

        add_action( 'init', [ $this, 'add_rewrite_rules' ] );
        add_filter( 'query_vars', [ $this, 'register_query_var' ] );
        add_action( 'plugins_loaded', [ $this, 'init_gateways' ], 11, 1 );

        add_action( 'woocommerce_loaded', array( $this, 'init_plugin' ) );
    }

    /**
     * Add the required rewrite rules
     *
     * @return void
     */
    public function add_rewrite_rules() {
        add_rewrite_rule( '^wepos/?$', 'index.php?wepos=true', 'top' );

        if ( get_transient( 'wepos-flush-rewrites' ) ) {
            flush_rewrite_rules( true );
            delete_transient( 'wepos-flush-rewrites' );
        }
    }

    /**
     * Register our query vars
     *
     * @param  array $vars
     *
     * @return array
     */
    public function register_query_var( $vars ) {
        $vars[] = 'wepos';

        return $vars;
    }

    /**
     * Available Gateway
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function available_gateway() {
        return apply_filters( 'wepos_register_gateway', [
            'WePOS\gateways\Cash' => WCPOS_INCLUDES . '/gateways/class-cash-gateway.php'
        ] );
    }

    /**
     * Init all gatewas
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init_gateways() {
        $gateways = $this->available_gateway();

        foreach ( $gateways as $class => $path ) {
            require_once $path;
        }
    }

    /**
     * Initializes the We_POS() class
     *
     * Checks for an existing We_POS() instance
     * and if it doesn't find one, creates it.
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new We_POS();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'WCPOS_VERSION', $this->version );
        define( 'WCPOS_FILE', __FILE__ );
        define( 'WCPOS_PATH', dirname( WCPOS_FILE ) );
        define( 'WCPOS_INCLUDES', WCPOS_PATH . '/includes' );
        define( 'WCPOS_URL', plugins_url( '', WCPOS_FILE ) );
        define( 'WCPOS_ASSETS', WCPOS_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugis are loaded
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Placeholder for activation function
     *
     * Nothing being called here yet.
     */
    public function activate() {
        if ( ! function_exists( 'WC' ) ) {
            require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
            deactivate_plugins( plugin_basename( __FILE__ ) );

            wp_die( '<div class="error"><p>' . sprintf( wp_kses_post( '<b>WePOS</b> requires <a href="%s">WooCommerce</a> to be installed & activated! Go back your <a href="%s">Plugin page</a>', 'wepos' ), 'https://wordpress.org/plugins/woocommerce/', esc_url( admin_url( 'plugins.php' ) ) ) . '</p></div>' );
        }

        $installed = get_option( 'we_pos_installed' );

        if ( ! $installed ) {
            update_option( 'we_pos_installed', time() );
        }

        update_option( 'we_pos_version', WCPOS_VERSION );
        set_transient( 'wepos-flush-rewrites', 1 );
    }

    /**
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate() {

    }

    /**
     * Include the required files
     *
     * @return void
     */
    public function includes() {
        require_once WCPOS_INCLUDES . '/functions.php';
        require_once WCPOS_INCLUDES . '/class-assets.php';

        if ( $this->is_request( 'admin' ) ) {
            require_once WCPOS_INCLUDES . '/admin/class-admin.php';
            require_once WCPOS_INCLUDES . '/admin/class-settings.php';
            require_once WCPOS_INCLUDES . '/admin/class-products.php';
        }

        if ( $this->is_request( 'frontend' ) ) {
            require_once WCPOS_INCLUDES . '/class-frontend.php';
        }

        require_once WCPOS_INCLUDES . '/class-rest-api.php';
    }

    /**
     * Initialize the hooks
     *
     * @return void
     */
    public function init_hooks() {
        add_action( 'init', array( $this, 'init_classes' ) );
        add_action( 'init', array( $this, 'localization_setup' ) );
    }

    /**
     * Instantiate the required classes
     *
     * @return void
     */
    public function init_classes() {
        if ( $this->is_request( 'admin' ) ) {
            $this->container['admin'] = new WePOS\Admin\Admin();
            $this->container['settings'] = new WePOS\Admin\Settings();

            new WePOS\Admin\Products();
        }

        if ( $this->is_request( 'frontend' ) ) {
            $this->container['frontend'] = new WePOS\Frontend();
        }

        $this->container['rest'] = new WePOS\REST_API();
        $this->container['assets'] = new WePOS\Assets();
    }

    /**
     * Initialize plugin for localization
     *
     * @uses load_plugin_textdomain()
     */
    public function localization_setup() {
        load_plugin_textdomain( 'wepos', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    /**
     * What type of request is this?
     *
     * @param  string $type admin, ajax, cron or frontend.
     *
     * @return bool
     */
    private function is_request( $type ) {
        switch ( $type ) {
            case 'admin' :
                return is_admin();

            case 'ajax' :
                return defined( 'DOING_AJAX' );

            case 'cron' :
                return defined( 'DOING_CRON' );

            case 'frontend' :
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
        }
    }

} // We_POS

$wepos = We_POS::init();
