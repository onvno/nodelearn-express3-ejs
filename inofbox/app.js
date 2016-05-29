// 引入依赖
var express = require('express');
var routes = require('./routes'); // 自定义路由
var http = require('http');
var path = require('path');
var app = express();
var partials = require('express-partials');

// 设定
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件
app.use(partials());
app.use(express.favicon());
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev')); //express4 已改为 morgan,记录信息？
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('111')); // 设置cookie解析加密
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// 开发
if('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 跳转执行
app.get('/', routes.index);
app.get('/u/:user', routes.user);
app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/loginout', routes.logout);

// 绑定端口
http.createServer(app).listen(app.get('port'), function(req, res) {
  console.log('Express server listening on port' + app.get('port'));
});



























