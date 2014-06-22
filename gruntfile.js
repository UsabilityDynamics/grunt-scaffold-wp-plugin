/**
 * Library Build.
 *
 * @author peshkov@UD
 * @version 1.1.2
 * @param grunt
 */
module.exports = function build( grunt ) {

  // Require Utility Modules.
  var joinPath  = require( 'path' ).join;
  var findup    = require( 'findup-sync' );

  // Determine Paths.
  var _paths = {
    staticFiles: findup( 'static' )
  };

  // Automatically Load Tasks.
  require( 'load-grunt-tasks' )( grunt, {
    pattern: 'grunt-*',
    config: './package.json',
    scope: 'devDependencies'
  });

  grunt.initConfig({
    
    // Read Composer File.
    config: grunt.file.readJSON( 'package.json' ).config,
    
    // Sets generic config settings, callable via grunt.config.get('meta').environment or <%= grunt.config.get("meta").environment %>
    meta: {
      ci: process.env.CI || process.env.CIRCLECI ? true : false,
      environment: process.env.NODE_ENV || 'production'
    }

  });

  
  // Register NPM Tasks.
  grunt.registerTask( 'default', function() {

    // grunt.task.run( 'mochaTest' );
    
    if( grunt.config.get( 'meta.ci' ) ) {
      // grunt.task.run( 'test:quality' );
    }
    
  });
  
  grunt.registerTask( 'publish', function() {
    
  });
  

};