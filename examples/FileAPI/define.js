tipJS.define({
	name:"FileAPI",
	controllers:[
		"init.js",
		"load.js"
	],
	models:[
		"readerEventMgr.js",
		"globalModelVO.js"
	],
	views:[
		"imageInfo.js"
	],
	onLoad:function(){
		tipJS.debug(this.name + ".onLoad Done");
	}
});

