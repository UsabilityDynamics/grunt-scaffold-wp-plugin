<?php
/**
 * Bootstrap
 *
 * @since {%= version %}
 */
namespace {%= namespace %} {

  if( !class_exists( '{%= namespace %}\{%= bootstrap_class %}' ) ) {

    final class {%= bootstrap_class %} extends \UsabilityDynamics\WP\Bootstrap {
      
      /**
       * Singleton Instance Reference.
       *
       * @protected
       * @static
       * @property $instance
       * @type {%= namespace %}\{%= bootstrap_class %} object
       */
      protected static $instance = null;
      
      /**
       * Instantaite class.
       */
      public function init() {
        //** Be sure we do not have errors. Do not initialize plugin if we have them. */
        if( $this->has_errors() ) {
          return null;
        }
        
        //** Here is we go. */
      }
      
      /**
       * Plugin Activation
       *
       */
      public function activate() {}
      
      /**
       * Plugin Deactivation
       *
       */
      public function deactivate() {}

    }

  }

}
