var path = require('path')
	, fs = require('fs')
	, jade = require('jade');

var makeJade = function(root){




	return function(req, res, next){
		var filePath = path.join(root, req.url)
			, extname = path.extname(filePath);

		fs.readFile(filePath,{encoding: "utf8"},function(err, data){
			if (err){
				var jadeFilePath = path.join(path.dirname(filePath), path.basename(filePath, extname)) + '.jade';

				jade.renderFile(jadeFilePath, {}, function(err, html){
					if (err){
						next();
						return;
					}

					res.end(html);
				});

				return;
			}

			res.end(data);

		}); 
	}
};

module.exports = makeJade;
