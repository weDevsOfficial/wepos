<?php
namespace WeDevs\WePOS\REST;

/**
* Products Log API Controller
*/
class ProductsLogController extends \WP_REST_Controller {

    /**
     * Endpoint namespace.
     *
     * @var string
     */
    protected $namespace = 'wepos/v1';

    /**
     * Route name.
     *
     * @var string
     */
    protected $base = 'product/logs';

    /**
     * Register all routes related to products log.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->base, [
            [
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_items' ],
                'permission_callback' => [ $this, 'get_items_permission' ],
                'args'                => $this->get_collection_params(),
            ],
            [
                'methods'             => \WP_REST_Server::EDITABLE,
                'callback'            => [ $this, 'update_item' ],
                'permission_callback' => [ $this, 'update_item_permission' ],
                'args'                => [
                    'product_log_id' => [
                        'description' => __( 'ID of the product log.', 'wepos-pro' ),
                        'type'        => 'integer',
                        'context'     => [ 'view', 'edit' ],
                        'required'    => true,
                        'arg_options' => [
                            'sanitize_callback' => 'absint',
                        ],
                    ],
                ],
            ],
            'schema' => [ $this, 'get_item_schema' ],
        ] );

        register_rest_route( $this->namespace, '/' . $this->base . '/counter/create', [
            [
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'create_item' ],
                'permission_callback' => [ $this, 'create_item_permission' ],
                'args'                => [
                    'product_log_id' => [
                        'description' => __( 'ID of the product log.', 'wepos-pro' ),
                        'type'        => 'integer',
                        'context'     => [ 'view', 'edit' ],
                        'required'    => true,
                        'arg_options' => [
                            'sanitize_callback' => 'absint',
                        ],
                    ],
                ],
            ],
            'schema' => [ $this, 'get_item_schema' ],
        ] );
    }

    /**
     * Get items permission check.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param $request
     *
     * @return bool
     */
    public function get_items_permission( $request ) {
        if ( current_user_can( 'manage_woocommerce' ) || apply_filters( 'wepos_rest_manager_permissions', false ) ) {
            return true;
        }

        return false;
    }

    /**
     * Create item permission check.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param $request
     *
     * @return bool
     */
    public function create_item_permission( $request ) {
        return $this->get_items_permission( $request );
    }

    /**
     * Update item permission check.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param $request
     *
     * @return bool
     */
    public function update_item_permission( $request ) {
        return $this->get_items_permission( $request );
    }

    /**
     * Get product log items.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param \WP_Rest_Request $request
     *
     * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
     */
    public function get_items( $request ) {
        $params = $this->get_collection_params();

        foreach ( $params as $key => $value ) {
            if ( isset( $request[$key] ) && ( '' !== $request[$key] ) ) {
                $args[$key] = $request[$key];
            }
        }

        // Set 'limit' and 'offset'.
        $args['limit']  = $args['per_page'];
        $args['offset'] = ( $args['page'] - 1 ) * $args['limit'];

        // Unset 'per_page' and 'page'.
        unset( $args['per_page'] );
        unset( $args['page'] );

        $product_logs = wepos()->products_log->get_product_logs( $args );
        $data_objects = [];

        if ( ! empty( $product_logs ) ) {
            foreach( $product_logs as $product_log ) {
                $product_details = [
                    'id'             => $product_log->id,
                    'product_id'     => $product_log->product_id,
                    'product_title'  => $product_log->product_title,
                    'product_type'   => $product_log->product_type,
                    'product_sku'    => $product_log->product_sku,
                    'product_price'  => $product_log->product_price,
                    'product_stock'  => $product_log->product_stock,
                    'counter_counts' => $product_log->counter_counts,
                ];

                $response       = $this->prepare_item_for_response( $product_details, $request );
                $data_objects[] = $this->prepare_response_for_collection( $response );
            }
        }

        $response = rest_ensure_response( $data_objects );

        return $response;
    }

    /**
     * Update product log counter count item.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param \WP_Rest_Request $request
     *
     * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
     */
    public function update_item( $request ) {
        $params = $request->get_params();

        $response = wepos()->products_log->update_product_log_counter_counts( $params );

		if ( is_wp_error( $response ) ) {
			return new \WP_Error( $response->get_error_code(), $response->get_error_message(), $response->get_error_data() );
		}

		return rest_ensure_response( $response );
    }

    /**
     * Create product log counter item.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @param \WP_Rest_Request $request
     *
     * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
     */
    public function create_item( $request ) {
        $params = $request->get_params();

        $response = wepos()->products_log->insert_product_log_counter( $params );

		if ( is_wp_error( $response ) ) {
			return new \WP_Error( $response->get_error_code(), $response->get_error_message(), $response->get_error_data() );
		}

		return rest_ensure_response( $response );
    }

