# grunt-plug-insert

> Insert merge code at the specified hook.

```shell
npm install grunt-plug-insert --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-plug-insert');
```

### Gruntfile.js

```js
grunt.initConfig({
  insert: {
    options: {
      banner: "",
      link: "\n",
      // Place of segmentation
      separator: '@CODE inserts compiled test here',
      // Insert the target file
      target: 'test/fixtures/test'
    },
    files: {
      // Target and fragmentation files
      'tmp/test': ['test/fixtures/insert1', 'test/fixtures/insert2']
    },
  },
});
```