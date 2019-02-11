<?php
namespace WePOS;

/**
 * REST_API Handler
 */
class REST_API {

    /**
     * Class dir and class name mapping
     *
     * @var array
     */
    protected $class_map;

    /**
     * Load autometically
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function __construct() {
        $this->class_map = apply_filters( 'dokan_rest_api_class_map', array(
            WCPOS_INCLUDES . '/api/class-payment-controller.php' => 'WePOS\api\Payment',
            WCPOS_INCLUDES . '/api/class-settings-controller.php' => 'WePOS\api\Settings',
        ) );

        // Init REST API routes.
        add_action( 'rest_api_init', array( $this, 'register_rest_routes' ), 10 );
        add_filter( 'woocommerce_rest_prepare_product_object', [ $this, 'product_response' ], 10, 3 );
        add_filter( 'woocommerce_rest_prepare_product_variation_object', [ $this, 'product_response' ], 10, 3 );
        add_filter( 'woocommerce_rest_prepare_tax', [ $this, 'tax_response' ], 10, 3 );
    }

    /**
     * Register REST API routes.
     *
     * @since 1.0.0
     */
    public function register_rest_routes() {
        foreach ( $this->class_map as $file_name => $controller ) {
            require_once $file_name;
            $controller = new $controller();
            $controller->register_routes();
        }
    }

    /**
     * Modify product response for variations
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function product_response( $response, $product, $request ) {
        global $_wp_additional_image_sizes;

        $data           = $response->get_data();
        $type           = isset( $data['type'] ) ? $data['type'] : '';
        $variation_data = [];

        if ( 'variable' == $type ) {
            foreach( $data['variations'] as $variation ) {
                $response = WC()->api->WC_REST_Product_Variations_Controller->get_item(
                    [
                        'id'         => $variation,
                        'product_id' => $variation
                    ]
                );
                $variation_data[] = $response->get_data();
            }
        }

        $data['variations']    = [];
        $data['variations']    = $variation_data;

        $data['regular_display_price'] = wc_format_decimal( wc_get_price_to_display( $product, [ 'price' => $product->get_regular_price() ] ), wc_get_price_decimals() );
        $data['sales_display_price']   = wc_format_decimal( wc_get_price_to_display( $product, ['price' => $product->get_sale_price() ] ), wc_get_price_decimals() );
        $data['barcode']               = $product->get_meta( '_wepos_barcode' );

        $price_excl_tax     = wc_get_price_excluding_tax( $product );
        $price_incl_tax     = wc_get_price_including_tax( $product );
        $tax_amount         = $price_incl_tax - $price_excl_tax;
        $data['tax_amount'] = wc_format_decimal( $tax_amount, wc_get_price_decimals() );

        if ( ! empty( $data['images'] ) ) {
            foreach ( $data['images'] as $key => $image) {
                $image_urls = [];
                foreach ( $_wp_additional_image_sizes as $size => $value ) {
                    $image_info = wp_get_attachment_image_src( $image['id'], $size );
                    $data['images'][$key][$size] = $image_info[0];
                }
            }
        }

        $response->set_data( $data );
        return $response;
    }

    /**
     * Added some param in tax return
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function tax_response( $response, $tax, $request ) {
        $data = $response->get_data();
        $data['percentage_rate'] = \WC_Tax::get_rate_percent( $tax->tax_rate_id );
        $response->set_data( $data );
        return $response;
    }
}