<?php

namespace WeDevs\WePOS\REST;

/**
 * User API Controller
 */
class UserController extends \WC_REST_Controller
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
    protected $base = 'users';

    /**
     * Register the routes for users.
     */
    public function register_routes()
    {
        register_rest_route($this->namespace, '/' . $this->base . '/login', array(
            array(
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => array($this, 'login_user'),
                'permission_callback' => array($this, 'login_user_permissions_check'),
                'args'                => array_merge($this->get_endpoint_args_for_item_schema(\WP_REST_Server::CREATABLE), array(
                    'username' => array(
                        'required' => true,
                        'description' => __('Username.', 'wepos'),
                        'type'     => 'string',
                    ),
                    'password' => array(
                        'required' => true,
                        'description' => __('Password.', 'wepos'),
                        'type'     => 'string',
                    ),
                )),
            )
        ));
    }

    /**
     * Get product permission checking
     *
     * @since 1.0.2
     *
     * @return bool|\WP_Error
     */
    public function login_user_permissions_check()
    {
        return true;
    }

    /**
     * Get products
     *
     * @since 1.0.5
     *
     * @return \WP_Error|\WP_REST_Response
     */
    public function login_user($request)
    {
        $params = $request->get_params();
        if ($params['username'] && $params['password']) {
            $userInfo =  wp_signon(array(
                'user_login'    => $params['username'],
                'user_password' => $params['password'],
                'remember'      => false
            ), false);
            if (is_wp_error($userInfo)) {
                return $userInfo;
            } else {
                return new \WP_REST_Response(['user' => $userInfo, 'nonce' => wp_create_nonce('wp_rest')]);
            }
        }

        return false;
    }
}
