#!/usr/bin/env node
(function(){
	var parseArgs = require('minimist')
		, createMiniHarp = require('../index.js');

	var argv = parseArgs( process.argv.slice(2) )
		, port = 'port' in argv
			?parseInt(argv.port) 
			:4000;

	if (port || port===0 ){
		createMiniHarp().listen(port);
		console.log('Starting mini-harp on http://localhost:'+port);
	}else{
		console.log('plz enter a valid port');
	}
})();