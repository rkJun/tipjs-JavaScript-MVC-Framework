/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.define({
	noCache:false,
	noCacheAuto:true,
	name:"todoMVC",
	extLib:[
		"extLib/handlebars.min.js"
	],
	controllers:[
		"init.js",
		"create.js",
		"toggleAll.js",
		"destroyCompleted.js",
		"toggle.js",
		"edit.js",
		"blurOnEnter.js",
		"update.js",
		"destroy.js"
	],
	models:[
		"bindAction.js",
		"globalTodos.js",
		"renderer.js",
		"utils.js"
	]
});

