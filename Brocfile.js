var broccoli      = require('broccoli');
var es6           = require('broccoli-es6-module-transpiler');
var concat        = require('broccoli-concat');
var uglify        = require('broccoli-uglify-js');
var es3SafeRecast = require('broccoli-es3-safe-recast');
var env           = require('broccoli-env').getEnv();
var pickFiles     = require('broccoli-static-compiler');
var merge         = require('broccoli-merge-trees');
var moveFile      = require('broccoli-file-mover');
var removeFile    = require('broccoli-file-remover');
var wrap          = require('broccoli-wrap');

var libTree = removeFile('packages', {
  srcFile: '/ember-inflector/lib/main.js'
});

libTree = pickFiles(libTree, {
  srcDir: '/ember-inflector/lib',
  files: [ '**/*.js' ],
  destDir: '/ember-inflector'
});


var movedTree = moveFile('packages', {
  srcFile: 'ember-inflector/lib/main.js',
  destFile: '/ember-inflector.js'
});

libTree = merge([movedTree, libTree]);

var loaderJS = pickFiles('bower_components/loader.js', {
  srcDir: '/',
  destDir: '/',
  files: [ 'loader.js' ]
});

var es6Tree = merge([loaderJS, es6(libTree, {moduleName: true})]);

var namedAMD = concat(es6Tree, {
  inputFiles: [ 'ember-inflector.js', '**/*.js' ],
  outputFile: '/ember-inflector.named-amd.js'
});

var globalsBuild = concat(es6Tree, {
  inputFiles: [ 'loader.js', 'ember-inflector.js', '**/*.js' ],
  outputFile: '/ember-inflector.js'
});

globalsBuild = wrap(globalsBuild, {
  wrapper: [ "(function(){\n", "\n})();"]
});

var testTree = concat('packages', {
  inputFiles: [ 'ember-inflector/tests/**/*.js' ],
  outputFile: '/tests.js',
  wrapInEval: true,
  wrapInFunction: true
});

var trees = merge([ globalsBuild, namedAMD, testTree ]);

if (env === 'production') {
  var minifiedAMD = moveFile(uglify(es3SafeRecast(namedAMD)), {
    srcFile: '/ember-inflector.named-amd.js',
    destFile: '/ember-inflector.named-amd.min.js'
  });
  var minifiedGlobalsBuild = moveFile(uglify(es3SafeRecast(globalsBuild)), {
    srcFile: '/ember-inflector.js',
    destFile: '/ember-inflector.min.js'
  });
  var cjs = removeFile(libTree, {
    srcFile: 'loader.js'
  });
  trees = merge([ trees, minifiedAMD, minifiedGlobalsBuild ]);
}

module.exports = trees;