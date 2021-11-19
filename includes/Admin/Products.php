<?php
namespace WeDevs\WePOS\Admin;

/**
* Admin product class
*
* @since 1.0.0
*/
class Products {

    /**
     * Product Constructor
     *
     * @since 1.0.0
     */
    public function __construct() {
        add_action( 'woocommerce_product_options_general_product_data', [ $this, 'add_barcode_field' ] );
        add_action( 'woocommerce_product_after_variable_attributes', [ $this, 'add_variation_barcode_field' ], 10, 3 );
        add_action( 'woocommerce_process_product_meta', [ $this, 'save_field' ] );
        add_action( 'woocommerce_save_product_variation', [ $this, 'save_variation_data' ], 10, 2 );
    }

    /**
     * Add barcode field
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function add_barcode_field() {
        $barcode_field = wepos_get_option( 'barcode_scanner_field', 'wepos_general', 'sku' );
        if ( $barcode_field != 'custom' ) {
            return;
        }
        echo '<div class="show_if_simple">';
        woocommerce_wp_text_input( [
            'id' => '_wepos_barcode',
            'label' => __( 'Barcode', 'wepos' ),
            'class' => 'wepos-barcode-field',
            'desc_tip' => true,
            'description' => __( 'Enter your unique barcode number or text for this product', 'wepos' ),
        ] );
        echo '</div>';
    }

    /**
     * Load barcode field for variations
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function add_variation_barcode_field( $loop, $variation_data, $variation ) {
        $barcode_field = wepos_get_option( 'barcode_scanner_field', 'wepos_general', 'sku' );

        if ( $barcode_field != 'custom' ) {
            return;
        }

        $variaton_product = wc_get_product( $variation->ID );
        ?>
        <div>
            <?php
                woocommerce_wp_text_input(
                    array(
                        'id'            => "_wepos_barcode{$loop}",
                        'name'          => "_wepos_barcode[{$loop}]",
                        'value'         => $variaton_product->get_meta( '_wepos_barcode' ),
                        'label'         => __( 'Barcode', 'wepos' ),
                        'wrapper_class' => 'form-row form-row-full',
                        'desc_tip' => true,
                        'description' => __( 'Enter your unique barcode number or text for this product', 'wepos' ),
                    )
                );
            ?>
        </div>
        <?php
    }

    /**
     * Save product custom fields
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function save_field( $post_id ) {
        $product    = wc_get_product( $post_id );
        $postdata   = wp_unslash( $_POST );
        $barcode    = isset( $postdata['_wepos_barcode'] ) ? sanitize_text_field( $postdata['_wepos_barcode'] ) : '';
        if ( $product->is_type( 'simple' ) ) {
            $product->update_meta_data( '_wepos_barcode', $barcode );
        } else {
            $product->update_meta_data( '_wepos_barcode', '' );
        }
        $product->save();
    }

    /**
     * Save variation data
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function save_variation_data( $variation_id, $i ) {
        $product  = wc_get_product( $variation_id );
        $postdata = wp_unslash( $_POST );
        $barcode  = isset( $postdata['_wepos_barcode'][$i] ) ?  sanitize_text_field( $postdata['_wepos_barcode'][$i] ) : '';
        $product->update_meta_data( '_wepos_barcode', $barcode );
        $product->save();
    }
}
