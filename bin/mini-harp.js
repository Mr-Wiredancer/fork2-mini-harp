#!/usr/bin/env node
(function(){
	var parseArgs = require('minimist')
		, createMiniHarp = require('../index.js');

	var argv = parseArgs( process.argv.slice(2) )
		, port = 'port' in argv
			?parseInt(argv.port) 
			:4000;

	var root = argv['_'].length>0?argv['_'][0]:process.cwd();

	if (port || port===0 ){
		createMiniHarp(root).listen(port);
		console.log('Starting mini-harp on http://localhost:'+port);
	}else{
		console.log('plz enter a valid port');
	}
})();