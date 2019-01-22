'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    // 在生成新文件之前
    // 删除之前产生的旧文件
    clean: {
      tests: ['tmp']
    },

    // 配置启动（然后开始测试）
    insert: {
      target: {
        options: {
          separator: '@CODE inserts compiled test here',
          target: 'test/fixtures/test'
        },
        files: {
          'tmp/test': ['test/fixtures/insert1', 'test/fixtures/insert2']
        }
      }
    },

    // 单元测试
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // 加载自定义的插件
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // 启动测试任务时
  // 首先清空tmp文件夹
  // 接着运行这个插件
  // 然后测试结果是否正确
  grunt.registerTask('test', ['clean', 'insert', 'nodeunit']);


};
