#!/usr/bin/env node


var phantomflow = require( 'phantomflow' );
var findUp = require( 'findup-sync' );
var path = require('path');
var spawn = require('child_process').spawn;


var flow = phantomflow.init({
	debug: 1,
	createReport: true,
//  results: 'static/results',
	test: '/repositories/node-serve-php/test/acceptance/can-order-coffee-or-something.js'
});

console.log( 'flow', flow );
//flow.report();

flow.run(function(){
  console.log( 'out' );
    process.exit(0); // callback is executed when PhantomFlow is complete
}); 



return;
// @todo Use async.auto for structure.
var async = require( 'async' );

module.modulePath = path.dirname( findUp( 'package.json', { cwd: __dirname } ) );

// console.log( module.modulePath );
console.log( 'Installing into', process.cwd() );

var init = spawn( 'grunt-init', [ module.modulePath, '--no-color' ], {
  end: process.env,
  cwd: process.cwd(),
  stdio: 'inherit',
  encoding: 'utf8'
});

init.on( 'close', function (code, signal) {
  //  console.log('closed grunt-init');
  
  // Should install all modules and then run "grunt install"
  var npm = spawn( 'npm', [  'install' ], {
    end: process.env,
    cwd: process.cwd(),
    stdio: 'inherit',
    encoding: 'utf8'
  });

  npm.on( 'close', function() {
    console.log( 'modules installed.' );
  } );
  
});



// @todo All add GitHub repository initialization and Wiki subdmoule.