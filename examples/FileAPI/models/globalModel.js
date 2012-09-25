/*
 * tipJS - Javascript MVC Framework ver.1.19
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model({
	name:"FileAPI.globalModel",
	imageReader:null,
	layerFileInfo:null,
	loadingBar:null,
	init:function(){
		this.imageReader = new FileReader();
		this.layerFileInfo = document.getElementById("imageInfo");
		this.loadingBar = document.getElementById("loadingBar");
	}
});
