({
  baseUrl: "../../",
  packages: [
    'wtwui',
    'wtwui/lib/Dialog',
    'wtwui/lib/Confirmation',
    'wtwui/lib/Overlay',
    'wtwui/lib/Tip'
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