/*
 * tipJS - OpenSource Javascript MVC Framework ver.1.19
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.define({
	name:"FileAPI",
	controllers:[
		"init.js",
		"load.js"
	],
	models:[
		"readerEventMgr.js",
		"globalModel.js"
	],
	views:[
		"imageInfo.js"
	],
	onLoad:function(){
		tipJS.debug(this.name + ".onLoad Done");
	}
});

