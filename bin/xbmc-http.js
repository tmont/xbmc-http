#!/usr/bin/env node

var program = require('commander'),
	pkginfo = require('../package.json'),
	fs = require('fs'),
	XbmcHttpApi = require('../');

program
	.version(pkginfo.version)
	.usage('[options] <namespace> <method> [<param1> <param2>...]')
	.option('-u, --url <url>', 'URL to XBMC JSON RPC API')
	.option('--raw', 'Spit out the raw response with no formatting')
	.parse(process.argv);

var args = program.args || [],
	ns = args[0],
	method = args[1],
	params = args.slice(2),
	raw = program.raw,
	url = program.url;

if (!url) {
	if (!fs.existsSync('~/.xbmc-http.config')) {
		console.error('--url option is required, unless ~/.xbmc-http.config exists');
		process.exit(1);
	}

	try {
		var config = JSON.parse(fs.readFileSync('~/.xbmc-http.config', 'utf8'));
		url = config.url;
		if (!url) {
			console.error('No URL found in config file');
			process.exit(1);
		}
	} catch (e) {
		console.error('Failed to read ~/.xbmc-http.config as JSON');
		process.exit(1);
	}
}

if (!ns) {
	console.error('No namespace specified');
	process.exit(1);
}
if (!method) {
	console.error('No method specified');
	process.exit(1);
}

var api = new XbmcHttpApi(url);
if (api[ns] && api[ns][method]) {
	params.push(function(err, res) {
		console.log(require('util').inspect(res, false, null, true));
		if (err) {
			console.error(err);
			process.exit(1);
		}

		if (!res.result) {
			process.exit(0);
		}

		if (raw) {
			console.log(res);
			process.exit(0);
		}

		var Table = require('cli-table');

		if (res.result.items) {
			var table = new Table({
				head: Object.keys(res.result.items[0])
			});

			table.push.apply(table, res.result.items.map(function(item) {
				return Object.keys(item).map(function(key) {
					var value = item[key];
					if (Array.isArray(value)) {
						return value.join(', ');
					}
					return value;
				});
			}));

			console.log(table.toString());
		} else {
			console.log(res.result);
		}

		process.exit(0);
	});

	console.log('calling ' + ns + '.' + method);
	api[ns][method].apply(api, params);
} else {
	console.error('namespace or method does not exist');
	process.exit(1);
}