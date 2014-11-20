'use strict';
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    jshint: {
      options: {
        node: true
      },
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js', 'lib/**/*.js']
    },

    simplemocha: {
     // src: ['test/api/**/*.js']
     src:['test/api/dbFillTest.js']
    }
  });

  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('default', ['test']);
};
