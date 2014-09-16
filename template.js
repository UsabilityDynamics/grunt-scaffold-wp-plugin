/*
 * Node.js Scaffolding Template
 *
 *
 * @todo After scaffolding, run "npm install" automatically.
 * @todo If GitHub repository given, attempt to create repository and commmit project after creation.
 * @todo If GitHub repository was created, create Wiki and set up as subdmodule in static/wiki.
 * 
 * @version 1.0.0
 */
var deepExtend = require( 'deep-extend' );
var options = {
  type: 'module'
};

exports.description = 'Create Wordpress Plugin.';
exports.template = function(grunt, init, done) {

  var prompts = [
    init.prompt( 'plugin_name' ),
    init.prompt( 'plugin_filename', 'plugin-file' ),
    init.prompt( 'plugin_slug', 'plugin_slug_with_underscore' ),
    init.prompt( 'plugin_url', 'https://usabilitydynamics.com' ),
    init.prompt( 'github_name', 'usabilitydynamics/wp-my-plugin' ),
    init.prompt( 'github_short_name', 'wp-my-plugin' ),
    init.prompt( 'vesrion', '1.0.0' ),
    init.prompt( 'description' ),
    init.prompt( 'text_domain' ),
    init.prompt( 'namespace', '\UsabilityDynamics\Plugin' ),
    init.prompt( 'bootstrap_class', 'Bootstrap' )
  ];

  init.process( options, prompts, processCallback );

  function processCallback( err, props ) {
  
    var _package = deepExtend( require( './root/package.json' ), props );
    var _composer = deepExtend( require( './root/composer.json' ), {} );

    // Copy Files.
    init.copyAndProcess( init.filesToCopy( _package ), _package );

    // Write Package to Disk.
    init.writePackageJSON( 'package.json', _package );
    
    done();

  }
  
};

