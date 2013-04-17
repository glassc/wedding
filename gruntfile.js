module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            files: ['gruntfile.js', 'app.js','images/**/*.js', 'lib/*.js', 'pages/*.js', 'users/*.js', 'tests/**/*.js']
        }
       
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('default', 'jshint');
};