// 默认数据
var postList = [
	{id:1, name:'设计部', msg:'good boy'},
	{id:2, name:'交互部', msg:'good job'},
	{id:3, name:'前端部', msg:'nice work'}
];
var count = postList.length;

var isLogin = false;
var checkLoginStatus = function(req, res) {
	isLogin = false;
	if(req.signedCookies.userid && req.signedCookies.password) {
		isLogin = true;
	}
};

// 首页
exports.index = function(req, res) {
	checkLoginStatus(req, res);
	console.log(isLogin);
	res.render('index', {
		title : '欢迎来到卫东的Infobox',
		loginStatus : isLogin,
		posts : postList
	});
};

// reg注册页
exports.reg = function(req, res) {
	checkLoginStatus(req, res);
	res.render('reg', {
		title : '注册',
		loginStatus : isLogin
	})
}

// 执行注册
exports.doReg = function(req, res) {
	if(req.body['password-repeat'] != req.body['password']) {
		// 注册失败，重新跳转
		console.log('密码输入不一致');
		console.log('第一次输入的密码：' + req.body['password']);
		console.log('第二次输入的密码：' + req.body['password-repeat']);
		return res.redirect('/reg');
	} else {
		// 注册成功，跳转首页
		res.cookie('userid', req.body['username'], {path: '/', signed: true});
		res.cookie('password', req.body['password'], {path:'/', signed: true});
		return res.redirect('/');
	}
}

// login登录
exports.login = function(req, res) {
	checkLoginStatus(req, res);
	res.render('login', {
		title : '登录',
		loginStatus : isLogin
	})
}

// login登录执行-简化，直接重复注册部分
exports.doLogin = function(req, res) {
	if(req.body['password-repeat'] != req.body['password']) {
		// 注册失败，重新跳转
		console.log('密码输入不一致');
		console.log('第一次输入的密码：' + req.body['password']);
		console.log('第二次输入的密码：' + req.body['password-repeat']);
		return res.redirect('/reg');
	} else {
		// 注册成功，跳转首页
		res.cookie('userid', req.body['username'], {path: '/', signed: true});
		res.cookie('password', req.body['password'], {path:'/', signed: true});
		return res.redirect('/');
	}	
}

// login退出登录
exports.logout = function(req, res) {
	res.clearCookie('userid', {path: '/'});
	res.clearCookie('password', {path:'/'});
	return res.redirect('/');
}

// index发布信息
exports.post = function(req, res) {
	var element = {id:count++, name: req.signedCookies.userid, msg:req.body['post']};
	postList.push(element);
	return res.redirect('/');
};


// user用户页面
exports.user = function(req, res) {
	var userName = req.params.user;
	var userPosts = [];

	for(var i=0; i<postList.length; i++) {
		if(postList[i].name == userName){
			userPosts.push(postList[i]);
		}
	}

	checkLoginStatus(req, res);
	res.render('user', {
		title: userName + '的页面',
		loginStatus: isLogin,
		posts : userPosts
	})
};
















