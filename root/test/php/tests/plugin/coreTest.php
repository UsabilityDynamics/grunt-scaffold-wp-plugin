<?php
/**
 * Be sure plugin's core is loaded.
 *
 * @class CoreTest
 */
class CoreTest extends UD_Plugin_WP_UnitTestCase {

  /**
   * 
   * @group core
   */
  function testGetInstance() {
    $this->assertTrue( function_exists( 'ud_get_{%= slug %}' ) );
    $data = ud_get_{%= slug %}();
    $this->assertTrue( is_object( $data ) && get_class( $data ) == '{%= namespace %}\{%= bootstrap_class %}' );
  }
  
  /**
   *
   * @group core
   */
  function testInstance() {
    $this->assertTrue( is_object( $this->instance ) );
  }
  
}
