'use strict';
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      options: {
        node: true,
        jshintrc: true
      },
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js', 'lib/**/*.js']
    },

    simplemocha: {
     src: ['test/api/**/notes_test.js']
    },

    jscs: {
    src: ['models/**/*.js', 'server.js', 'routes/**/*.js', 'lib/**/*.js'],
    options: {
          config: '.jscsrc'
        }
    }

  });

  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('default', ['test']);
};
