var broccoli      = require('broccoli');
var es6           = require('broccoli-es6-module-transpiler');
var EmberResolver = require('es6-module-transpiler-package-resolver');
var concat        = require('broccoli-concat');
var uglify        = require('broccoli-uglify-js');
var es3SafeRecast = require('broccoli-es3-safe-recast');
var env           = require('broccoli-env').getEnv();
var pickFiles     = require('broccoli-static-compiler');
var merge         = require('broccoli-merge-trees');
var moveFile      = require('broccoli-file-mover');
var removeFile    = require('broccoli-file-remover');
var wrap          = require('broccoli-wrap');
var jshint        = require('broccoli-jshint');
var path          = require('path');


var libTree = pickFiles('packages/ember-inflector', {
  files: ['lib/**/*.js'],
  srcDir: '/',
  destDir: '/ember-inflector'
});

var globalsBuild = es6(libTree,{
  format: 'bundle',
  output: '/ember-inflector.js',
  formatters: [EmberResolver]
});

var testTree = concat('packages', {
  inputFiles: [ 'ember-inflector/tests/**/*.js' ],
  outputFile: '/tests.js',
  wrapInEval: true,
  wrapInFunction: true
});

var testRunner = pickFiles('tests', {
  srcDir: '/',
  inputFiles: [ '**/*' ],
  destDir: '/'
});

var bowerComponents = pickFiles('bower_components', {
  srcDir: '/',
  inputFiles: [ '**/*' ],
  destDir: '/bower_components'
});

var jsHintOptions = {
  jshintrcPath: path.join(__dirname, '.jshintrc')
};

var jshinted = concat(jshint(libTree, jsHintOptions), {
  inputFiles: [ '**/*.jshint.js' ],
  outputFile: '/ember-inflector.jshint.js'
});

testTree = merge([ jshinted, testTree, testRunner, bowerComponents ]);

var trees;

if (env === 'production') {
  globalsBuild = es3SafeRecast(globalsBuild);
  testTree = es3SafeRecast(testTree);
  var minifiedGlobalsBuild = moveFile(uglify(globalsBuild), {
    srcFile: '/ember-inflector.js',
    destFile: '/ember-inflector.min.js'
  });
  trees = merge([ trees, minifiedGlobalsBuild, testTree ]);
} else {
  trees = merge([ globalsBuild, testTree ]);
}

module.exports = trees;
