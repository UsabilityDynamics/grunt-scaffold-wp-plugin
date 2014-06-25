module.exports = {  
  'Project': { 
    
    'has project-yml file.': require( 'grunt-scaffold-module' ).testProjectValidity({
      debug: false
    }),
    
    'has requied properties.': require( 'grunt-scaffold-module' ).testStructure({
      debug: false      
    })
    
  },

  'API': {

    'has expected methods': require( 'grunt-scaffold-module' ).testMethods({
      debug: false
    }),

    'has valid public classess.': require( 'grunt-scaffold-module' ).testClasses({
      debug: false
    })

  },

  'Coverage': {    
    
    'PHP Unit Tests': require( 'grunt-scaffold-module' ).phpUnit({
      dir: 'lib/*.php',
      severity: '',
      standard: 'Zend',
      warningSeverity: '',
      ignore: 'php'
    }),
    
    'PHP Mass Detector': require( 'grunt-scaffold-module' ).phpmd({
      dir: 'lib/*.php',
      rulesets: 'codesize'
    }),
    
    'JS Hint': require( 'grunt-scaffold-module' ).jsHint({
      
    }),

    'nodeUnit': require( 'grunt-scaffold-module' ).nodeUnit({
      debug: false
    }),

    'custom test': function customTest() {  
      //console.log({'asdf': "asdf"});      
      //console.log( this._runnable );      
    }
    
  }
}

