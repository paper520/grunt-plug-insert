/*
 * grunt-plug-insert
 * https://github.com/yelloxing/grunt-plug-insert
 *
 * Copyright (c) 2019 心叶
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('insert', 'Insert merge code at the specified hook.', function () {

    var options = this.options({});

    var read = function (fileName) {
      if (!grunt.file.exists(fileName)) {
        grunt.log.warn('Source file "' + fileName + '" not found.');
      }
      return grunt.file.read(fileName);
    },
      // 寻找插入点
      code = read(options.target).split(new RegExp(options.separator));

    this.files.forEach(function (file) {

      var src = code[0];

      var i;
      for (i in file.orig.src) {
        src += "\n" + read(file.orig.src[i]) + "\n";
      }

      src += code[1];

      // 写入磁盘
      grunt.file.write(file.dest, src);

      // 提示成功
      grunt.log.writeln('File "' + file.dest + '" created.');

    });
  });

};
