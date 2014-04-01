var connect = require('connect')
	, makeJade = require('./lib/processor/jade.js')
	, makeLess = require('./lib/processor/less.js')
	, path = require('path')
	, serveStatic = require('serve-static');

module.exports = function(dirname){
	var app = connect();

	app.use(function(req, res, next){
		if (req.url === '/current-time'){
			res.end((new Date()).toISOString());
		}else{
			next();
		}
	});

	app.use(function(req, res, next){
		if (req.url === '/'){
			req.url = '/index.html';
		}
		next();

	});

	app.use(function(req, res, next){
		var extname = path.extname(req.url);
		if (extname === '.less' || extname === '.jade'){
			console.log('here');
			res.statusCode = 404;
			res.end();
		}else{
			next();
		}

	});

	app.use(serveStatic(dirname));
	app.use(makeJade(dirname));
	app.use(makeLess(dirname));


	return app;
}