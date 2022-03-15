<?php


namespace WeDevs\WePOS\Admin;


/**
 * Limited time promotion class
 *
 * For displaying limited time promotion in admin panel
 *
 * @since 1.1.3
 *
 * @package wepos
 */
class LimitedTimePromotion {

    /**
     * Option key for limited time promo
     *
     * @var string
     */
    public $promo_option_key = '_wepos_limited_time_promo';

    /**
     * LimitedTimePromotion constructor
     */
    public function __construct() {
        add_action( 'admin_notices', [ $this, 'show_promotions' ] );
        add_action( 'wp_ajax_wepos_dismiss_limited_time_promotional_notice', [ $this, 'dismiss_limited_time_promo' ] );
    }

    /**
     * Shows promotions
     */
    public function show_promotions() {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            return;
        }

        // Show only on plugin pages
        if ( ! isset( $_GET['page'] ) || 0 !== strpos( sanitize_text_field( wp_unslash( $_GET['page'] ) ), 'wepos' ) ) {
            return;
        }

        $remote_promotion = new RemotePromotion();
        $notices = $remote_promotion->get_data();

        if ( empty( $notices ) ) {
            return;
        }

        $current_time_est = $this->get_current_time_est();
        $notice           = [];

        $already_displayed_promo = get_option( $this->promo_option_key, [] );

        foreach ( $notices as $ntc ) {
            if ( in_array( $ntc['key'], $already_displayed_promo, true ) ) {
                continue;
            }

            if ( strtotime( $ntc['start_date'] ) < strtotime( $current_time_est ) && strtotime( $current_time_est ) < strtotime( $ntc['end_date'] ) ) {
                $notice = $ntc;
            }
        }

        if ( empty( $notice ) ) {
            return;
        }

        ?>
        <div class="notice wepos-limited-time-promotional-notice">
            <div class="content">
                <h2><?php echo esc_html( $notice['title'] ); ?></h2>
                <p><?php echo esc_html( $notice['content'] ); ?></p>
                <a href="<?php echo esc_url( $notice['link'] ); ?>" class="button button-primary promo-btn" target="_blank"><?php echo esc_html__( 'Get Deals &rarr;', 'wepos' ); ?></a>
            </div>
            <span class="prmotion-close-icon dashicons dashicons-no-alt" data-key="<?php echo esc_attr( $notice['key'] ); ?>"></span>
            <div class="clear"></div>
        </div>

        <style>
            .wepos-limited-time-promotional-notice {
                padding: 20px;
                box-sizing: border-box;
                position: relative;
            }

            .wepos-limited-time-promotional-notice .prmotion-close-icon {
                position: absolute;
                top: 20px;
                right: 20px;
                cursor: pointer;
            }

            .wepos-limited-time-promotional-notice .content {
                float: left;
                width: 75%;
            }

            .wepos-limited-time-promotional-notice .content h2 {
                margin: 3px 0px 5px;
                font-size: 17px;
                font-weight: bold;
                color: #555;
                line-height: 25px;
            }

            .wepos-limited-time-promotional-notice .content p {
                font-size: 14px;
                text-align: justify;
                color: #666;
                margin-bottom: 10px;
            }

            .wepos-limited-time-promotional-notice .content a {
                border: none;
                box-shadow: none;
                height: 31px;
                line-height: 30px;
                border-radius: 3px;
                background: #007cf5;
                text-shadow: none;
                width: 140px;
                text-align: center;
            }
        </style>

        <script type='text/javascript'>
            jQuery( document ).ready( function ( $ ) {
                $( 'body' ).on( 'click', '.wepos-limited-time-promotional-notice span.prmotion-close-icon', function ( e ) {
                    e.preventDefault();

                    var self = $( this ),
                        key = self.data( 'key' );

                    wp.ajax.send( 'wepos_dismiss_limited_time_promotional_notice', {
                        data: {
                            wepos_limited_time_promotion_dismissed: true,
                            key: key,
                            nonce: '<?php echo esc_attr( wp_create_nonce( 'wepos_admin' ) ); ?>'
                        },
                        complete: function ( resp ) {
                            self.closest( '.wepos-limited-time-promotional-notice' ).fadeOut( 200 );
                        }
                    } );
                } );
            } );
        </script>

        <?php
    }

    /**
     * Dismisses limited time promo notice
     */
    public function dismiss_limited_time_promo() {
        $post_data = wp_unslash( $_POST );

        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            wp_send_json_error( __( 'You have no permission to do that', 'wepos' ) );
        }

        if ( ! wp_verify_nonce( $post_data['nonce'], 'wepos_admin' ) ) {
            wp_send_json_error( __( 'Invalid nonce', 'wepos' ) );
        }

        if ( isset( $post_data['wepos_limited_time_promotion_dismissed'] ) && $post_data['wepos_limited_time_promotion_dismissed'] ) {
            $already_displayed_promo   = get_option( $this->promo_option_key, [] );
            $already_displayed_promo[] = $post_data['key'];

            update_option( $this->promo_option_key, $already_displayed_promo );
            wp_send_json_success();
        }
    }


    /**
     * Gets current time and converts to EST timezone.
     * @return string
     */
    private function get_current_time_est() {
        $dt = new \DateTime( 'now', new \DateTimeZone( 'UTC' ) );
        $dt->setTimezone( new \DateTimeZone( 'EST' ) );

        return $dt->format( 'Y-m-d H:i:s T' );
    }

}