    /**
     * Retrieves the query params for collections.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return array $params
     */
    public function get_collection_params() {
        $params = parent::get_collection_params();

        $params['counter_id'] = [
            'description'       => __( 'Counter id to be returned in result set.', 'wepos' ),
            'type'              => 'integer',
            'sanitize_callback' => 'absint',
            'validate_callback' => 'rest_validate_request_arg',
        ];

        return $params;
    }

    /**
     * Prepares the item for REST response.
     *
     * @param mixed            $item    WordPress representation of the item.
     * @param \WP_REST_Request $request Request object.
     *
     * @return \WP_Error|object
     */
    public function prepare_item_for_response( $item, $request ) {
        $data   = [];
        $fields = $this->get_fields_for_response( $request );

        if ( in_array( 'id', $fields, true ) ) {
            $data['id'] = intval( $item['id'] );
        }

        if ( in_array( 'product_id', $fields, true ) ) {
            $data['product_id'] = intval( $item['product_id'] );
        }

        if ( in_array( 'product_title', $fields, true ) ) {
            $data['product_title'] = (string) $item['product_title'];
        }

        if ( in_array( 'product_type', $fields, true ) ) {
            $data['product_type'] = (string) $item['product_type'];
        }

        if ( in_array( 'product_sku', $fields, true ) ) {
            $data['product_sku'] = (string) $item['product_sku'];
        }

        if ( in_array( 'product_price', $fields, true ) ) {
            $data['product_price'] = floatval( $item['product_price'] );
        }

        if ( in_array( 'product_stock', $fields, true ) ) {
            $data['product_stock'] = intval( $item['product_stock'] );
        }

        if ( in_array( 'counter_counts', $fields, true ) ) {
            $data['counter_counts'] = intval( $item['counter_counts'] );
        }

        $context  = ! empty( $request['context'] ) ? $request['context'] : 'view';
        $data     = $this->filter_response_by_context( $data, $context );
        $response = rest_ensure_response( $data );

        return $response;
    }

    /**
     * Retrieves the payment summary schema, conforming to JSON Schema.
     *
     * @since WEPOS_LITE_SINCE
     *
     * @return array
     */
    public function get_item_schema() {
        if ( $this->schema ) {
            return $this->add_additional_fields_schema( $this->schema );
        }

        $schema = [
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'report',
            'type'       => 'object',
            'properties' => [
                'id' => [
                    'description' => __( 'ID of the product log.', 'wepos' ),
                    'type'        => 'integer',
                    'context'     => [ 'view' ],
                    'required'    => true,
                    'arg_options' => [
                        'sanitize_callback' => 'absint',
                    ],
                ],
                'product_id' => [
                    'description' => __( 'ID of the product.', 'wepos' ),
                    'type'        => 'integer',
                    'context'     => [ 'view' ],
                    'required'    => true,
                    'arg_options' => [
                        'sanitize_callback' => 'absint',
                    ],
                ],
                'product_title' => [
                    'description' => __( 'Title of the product.', 'wepos' ),
                    'type'        => 'string',
                    'context'     => [ 'view' ],
                    'required'    => true,
                    'arg_options' => [
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                ],
                'product_type' => [
                    'description' => __( 'Type of the product.', 'wepos' ),
                    'type'        => 'string',
                    'context'     => [ 'view' ],
                    'required'    => true,
                    'arg_options' => [
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                ],
                'product_sku' => [
                    'description' => __( 'SKU of the product.', 'wepos' ),
                    'type'        => 'string',
                    'context'     => [ 'view' ],
                    'required'    => true,
                    'arg_options' => [
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                ],
                'product_price' => [
                    'description' => __( 'Price of the product.', 'wepos' ),
                    'type'        => 'float',
                    'context'     => [ 'view' ],
                    'required'    => true,
                    'arg_options' => [
                        'sanitize_callback' => 'floatval',
                    ],
                ],
                'product_stock' => [
                    'description' => __( 'Remaining stock count of the product.', 'wepos' ),
                    'type'        => 'integer',
                    'context'     => [ 'view' ],
                    'required'    => true,
                    'arg_options' => [
                        'sanitize_callback' => 'absint',
                    ],
                ],
                'counter_counts' => [
                    'description' => __( 'Number of counter already received update for this product log.', 'wepos' ),
                    'type'        => 'integer',
                    'context'     => [ 'view' ],
                    'required'    => true,
                    'arg_options' => [
                        'sanitize_callback' => 'absint',
                    ],
                ],
            ],
        ];

        $this->schema = $schema;

        return $this->add_additional_fields_schema( $this->schema );
    }
}
