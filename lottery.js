var express = require('express');
var proxyMiddleware = require('http-proxy-middleware')
const hostname = '127.0.0.1';
const port = 6633;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

// proxy api requests
var proxyTable = {
  '/game':{
    changeOrigin: true,
    target:'https://www.ffcp-wap.com/'
  },
  '/index':{
    changeOrigin: true,
    target:'https://www.ffcp-wap.com/'
  },
  '/portal':{
    changeOrigin: true,
    target:'http://119.28.54.66:9031/'
  },
  '/wap':{
    changeOrigin: true,
    target:'https://www.ffcp-wap.com/'
  },
}
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})


app.use(router);

app.use(express.static('./lottery'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
