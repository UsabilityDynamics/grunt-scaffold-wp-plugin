/**
 * Library Scaffolding Template
 *
 * Will generate a composer.json, component.json and package.json files with directory structure compliant with
 * all three package managers.
 *
 * @example
 *
 *    // Clone Library Scaffolding template into Grunt's template directory
 *    $ git clone git@github.com:UsabilityDynamics/scaffold-library.git ~/.grunt-init/library
 *
 *    // Crate new directory for future library
 *    $ mkdir my-library
 *
 *    // Move into the new directory and call grunt-init
 *    $ cd my-library && grunt-init library
 *
 * @repository UsabilityDynamics/scaffold-library
 * @method Template
 * @author potanin@UD
 * @version 0.1.0
 */
function Template( grunt, init, done) {

  var _extend = grunt.util._.extend;

  init.process( {type: 'module'}, [

    init.prompt( 'name' ),
    init.prompt( 'description' ),
    init.prompt( 'version', '0.0.1' ),
    init.prompt( 'licenses' ),
    init.prompt( 'author_name', 'Usability Dynamics' ),
    init.prompt( 'author_email', 'info@UsabilityDynamics.com' ),
    init.prompt( 'author_url', 'http://UsabilityDynamics.com' ),
    init.prompt( 'node_version', '>=0.10.21' )

  ], function( err, props ) {

    props = _extend( props, {
      "keywords": [ "library", "component", "composer" ],
      "private": true,
      "directories": {
        "test": "./test",
        "templates": "./templates",
        "scripts": "./scripts",
        "vendor": "./vendor",
        "images": "./images",
        "styles": "./styles",
        "doc": "./static/codex",
        "bin": "./bin",
        "lib": "./lib"
      },
      "contributors": [
        {
          "name": "Anton Korotkov",
          "email": "anton.korotkov@UsabilityDynamics.com",
          "url": "http://UsabilityDynamics.com"
        },
        {
          "name": "Maxim Peshkov",
          "email": "maxim.peshkov@UsabilityDynamics.com",
          "url": "http://UsabilityDynamics.com"
        },
        {
          "name": "Andy Potanin",
          "email": "andy.potanin@UsabilityDynamics.com",
          "url": "http://UsabilityDynamics.com"
        }
      ],
      "dependencies": {},
      "devDependencies": {
        "grunt-markdown": "~0.4.0",
        "grunt-contrib-symlink": "*",
        "grunt-contrib-yuidoc": "*",
        "grunt-contrib-watch": "*",
        "grunt-contrib-less": "*",
        "grunt-contrib-concat": "*",
        "grunt-contrib-clean": "*",
        "grunt-jscoverage": "0.0.3",
        "grunt-shell": "*",
        "mocha": "*",
        "should": "*",
        "grunt": "~0.4.1"
      },
      "repo": {
        type: 'git',
        url: 'git://github.com/UsabilityDynamics/lib-' + props.name
      },
      "homepage": 'http://github.com/UsabilityDynamics/lib-' + props.name,
      "bugs":'http://github.com/UsabilityDynamics/lib-' + props.name + '/issues',
      "copyright": "Copyright (c) 2013 Usability Dynamics, Inc."
    });

    var component = {
      "name": props.name,
      "version": props.version,
      "description": props.description,
      "homepage": props.homepage,
      "name": 'usabilitydynamics/lib-' + props.name,
      "dependencies": {},
      "scripts": [ props.directories.scripts ],
      "templates": [ props.directories.templates ],
      "styles": [ props.directories.styles ],
      "files": [ props.directories.lib ],
      "authors": props.authors,
      "license": "MIT"
    }

    var composer = {
      "name": 'usabilitydynamics/' + props.name,
      "type": 'library',
      "version": props.version,
      "description": props.description,
      "require": {},
      "repositories": [{ "type": "composer", "url": "http://udx.io" }],
      "minimum-stability": "dev",
      "homepage": props.homepage,
      "authors": props.authors,
      "autoload": { "files": [ "lib/" + props.name + ".php" ] },
      "extra": {
        "component": component
      },
      "support": { "issues": props.bugs },
      "license": "MIT"
    }

    var _files = init.filesToCopy( props );

    init.copyAndProcess( _files , props );

    init.addLicenseFiles( _files , props.licenses);

    init.writePackageJSON( 'package.json', props );

    grunt.file.write( init.destpath( 'composer.json' ), JSON.stringify( composer, null, 2 ) );
    grunt.file.write( init.destpath( 'component.json' ), JSON.stringify( component, null, 2 ) );

    done();

  });

}

/**
 * Module Properties
 *
 */
Object.defineProperties( module.exports, {
  description: {
    value: 'Create a Composer, Component, Node.js shared library.',
    enumerable: true
  },
  notes: {
    value: '_Project name_ shoul not contain "lib" as it will prefixed automatically.',
    enumerable: true
  },
  after: {
    value: '',
    enumerable: true
  },
  warnOn: {
    value: '*',
    enumerable: true
  },
  template: {
    value: Template,
    enumerable: true
  }
});