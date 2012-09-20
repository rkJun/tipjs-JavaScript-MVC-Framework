/*
 * tipJS - OpenSource Javascript MVC Framework ver.1.19
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.define({
	name:"withExtJS",
	noCache:false,
	noCacheAuto:false,
	noCacheVersion:"1.100",
	extLib:[
		
	],
	controllers:[
		"initController.js"
	],
	models:[
		"initModel.js"
	],
	views:[
		"initView.js"
	],
	/*no return*/
	onLoad:function(params){
		tipJS.debug("tipJS.onLoad Done");
		// defined controller name;
		//tipJS.action("withExtJS.initController");
	},
	/*no return*/
	beforeController:function(params){
		tipJS.debug("tipJS.beforeController Done");
	},
	afterController:function(params){
		tipJS.debug("tipJS.afterController Done");
	}
});

