/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/air-chair/" : "/",
  outputDir: 'dist', // 输出文件目录
  lintOnSave: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}
