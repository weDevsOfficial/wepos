<?php
/**
 * Admin View: Dependency notice
 *
 * @since 1.1.9
 *
 * @package WePOS
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * @var bool $has_woocommerce
 * @var bool $woocommerce_installed
 */
?>

<div id="message" class="error">
    <h3><?php esc_html_e( 'WooCommerce Missing', 'wepos' ); ?></h3>
    <p>
        <?php
        $install_url = wp_nonce_url( add_query_arg( [
            'action' => 'install-plugin',
            'plugin' => 'woocommerce'
        ], admin_url( 'update.php' ) ), 'install-plugin_woocommerce' );

        // translators: 1$-2$: opening and closing <strong> tags, 3$-4$: link tags, takes to woocommerce plugin on wp.org, 5$-6$: opening and closing link tags, leads to plugins.php in admin
        $text = sprintf( esc_html__( '%1$swePOS is inactive.%2$s The %3$sWooCommerce plugin%4$s must be active for wePOS to work. Please %5$sinstall WooCommerce &raquo;%6$s', 'wepos' ), '<strong>', '</strong>', '<a href="https://wordpress.org/plugins/woocommerce/">', '</a>', '<a href="' . esc_url( $install_url ) . '">', '</a>' );

        if ( $woocommerce_installed ) {
            $install_url = wp_nonce_url( add_query_arg( [
                'action' => 'activate',
                'plugin' => urlencode( 'woocommerce/woocommerce.php' )
            ], admin_url( 'plugins.php' ) ), 'activate-plugin_woocommerce/woocommerce.php' );

            $is_install  = false;
            // translators: 1$-2$: opening and closing <strong> tags, 3$-4$: link tags, takes to woocommerce plugin on wp.org, 5$-6$: opening and closing link tags, leads to plugins.php in admin
            $text = sprintf( esc_html__( '%1$swePOS is inactive.%2$s The %3$sWooCommerce plugin%4$s must be active for wePOS to work. Please %5$sactivate WooCommerce &raquo;%6$s', 'wepos' ), '<strong>', '</strong>', '<a href="https://wordpress.org/plugins/woocommerce/">', '</a>', '<a href="' . esc_url( $install_url ) . '">', '</a>' );
        }
        echo $text;
        ?>
    </p>
</div>
