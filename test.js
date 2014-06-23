module.exports = {  
  'Valid project': { 
    
    'has valid project-yml file.': require( 'grunt-scaffold-module' ).testProjectValidity({
      debug: false
    }),
    
    'has valid project-yml structure.': require( 'grunt-scaffold-module' ).testStructure({
      debug: false      
    })
    
  },

  'Valid API': {

    'has expected methods': require( 'grunt-scaffold-module' ).testMethods({
      debug: false
    }),

    'has valid public classess.': require( 'grunt-scaffold-module' ).testClasses({
      debug: false
    })

  },

  'Unit tests': {    

    'phpUnit': require( 'grunt-scaffold-module' ).phpUnit({
      debug: false
    }),

    'nodeUnit': require( 'grunt-scaffold-module' ).nodeUnit({
      debug: false
    }),

    'custom test': function customTest() {  
      console.log({'asdf': "asdf"});
    }
    
  }
}

