var http = require('http');

function XbmcApi(url) {
	this.url = url.replace(/\/+$/, '');
}

XbmcApi.prototype = {
	rpc: function(ns, method, params, callback) {
		var url = this.url;
		var req = http.request(url, function(res) {
			if (res.statusCode !== 200) {
				callback && callback({ message: 'Unexpected status code', response: res });
				return;
			}

			var rawBody = '';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				rawBody += chunk;
			});
			res.on('end', function() {
				try {
					callback && callback(null, JSON.parse(rawBody));
				} catch (e) {
					callback && callback({ message: 'Unable to parse response body', response: res });
				}
			});
		});

		req.on('error', function(err) {
			callback && callback(err);
		});

		var postBody = {
			jsonrpc: '2.0',
			method: ns + '.' + method,
			id: '1',
			params: params
		};

		req.write(JSON.stringify(postBody));

		req.end();
	},

	rpcWithArgs: function(ns, method, args) {
		args = [].slice.call(args);
		this.rpc(ns, method, args, typeof(args[args.length - 1]) === 'function' ? args.pop() : null);
	},

	//gen
};

module.exports = XbmcApi;