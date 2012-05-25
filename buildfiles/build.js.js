({
  baseUrl: "../",
  packages: [
    'lib',
    'lib/Dialog',
    'lib/Confirmation',
    'lib/Overlay',
    'lib/Tip'
  ],
  inlineText: true,
  name: 'main',
  out: '../wtwui-min.js',
  wrap: {
    startFile: "start.frag",
    endFile: "end.frag"
  },
  optimize: "uglify"
})