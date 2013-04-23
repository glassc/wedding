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
                ui: 'bdd'
             }
        },
        copy:  {
            deployment_files : {
         
                files : [
                    {expand: true, src: ['admin/**'], dest: 'release/'},
                    {expand: true, src: ['components/**'], dest: 'release/'},
                    {expand: true, src: ['images/**'], dest: 'release/'},
                    {expand: true, src: ['lib/**'], dest: 'release/'},
                    {expand: true, src: ['pages/**'], dest: 'release/'},
                    {expand: true, src: ['users/**'], dest: 'release/'},
                    {expand: true, src: ['app.js'], dest: 'release/'},
                    {expand: true, src: ['package.json'], dest: 'release/'},
                    {expand: true, src: ['config/production.config.js'], dest: 'release/config/', 
                        rename: function(dest, src) {
                            return dest +  'config.js';
                        }
                    
                    }
                ]
            
                
            },
            test_config: {
                files: [
                    {expand: true, src: ['config/config.js.template'], dest: 'config/', 
                        rename: function(dest, src) {
                            return dest +  'config.js';
                        }
                    }
                        
                ]
                    
            }
            
            
            
        },
        clean: {
            release: ["release/"]
        },
        exec: {
          modulus: {
              stdout: false,
              cmd: 'modulus deploy  -p wedding release'
          }  
        }
        
          
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cafe-mocha');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    
    grunt.registerTask('default', ['jshint', 'cafemocha']);
    grunt.registerTask('deploy', ['clean:release', 'copy:deployment_files']);
    grunt.registerTask('travis', ['copy:test_config', 'default']);

};