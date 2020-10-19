<?php
namespace WeDevs\WePOS\REST;

/**
 * Payment API Controller
 */
class SettingController extends \WP_REST_Controller {

	/**
	 * Endpoint namespace
	 *
	 * @var string
	 */
	protected $namespace = 'wepos/v1';

	/**
	 * Route name
	 *
	 * @var string
	 */
	protected $base = 'settings';

    /**
     * Register all routes releated with stores
     *
     * @since 1.1.2
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->base, array(
            array(
                'methods'              => \WP_REST_Server::READABLE,
                'callback'             => array( $this, 'get_settings' ),
                'args'                 => $this->get_collection_params(),
                'permission_callback'  => [ $this, 'get_setting_permission_check' ]
            ),
        ) );
    }

	/**
	 * Setting permission check
	 *
	 * @since 1.1.2
	 *
	 * @return void
	 */
	public function get_setting_permission_check() {
		if ( ! ( current_user_can( 'manage_woocommerce' ) || apply_filters( 'wepos_rest_manager_permissions', false ) ) ) {
			return new \WP_Error( 'wepos_rest_cannot_batch', __( 'Sorry, you are not allowed view this resource.', 'wepos' ), array( 'status' => rest_authorization_required_code() ) );
		}

		return true;
	}

	/**
	 * Get available gateways
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function get_settings( $request ) {
		$settings = [];

		foreach ( wepos_get_settings_fields() as $section_key => $settings_options ) {
			$section_option = get_option( $section_key, [] );
			foreach ( $settings_options as $settings_key => $settings_value ) {
				$settings[$section_key][$settings_key] = isset( $section_option[$settings_key] ) ? $section_option[$settings_key] : $settings_options[$settings_key]['default'];
			}
		}

		$tax_display_on_shop = get_option( 'woocommerce_tax_display_shop', 'excl' );
		$tax_display_on_cart = get_option( 'woocommerce_tax_display_cart', 'excl' );
		$settings['woo_tax'] = [
			'wc_tax_display_shop' => $tax_display_on_shop,
			'wc_tax_display_cart' => $tax_display_on_cart,
		];

		return rest_ensure_response( $settings );
	}

}