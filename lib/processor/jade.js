var path = require('path')
	, fs = require('fs')
	, jade = require('jade');

var makeJade = function(root){




	return function(req, res, next){
		var filePath = path.join(root, req.url)
			, extname = path.extname(filePath);

		if (extname!='.html'){
			next();return;
		}

		fs.readFile(filePath,{encoding: "utf8"},function(err, data){
			if (err){
				var jadeFilePath = path.join(path.dirname(filePath), path.basename(filePath, extname)) + '.jade';

				jade.renderFile(jadeFilePath, {}, function(err, html){
					if (err){
						next();
						return;
					}

					res.setHeader('Content-Length', Buffer.byteLength(html));
					res.setHeader('Content-Type', 'text/html; charset=UTF-8');
					res.end(html);
				});

				return;
			}

			res.setHeader('Content-Length', Buffer.byteLength(data));
			res.setHeader('Content-Type', 'text/html; charset=UTF-8');
			res.end(data);

		}); 
	}
};

module.exports = makeJade;
