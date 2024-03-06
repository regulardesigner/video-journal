module.exports = {
  css: {
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      }
    }
  },

  publicPath: process.env.NODE_ENV === "production" ? "/video-journal/" : "/",

  lintOnSave: true
};
