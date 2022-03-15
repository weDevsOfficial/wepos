<?php

namespace WeDevs\WePOS\Admin;

/**
 * Remote Promotion class
 */
class RemotePromotion {

	/**
	 * URL to the wePOS Remote RemotePromotion API.
	 *
	 * @var string
	 */
	protected $url;

	/**
	 * Request arguments.
	 *
	 * @var array
	 */
	protected $request_args;

	/**
	 * Cache key for remote promotions.
	 *
	 * @var string
	 */
	protected $cache_key;

	/**
	 * Cache time for remote promotions.
	 *
	 * @var int
	 */
	protected $cache_time;

	/**
	 * RemotePromotion Constructor.
	 *
	 * @var string
	 */
	public function __construct() {
		$this->url          = 'https://raw.githubusercontent.com/weDevsOfficial/wepos-utils/master/promotion/data.json';
		$this->request_args = array(
			'sslverify' => true,
			'timeout'   => 120,
		);

		$this->cache_key  = '_wepos_remote_promotions';
		$this->cache_time = HOUR_IN_SECONDS;
	}

	/**
	 * @return string
	 */
	public function get_url() {
		return $this->url;
	}

	/**
	 * @param string $url
	 */
	public function set_url( $url ) {
		$this->url = $url;
	}

	/**
	 * @return array
	 */
	public function get_request_args() {
		return $this->request_args;
	}

	/**
	 * @param array $request_args
	 */
	public function set_request_args( $request_args ) {
		$this->request_args = $request_args;
	}

	/**
	 * @return string
	 */
	public function get_cache_key() {
		return $this->cache_key;
	}

	/**
	 * @param string $cache_key
	 */
	public function set_cache_key( $cache_key ) {
		$this->cache_key = $cache_key;
	}

	/**
	 * @return int
	 */
	public function get_cache_time() {
		return $this->cache_time;
	}

	/**
	 * @param int $cache_time
	 */
	public function set_cache_time( $cache_time ) {
		$this->cache_time = $cache_time;
	}

	/**
	 * Get promotion data from API URL.
	 *
	 * @return array
	 */
	public function get_data() {
		// Get the cached data.
		$data = get_transient( $this->cache_key );

		if ( empty( $data ) ) {
			$response = wp_remote_get( $this->url, $this->request_args );

			if ( ! is_wp_error( $response ) ) {
				$body           = wp_remote_retrieve_body( $response );
				$promotion_data = json_decode( $body, true );

				// Cache for 1 hour.
				set_transient( $this->cache_key, $promotion_data, $this->cache_time );

				return $promotion_data;
			}
		}

		return is_array( $data ) ? $data : array();
	}
}
