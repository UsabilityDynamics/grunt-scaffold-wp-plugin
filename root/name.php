<?php
/**
 * Plugin Name: {%= plugin_name %}
 * Plugin URI: {%= plugin_url %}
 * Description: {%= description %}
 * Author: Usability Dynamics, Inc.
 * Version: {%= version %}
 * Text Domain: {%= text_domain %}
 * Author URI: http://usabilitydynamics.com
 *
 * Copyright 2012 - 2014 Usability Dynamics, Inc.  ( email : info@usabilitydynamics.com )
 *
 */

if( !function_exists( 'ud_get_{%= plugin_slug %}' ) ) {

  if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
    require_once ( __DIR__ . '/vendor/autoload.php' );
  }
  
  /**
   * Returns {%= plugin_name %} Instance
   *
   * @author Usability Dynamics, Inc.
   * @since {%= version %}
   */
  function ud_get_{%= plugin_slug %}( $key = false, $default = null ) {
    if( class_exists( '\{%= namespace %}\{%= bootstrap_class %}' ) ) {
      $instance = \{%= namespace %}\{%= bootstrap_class %}::get_instance();
      return $key ? $instance->get( $key, $default ) : $instance;
    }
    return false;
  }

}

//** Initialize. */
ud_get_{%= plugin_slug %}();