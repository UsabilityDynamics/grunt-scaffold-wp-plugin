module.exports = {  
  'scaffold-wp-plugin': { 
    'has valid project.yml file.': require( 'grunt-scaffold-module' ).testProjectValidity,
    'has valid project structure.': require( 'grunt-scaffold-module' ).testStructure,
    'has valid public methods.': require( 'grunt-scaffold-module' ).testMethods,
    'has valid public classess.': require( 'grunt-scaffold-module' ).testClasses,
    
    'Unit Tests': {
      
      'phpUnit': require( 'grunt-scaffold-module' ).phpUnit({
        
      }),

      'nodeUnit': require( 'grunt-scaffold-module' ).nodeUnit({
        
      }),

      'anotherTest': function() {
        console.log({'asdf': "asdf"});
      }
      
    }
  }
  
}