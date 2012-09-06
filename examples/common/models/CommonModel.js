/*
 * tipJS - Javascript MVC Framework ver.1.000
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */
// define commonViews
tipJS.commonModel({
	// required name property
	name:"CommonModel",
	htmlData:{
		header:"<h2>This is a Header HTML</h2>",
		footer:"<h3>This is a Footer HTML</h3>"
	},
	getHeader:function(){
		return this.htmlData.header;
	},
	getFooter:function(){
		return this.htmlData.footer;
	}
});
