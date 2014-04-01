var path = require('path')
	, fs = require('fs')
	, less = require('less');

var makeLess = function(root){

	return function(req, res, next){
		var filePath = path.join(root, req.url)
			, extname = path.extname(filePath);

		if (extname!='.css'){
			next(); return;
		}

		fs.readFile(filePath,{encoding: "utf8"},function(err, data){
			if (err){ //css doesn't exist
				var lessFilePath = path.join(path.dirname(filePath), path.basename(filePath, extname)) + '.less';

				fs.readFile(lessFilePath, {encoding:'utf8'}, function(err, data){
					if (err){ //less doesn't exist
						next();return;
					}

					less.render(data, function(e, css){
						if (e){
							next();return;
						}

						res.end(css);

					});
				});
				return;
			}

			res.end(data);

		}); 
	}
};

module.exports = makeLess;
