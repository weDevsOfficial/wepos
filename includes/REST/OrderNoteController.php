<?php

namespace WeDevs\WePOS\REST;

/**
 * Order API Controller
 */
class OrderNoteController extends \WC_REST_Order_Notes_Controller
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
    protected $base = 'orders/(?P<order_id>[\d]+)/notes';

    /**
     * Register the routes for orders.
     */
    public function register_routes()
    {
        register_rest_route($this->namespace, '/' . $this->base, array(
            'args' => array(
                'order_id'  => array(
                    'description' => __('The order ID.', 'woocommerce'),
                    'type'        => 'integer',
                ),
            ),
            array(
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => array($this, 'get_items'),
                'permission_callback' => array($this, 'get_items_permissions_check'),
                'args'                => $this->get_collection_params(),
            ),
            array(
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => array($this, 'create_item'),
                'permission_callback' => array($this, 'create_item_permissions_check'),
                'args'                => array_merge($this->get_endpoint_args_for_item_schema(\WP_REST_Server::CREATABLE), array(
                    'note' => array(
                        'type'        => 'string',
                        'description' => __('Order note content.', 'woocommerce'),
                        'required'    => true,
                    ),
                )),
            ),
            'schema' => array($this, 'get_public_item_schema'),
        ));

        register_rest_route($this->namespace, '/' . $this->base . '/(?P<id>[\d]+)', array(
            'args' => array(
                'id' => array(
                    'description' => __('Unique identifier for the resource.', 'woocommerce'),
                    'type'        => 'integer',
                ),
                'order_id'  => array(
                    'description' => __('The order ID.', 'woocommerce'),
                    'type'        => 'integer',
                ),
            ),

            array(
                'methods'             => \WP_REST_Server::DELETABLE,
                'callback'            => array($this, 'delete_item'),
                'permission_callback' => array($this, 'delete_item_permissions_check'),
                'args'                => array(
                    'force' => array(
                        'default'     => false,
                        'type'        => 'boolean',
                        'description' => __('Required to be true, as resource does not support trashing.', 'woocommerce'),
                    ),
                ),
            ),
            'schema' => array($this, 'get_public_item_schema'),
        ));
    }
}
