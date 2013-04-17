module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            files: ['gruntfile.js', 'app.js','images/**/*.js', 'lib/*.js', 'pages/*.js', 'users/*.js', 'tests/**/*.js']
        },
        cafemocha: {
             src: 'tests/**/*_test.js',
             options: {
                ui: 'bdd',
             },
  }
       
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-cafe-mocha');
    
    grunt.registerTask('default', 'jshint', 'cafemocha');
};