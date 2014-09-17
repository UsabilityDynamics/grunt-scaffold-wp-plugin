/**
 * Build Plugin
 *
 * @author Usability Dynamics, Inc.
 * @version 2.0.0
 * @param grunt
 */
module.exports = function build( grunt ) {

  // Automatically Load Tasks.
  require( 'load-grunt-tasks' )( grunt, {
    pattern: 'grunt-*',
    config: './package.json',
    scope: 'devDependencies'
  });

  grunt.initConfig( {

    package: grunt.file.readJSON( 'composer.json' ),

    // Locale.
    pot: {
      options:{
        package_name: '{%= name %}',
        package_version: '<%= package.version %>',
        text_domain: '{%= text_domain %}',
        dest: 'static/languages/',
        keywords: [ 'gettext', 'ngettext:1,2' ]
      },
      files:{
        src:  [ '**/*.php', 'lib/*.php' ],
        expand: true
      }
    },
    
    // Documentation.
    yuidoc: {
      compile: {
        name: '<%= package.name %>',
        description: '<%= package.description %>',
        version: '<%= package.version %>',
        url: '<%= package.homepage %>',
        options: {
          paths: 'lib',
          outdir: 'static/codex/'
        }
      }
    },

    // Compile LESS
    less: {
      production: {
        options: {
          yuicompress: true,
          relativeUrls: true
        },
        files: {}
      },
      development: {
        options: {
          relativeUrls: true
        },
        files: {}
      }
    },

    watch: {
      options: {
        interval: 100,
        debounceDelay: 500
      },
      less: {
        files: [
          'static/styles/src/*.*'
        ],
        tasks: [ 'less' ]
      },
      js: {
        files: [
          'static/scripts/src/*.*'
        ],
        tasks: [ 'uglify' ]
      }
    },

    uglify: {
      production: {
        options: {
          mangle: false,
          beautify: false
        },
        files: [
          {
            expand: true,
            cwd: 'static/scripts/src',
            src: [ '*.js' ],
            dest: 'static/scripts'
          }
        ]
      },
      staging: {
        options: {
          mangle: false,
          beautify: true
        },
        files: [
          {
            expand: true,
            cwd: 'static/scripts/src',
            src: [ '*.js' ],
            dest: 'static/scripts'
          }
        ]
      }
    },

    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'readme.md',
            dest: 'static/',
            ext: '.html'
          }
        ],
        options: {
          markdownOptions: {
            gfm: true,
            codeLines: {
              before: '<span>',
              after: '</span>'
            }
          }
        }
      }
    },

    clean: {
      all: [
        "composer.lock"
      ]
    },

    shell: {
      /**
       * Build project
       */
      build: {
        command: function( tag, build_type ) {
          return [
            'sh build.sh ' + tag + ' ' + build_type
          ].join( ' && ' );
        },
        options: {
          encoding: 'utf8',
          stderr: true,
          stdout: true
        }
      },
      /**
       * Runs PHPUnit test, creates code coverage and sends it to Scrutinizer
       */
      coverageScrutinizer: {
        command: [
          'grunt phpunit:circleci --coverage-clover=coverage.clover',
          'wget https://scrutinizer-ci.com/ocular.phar',
          'php ocular.phar code-coverage:upload --format=php-clover coverage.clover'
        ].join( ' && ' ),
        options: {
          encoding: 'utf8',
          stderr: true,
          stdout: true
        }
      },
      /**
       * Runs PHPUnit test, creates code coverage and sends it to Code Climate
       */
      coverageCodeClimate: {
        command: [
          'grunt phpunit:circleci --coverage-clover build/logs/clover.xml',
          'CODECLIMATE_REPO_TOKEN='+ process.env.CODECLIMATE_REPO_TOKEN + ' ./vendor/bin/test-reporter'
        ].join( ' && ' ),
        options: {
          encoding: 'utf8',
          stderr: true,
          stdout: true
        }
      },
      /**
       * Composer Install
       */
      install: {
        options: {
          stdout: true
        },
        command: 'composer install --no-dev'
      },
      /**
       * Composer Update
       */
      update: {
        options: {
          stdout: true
        },
        command: 'composer update --no-dev --prefer-source'
      }
    },
    
    // Runs PHPUnit Tests
    phpunit: {
      classes: {},
      options: {
        bin: './vendor/bin/phpunit',
      },
      local: {
        configuration: './test/php/phpunit.xml'
      },
      circleci: {
        configuration: './test/php/phpunit-circle.xml'
      }
    }

  });

  // Register tasks
  grunt.registerTask( 'default', [ 'markdown', 'less' , 'yuidoc', 'uglify' ] );
  
  // Build Distribution
  grunt.registerTask( 'distribution', [ 'pot' ] );

  // Update Environment
  grunt.registerTask( 'update', [ "clean", "shell:update" ] );
  
  // Run coverage tests
  grunt.registerTask( 'testscrutinizer', [ 'shell:coverageScrutinizer' ] );
  grunt.registerTask( 'testcodeclimate', [ 'shell:coverageCodeClimate' ] );
  
  // Test and Build
  grunt.registerTask( 'localtest', [ 'phpunit:local' ] );
  grunt.registerTask( 'test', [ 'phpunit:circleci' ] );
  
  // Build project
  grunt.registerTask( 'build', 'Run all my build tasks.', function( tag, build_type ) {
    if ( tag == null ) grunt.warn( 'Build tag must be specified, like build:1.0.0' );
    if( build_type == null ) build_type = 'production';
    grunt.task.run( 'shell:build:' + tag + ':' + build_type );
  });

};
