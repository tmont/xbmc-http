var schema = require('./v6-pretty.json').result,
	fs = require('fs'),
	path = require('path'),
	target = path.join(path.dirname(__dirname), 'index.js'),
	template = fs.readFileSync('./index.tmpl.js', { encoding: 'utf8' });

var code = '//code below was automatically generated from ' + __filename + '\n' +
	'\t//DO NOT MODIFY!\n';

var namespaces = {},
	codeMethods = [];

Object.keys(schema.methods).forEach(function(fullMethod) {
	var methodData = fullMethod.split('.'),
		ns = methodData[0],
		methodName = methodData[1],
		data = schema.methods[fullMethod];



	if (!namespaces[ns]) {
		namespaces[ns] = [];
	}

	data.name = methodName;
	namespaces[ns].push(data);
});

Object.keys(namespaces).forEach(function(ns) {
	var friendlyNs = /^[A-Z]+$/.test(ns) ? ns.toLowerCase() : ns.charAt(0).toLowerCase() + ns.substring(1);
	var codeMethod = '\tget ' + friendlyNs + '() {\n' +
		'\t\tvar api = this,\n' +
		'\t\t\tns = \'' + ns + '\';\n' +
		'\t\treturn {\n' +
		namespaces[ns].map(function(method) {
			var methodArgs = method.params.concat([ { name: 'callback' } ]);
			var friendlyMethod = /^[A-Z]$/.test(method.name)
				? method.name.toLowerCase()
				: method.name.charAt(0).toLowerCase() + method.name.substring(1);
			var code = '';

			code += '\t\t\t/**\n\t\t\t * ' + method.description + '\n';

			if (method.params.length) {
				code += '\t\t\t' + method.params.map(function(param) {
					var desc = ' * @param ', types = {};
	//				if (Array.isArray(param.type)) {
	//					param.type.forEach(function(type) {
	//						types[type.type] = 1;
	//					});
	//				} else if (param.$ref) {
	//					types[param.$ref] = 1;
	//				} else {
	//					types[param.type] = 1;
	//				}
	//
	//				desc += Object.keys(types).join('|') + '}';
	//
	//
					if (!param.required) {
						desc += '[' + param.name + ']';
					} else {
						desc += param.name;
					}

					if (param.description) {
						desc += ' ' + param.description;
					}

					return desc;
				}).join('\n\t\t\t') + '\n';
			}

			code += '\t\t\t * @param {Function} [callback]\n';
			code += '\t\t\t */\n';

			code += '\t\t\t' + friendlyMethod + ': ' +
				'function(' + methodArgs.map(function(param) { return param.name; }).join(', ') + ') {\n';
			code += '\t\t\t\tapi.rpcWithArgs(ns, \'' + method.name + '\', arguments);\n';
			code += '\t\t\t}';

			return code;
		}).join(',\n\n') +
		'\n\t\t};\n\t}';

	codeMethods.push(codeMethod);
});

code += codeMethods.join(',\n\n') + '\n\t//end automatically generated code';

template = template.replace('//gen', code);
fs.writeFileSync(target, template, { encoding: 'utf8' });
process.exit(0);
