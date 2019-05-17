<?php
namespace WePOS\api;

/**
* Payment API Controller
*/
class Products extends \WC_REST_Products_Controller {

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
    protected $base = 'products';

    /**
     * Register the routes for taxes.
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->base, array(
            array(
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_products' ),
                'permission_callback' => array( $this, 'get_products_permissions_check' ),
                'args'                => $this->get_collection_params(),
            ),
            'schema' => array( $this, 'get_public_item_schema' ),
        ) );
    }

    /**
     * Get taxes permission checking
     *
     * @since 1.0.2
     *
     * @return void
     */
    public function create_customer_permission_callback() {
        if ( ! ( current_user_can( 'manage_woocommerce' ) || apply_filters( 'wepos_rest_manager_permissions', false ) ) ) {
            return new \WP_Error( 'wepos_rest_cannot_batch', __( 'Sorry, you are not allowed view this resource.', 'wepos' ), array( 'status' => rest_authorization_required_code() ) );
        }

        return true;
    }

    /**
     * Get taxes permission checking
     *
     * @since 1.0.2
     *
     * @return void
     */
    public function get_products_permissions_check() {
        if ( ! ( current_user_can( 'manage_woocommerce' ) || apply_filters( 'wepos_rest_manager_permissions', false ) ) ) {
            return new \WP_Error( 'wepos_rest_cannot_batch', __( 'Sorry, you are not allowed view this resource.', 'wepos' ), array( 'status' => rest_authorization_required_code() ) );
        }

        return true;
    }

    /**
     * Create a customer
     *
     * @since 1.0.5
     *
     * @return void
     */
    public function create_customer( $request ) {
        return $this->create_item( $request );
    }

    /**
     * Get customers
     *
     * @since 1.0.5
     *
     * @return void
     */
    public function get_products( $request ) {
        return $this->get_items( $request );
    }
}