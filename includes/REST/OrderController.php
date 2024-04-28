<?php

namespace WeDevs\WePOS\REST;

/**
 * Order API Controller
 */
class OrderController extends \WC_REST_Orders_Controller
{

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
    protected $base = 'orders';

    /**
     * Register the routes for orders.
     */
    public function register_routes()
    {
        register_rest_route($this->namespace, '/' . $this->base, array(
            array(
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => array($this, 'get_orders'),
                'permission_callback' => array($this, 'get_orders_permissions_check'),
                'args'                => $this->get_collection_params(),
            ),
            'schema' => array($this, 'get_item_schema'),
        ));
        register_rest_route(
            $this->namespace,
            '/' . $this->base . '/(?P<id>[\d]+)',
            array(
                'args'   => array(
                    'id' => array(
                        'description' => __('Unique identifier for the resource.', 'woocommerce'),
                        'type'        => 'integer',
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array($this, 'get_item'),
                    'permission_callback' => array($this, 'get_item_permissions_check'),
                    'args'                => array(
                        'context' => $this->get_context_param(array('default' => 'view')),
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array($this, 'update_item'),
                    'permission_callback' => array($this, 'update_item_permissions_check'),
                    'args'                => $this->get_endpoint_args_for_item_schema(\WP_REST_Server::EDITABLE),
                ),
                'schema' => array($this, 'get_public_item_schema'),
            )
        );
    }

    /**
     * Get order permission checking
     *
     * @since 1.0.2
     *
     * @return bool|\WP_Error
     */
    public function get_orders_permissions_check()
    {
        if (!(current_user_can('manage_woocommerce') || apply_filters('wepos_rest_manager_permissions', false))) {
            return new \WP_Error('wepos_rest_cannot_batch', __('Sorry, you are not allowed view this resource.', 'wepos'), array('status' => rest_authorization_required_code()));
        }

        return true;
    }

    /**
     * Get orders
     *
     * @since 1.0.5
     *
     * @return \WP_Error|\WP_REST_Response
     */
    public function get_orders($request)
    {
        return $this->get_items($request);
    }
}
