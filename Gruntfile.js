module.exports = function(grunt){
  var matchdep = require('matchdep');

  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    broccoli: {
      dev: {
        dest: 'dist'
      },
      prod: {
        dest: 'dist',
        env: 'production'
      }
    },
    concurrent: {
      broccoli: [ 'broccoli:dev:watch', 'watch' ],
      options: {
        logConcurrentOutput: true
      }
    },
    watch: {
      javascripts: {
        files: [ 'dist/**/*.js' ],
        tasks: [ 'qunit' ],
      }
    },
    qunit: {
      all: {
        options: {
          urls: [ 'http://localhost:8000/tests/index.html' ]
        }
      }
    },
    connect: {
      dev: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    clean: {
      all: [ 'dist/**/*.js' ]
    }
  });

  grunt.registerTask('server', ['broccoli:dev:build', 'connect:dev', 'concurrent:broccoli']);
  grunt.registerTask('default', ['broccoli:prod:build', 'connect:dev', 'qunit:all']);
};