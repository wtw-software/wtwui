({
  baseUrl: "../../",
  packages: [
    'wtwui'
  ],
  inlineText: true,
  name: 'wtwui',
  out: '../wtwui-min.js',
  wrap: {
    startFile: "start.frag",
    endFile: "end.frag"
  },
  optimize: "none"
})