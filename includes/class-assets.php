<?php
namespace WePOS;

/**
 * Scripts and Styles Class
 */
class Assets {

    function __construct() {

        if ( is_admin() ) {
            add_action( 'admin_enqueue_scripts', [ $this, 'register' ], 5 );
        } else {
            add_action( 'wepos_enqueue_scripts', [ $this, 'register' ], 5 );
        }
    }

    /**
     * Register our app scripts and styles
     *
     * @return void
     */
    public function register() {
        $this->register_scripts( $this->get_scripts() );
        $this->register_styles( $this->get_styles() );
        $this->enqueue_all_scripts();
        $this->register_localize();
    }

    /**
     * Register scripts
     *
     * @param  array $scripts
     *
     * @return void
     */
    private function register_scripts( $scripts ) {
        foreach ( $scripts as $handle => $script ) {
            $deps      = isset( $script['deps'] ) ? $script['deps'] : false;
            $in_footer = isset( $script['in_footer'] ) ? $script['in_footer'] : false;
            $version   = isset( $script['version'] ) ? $script['version'] : WCPOS_VERSION;

            wp_register_script( $handle, $script['src'], $deps, $version, $in_footer );
        }
    }

    /**
     * Register styles
     *
     * @param  array $styles
     *
     * @return void
     */
    public function register_styles( $styles ) {
        foreach ( $styles as $handle => $style ) {
            $deps = isset( $style['deps'] ) ? $style['deps'] : false;

            wp_register_style( $handle, $style['src'], $deps, WCPOS_VERSION );
        }
    }

    /**
     * Get all registered scripts
     *
     * @return array
     */
    public function get_scripts() {
        $prefix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '.min' : '';

        $scripts = [
            'wepos-tinymce' => array(
                'src'       => site_url( '/wp-includes/js/tinymce/tinymce.min.js' ),
                'deps'      => array()
            ),
            'wepos-tinymce-plugin' => array(
                'src'     => WCPOS_ASSETS . '/src/vendors/tinymce/code/plugin.min.js',
                'deps'    => array('wepos-tinymce'),
                'version' => time()
            ),
            'wepos-i18n-jed' => array(
                'src'       => WCPOS_ASSETS . '/js/jed.js',
                'version'   => filemtime( WCPOS_PATH . '/assets/js/jed.js' ),
                'in_footer' => false
            ),
            'wepos-jquery' => [
                'src'       => WCPOS_ASSETS . '/js/jquery.min.js',
                'version'   => filemtime( WCPOS_PATH . '/assets/js/jquery.min.js' ),
                'in_footer' => true
            ],
            'wepos-blockui' => [
                'src'       => WC()->plugin_url() . '/assets/js/jquery-blockui/jquery.blockUI.min.js',
                'deps'      => array( 'wepos-jquery' ),
                'in_footer' => true
            ],
            'wepos-accounting' => array(
                'src'       => WC()->plugin_url() . '/assets/js/accounting/accounting.min.js',
                'deps'      => array( 'wepos-jquery' )
            ),
            'wepos-vendor' => [
                'src'       => WCPOS_ASSETS . '/js/vendor.js',
                'version'   => filemtime( WCPOS_PATH . '/assets/js/vendor.js' ),
                'in_footer' => true
            ],
            'wepos-bootstrap' => [
                'src'       => WCPOS_ASSETS . '/js/bootstrap.js',
                'version'   => filemtime( WCPOS_PATH . '/assets/js/bootstrap.js' ),
                'in_footer' => true
            ],
            'wepos-frontend' => [
                'src'       => WCPOS_ASSETS . '/js/frontend.js',
                'deps'      => [ 'wepos-jquery', 'wepos-i18n-jed', 'wepos-vendor', 'wepos-bootstrap' ],
                'version'   => filemtime( WCPOS_PATH . '/assets/js/frontend.js' ),
                'in_footer' => true
            ],
            'wepos-admin' => [
                'src'       => WCPOS_ASSETS . '/js/admin.js',
                'deps'      => [ 'jquery', 'wepos-i18n-jed', 'wepos-vendor', 'wepos-bootstrap' ],
                'version'   => filemtime( WCPOS_PATH . '/assets/js/admin.js' ),
                'in_footer' => true
            ],

        ];

        return $scripts;
    }

    /**
     * Get registered styles
     *
     * @return array
     */
    public function get_styles() {

        $styles = [
            'wepos-flaticon' => [
                'src' =>  WCPOS_ASSETS . '/css/flaticon.css'
            ],
            'wepos-style' => [
                'src' =>  WCPOS_ASSETS . '/css/style.css'
            ],
            'wepos-frontend' => [
                'src' =>  WCPOS_ASSETS . '/css/frontend.css'
            ],
            'wepos-admin' => [
                'src' =>  WCPOS_ASSETS . '/css/admin.css'
            ],
            'wepos-tinymce' => [
                'src'     => site_url( '/wp-includes/css/editor.css' ),
                'deps'    => array(),
                'version' => time()
            ],
        ];

        return $styles;
    }

    public function enqueue_all_scripts() {
        if ( ! is_admin() ) {
            // Enqueue all style
            wp_enqueue_style( 'wepos-flaticon' );
            wp_enqueue_style( 'wepos-style' );
            wp_enqueue_style( 'wepos-frontend' );

            // Load scripts
            wp_enqueue_script( 'wepos-blockui' );
            wp_enqueue_script( 'wepos-accounting' );
            wp_enqueue_script( 'wepos-frontend' );
        }
    }

    /**
     * Set localize script data
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function register_localize() {
        $localize_data = apply_filters( 'wepos_localize_data', [
            'rest' => array(
                'root'    => esc_url_raw( get_rest_url() ),
                'nonce'   => wp_create_nonce( 'wp_rest' ),
                'wcversion' => 'wc/v3',
                'posversion' => 'wepos/v1',
            ),
            'ajaxurl'                      => admin_url( 'admin-ajax.php' ),
            'nonce'                        => wp_create_nonce( 'wepos_nonce' ),
            'libs'                         => [],
            'i18n'                         => array( 'wepos' => wepos_get_jed_locale_data( 'wepos' ) ),
            'mon_decimal_point'            => wc_get_price_decimal_separator(),
            'currency_format_num_decimals' => wc_get_price_decimals(),
            'currency_format_symbol'       => get_woocommerce_currency_symbol(),
            'currency_format_decimal_sep'  => esc_attr( wc_get_price_decimal_separator() ),
            'currency_format_thousand_sep' => esc_attr( wc_get_price_thousand_separator() ),
            'currency_format'              => esc_attr( str_replace( array( '%1$s', '%2$s' ), array( '%s', '%v' ), get_woocommerce_price_format() ) ), // For accounting JS
            'rounding_precision'           => wc_get_rounding_precision(),
            'assets_url'                   => WCPOS_ASSETS,
            'placeholder_image'            => wc_placeholder_img_src(),
            'ajax_loader'                  => WCPOS_ASSETS . '/images/spinner-2x.gif',
        ] );

        wp_localize_script( 'wepos-vendor', 'wepos', $localize_data );
    }

}
