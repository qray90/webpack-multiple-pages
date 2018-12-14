const express = require('express')
const path = require('path')
const webpack = require('webpack')

const app = express()

const config = require('./webpack.config')

const compiler = webpack(config)

const webpackDevMiddleware = require('webpack-dev-middleware')

app.use(express.static('src/assets'))

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
}))

app.get('/:page?', function(req, res, next) {
  let page = req.params.page

  if (page === 'favicon.ico') {
    return
  }

  let filePath = path.join(compiler.outputPath, `${page}.html`)

  

  compiler.outputFileSystem.readFile(filePath, function (err, result) {
    if (err) {
        return next(err)
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  })
})


app.listen(9527)