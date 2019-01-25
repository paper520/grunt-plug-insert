/*
 * grunt-plug-insert
 * https://github.com/yelloxing/grunt-plug-insert
 *
 * Copyright (c) 2019 心叶
 * Licensed under the MIT license.
 */

'use strict';

const fs = require("fs");

module.exports = function (grunt) {

  grunt.registerMultiTask('insert', 'Insert merge code at the specified hook.', function () {

    var options = this.options({
      banner: "",
      link: "\n"
    });

    var read = function (fileName) {
      if (!grunt.file.exists(fileName)) {
        grunt.log.warn('Source file "' + fileName + '" not found.');
      }
      return grunt.file.read(fileName);
    },
      // 寻找插入点
      code = read(options.target).split(new RegExp(options.separator)),
      // 抬头
      banner = grunt.template.process(options.banner);

    this.files.forEach(function (file) {

      // 写入磁盘
      grunt.file.write(file.dest, banner + options.link);

      fs.appendFileSync(file.dest, code[0]);

      for (let i in file.orig.src) {
        let src_code = options.link + read(file.orig.src[i]) + options.link;
        fs.appendFileSync(file.dest, src_code);
      }

      fs.appendFileSync(file.dest, code[1]);

      // 提示成功
      grunt.log.writeln('File "' + file.dest + '" created.');

    });
  });

};
