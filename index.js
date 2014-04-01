var connect = require('connect')
	, makeJade = require('./lib/processor/jade.js')
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

	app.use(serveStatic(dirname));

	app.use(makeJade(dirname));

	return app;
}