<?php
/*
Plugin Name: wePOS - Point Of Sale (POS) for WooCommerce
Plugin URI: https://wedevs.com/wepos
Description: A beautiful and fast Point of Sale (POS) system for WooCommerce
Version: 1.1.1
Author: weDevs
Author URI: https://wedevs.com/
Text Domain: wepos
Domain Path: /languages
WC requires at least: 3.0
WC tested up to: 3.8.1
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
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
    public $version = '1.1.1';

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
        add_action( 'woocommerce_init', array( $this, 'on_wc_init' ) );

        // Handle appseror tracker
        $this->appsero_init_tracker_wepos();
    }

    /**
     * Is WC active
     *
     * @since 1.0.8
     *
     * @return void
     */
    public function is_wc_active() {
        if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'wepos_active_plugins', get_option( 'active_plugins' ) ) ) ) {
            return true;
        }

        return false;
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
            'WePOS\gateways\Cash' => WEPOS_INCLUDES . '/gateways/class-cash-gateway.php'
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
        if ( ! $this->is_wc_active() ) {
            return;
        }

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
        define( 'WEPOS_VERSION', $this->version );
        define( 'WEPOS_FILE', __FILE__ );
        define( 'WEPOS_PATH', dirname( WEPOS_FILE ) );
        define( 'WEPOS_INCLUDES', WEPOS_PATH . '/includes' );
        define( 'WEPOS_URL', plugins_url( '', WEPOS_FILE ) );
        define( 'WEPOS_ASSETS', WEPOS_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugis are loaded
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_hooks();

        do_action( 'wepos_loaded' );
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

        if ( function_exists( 'dokan' ) ) {
            $users_query = new WP_User_Query( array(
                'role__in' => [ 'seller', 'vendor_staff' ]
            ) );
            $users = $users_query->get_results();

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
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate() {
        $users_query = new WP_User_Query( array(
            'role__in' => [ 'seller', 'vendor_staff' ]
        ) );
        $users = $users_query->get_results();

        if ( count( $users ) > 0 ) {
            foreach ( $users as $user ) {
                $user->remove_cap( 'publish_shop_orders' );
                $user->remove_cap( 'list_users' );
            }
        }
    }

    /**
     * Include the required files
     *
     * @return void
     */
    public function includes() {
        require_once WEPOS_INCLUDES . '/functions.php';
        require_once WEPOS_INCLUDES . '/class-assets.php';

        if ( $this->is_request( 'admin' ) ) {
            require_once WEPOS_INCLUDES . '/admin/class-admin.php';
            require_once WEPOS_INCLUDES . '/admin/class-settings.php';
            require_once WEPOS_INCLUDES . '/admin/class-products.php';
            require_once WEPOS_INCLUDES . '/admin/class-updates.php';
        }

        if ( $this->is_request( 'frontend' ) ) {
            require_once WEPOS_INCLUDES . '/class-frontend.php';
        }

        if ( class_exists( 'WeDevs_Dokan' ) ) {
            require_once WEPOS_INCLUDES . '/class-dokan.php';
        }

        require_once WEPOS_INCLUDES . '/class-rest-api.php';
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
            new WePOS\Admin\Updates();
        }

        if ( $this->is_request( 'frontend' ) ) {
            $this->container['frontend'] = new WePOS\Frontend();
        }

        if ( class_exists( 'WeDevs_Dokan' ) ) {
            $this->container['dokan'] = new WePOS\Dokan();
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

    /**
     * On WC init, include cart required files in REST request
     *
     * @since 1.0.5
     *
     * @return void
     */
    public function on_wc_init() {
        if ( wc()->is_rest_api_request() ) {
            $namespace = '/wepos/v1/';

            $rest_bases = [
                'products',
            ];

            foreach ( $rest_bases as $rest_base ) {
                $endpoint = $namespace . $rest_base;

                if ( strpos( $_SERVER['REQUEST_URI'], $endpoint ) ) {
                    $this->include_wc_files();
                    break;
                }
            }
        }
    }

    /**
     * Initialize the plugin tracker
     *
     * @return void
     */
    function appsero_init_tracker_wepos() {

        if ( ! class_exists( 'Appsero\Client' ) ) {
            require_once WEPOS_PATH . '/lib/appsero/src/Client.php';
        }


        $client = new Appsero\Client( '48fa1273-3e91-4cd6-9c07-d18ad6bc2f54', 'wePos', __FILE__ );

        // Active insights
        $client->insights()
                ->add_extra( function() {
                    $products = wc_get_products( [ 'fields' => 'ids', 'paginate' => true ] );
                    $orders   = wc_get_orders( [ 'fields' => 'ids', 'paginate' => true ] );

                    return [
                        'products' => $products->total,
                        'orders'   => $orders->total
                    ];
                } )
                ->init();
    }

    /**
     * Include cart required files in REST request
     *
     * @since 1.0.5
     *
     * @return void
     */
    public function include_wc_files() {
        if ( ! wc()->cart ) {
            include_once WC_ABSPATH . 'includes/wc-cart-functions.php';
            include_once WC_ABSPATH . 'includes/wc-notice-functions.php';
            include_once WC_ABSPATH . 'includes/class-wc-cart.php';
            include_once WC_ABSPATH . 'includes/class-wc-tax.php';
            include_once WC_ABSPATH . 'includes/class-wc-shipping-zones.php';
            include_once WC_ABSPATH . 'includes/class-wc-customer.php';
            include_once WC_ABSPATH . 'includes/class-wc-session-handler.php';

            // Session class, handles session data for users - can be overwritten if custom handler is needed.
            $session_class = apply_filters( 'woocommerce_session_handler', 'WC_Session_Handler' );
            wc()->session = new $session_class();
            wc()->session->init();

            wc()->customer = new WC_Customer( get_current_user_id(), true );
            // Cart needs the customer info.
            wc()->cart = new WC_Cart();

            // Customer should be saved during shutdown.
            add_action( 'shutdown', array( wc()->customer, 'save' ), 10 );
        }
    }

} // We_POS

$wepos = We_POS::init();
