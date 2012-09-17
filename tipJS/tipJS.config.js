/*
 * tipJS - Javascript MVC Framework ver.1.000
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */
// configuring tipJS
tipJS.config({
	noCache:false,
	noCacheVersion:"1.000",
	noCacheAuto:false,
	noCacheParam:"noCacheVersion",
	charSet:"utf-8",
	developmentHostList:[
		'localhost'
		,'127.0.0.1'
		,'tipjs.com'
	],
	commonLib:[
		"http://tipjs.com/tipJS/jquery-ui-1.8.21/jquery-1.7.2.min.js"
		,"http://tipjs.com/tipJS/extjs-4.1.1/ext-all.js"
	],
	commonModel:[
		"/tipJS/examples/common/models/CommonModel.js"
	],
	commonView:[
		"/tipJS/examples/common/views/CommonView.js"
	],
	applicationPath:{
		geolocation : '/tipJS/examples/geolocation',
		helloWorld : '/tipJS/examples/helloWorld',
		helloWorldTpl : '/tipJS/examples/helloWorldTpl'
		,withExtJS : '/tipJS/examples/withExtJS'
	}
});

