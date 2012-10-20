/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.view({
	__name:"FileAPI.imageInfo",
	imageInfoLog:function(imageFile){
		var _templateConfig = {
			url:"./templates/imageInfo.tpl",
			renderTo:"imageInfo",
			data:imageFile
		};
		this.renderTemplate(_templateConfig);
	}
});