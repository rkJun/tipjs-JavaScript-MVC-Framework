/*
 * tipJS - Javascript MVC Framework ver.1.000
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */
// define commonViews
tipJS.commonView({
	// required name property
	name:"CommonView",
	target:{
		header:"header",
		footer:"footer"
	},
	drawHeader:function(html){
		document.getElementById(this.target.header).innerHTML=html;
	},
	drawFooter:function(html){
		document.getElementById(this.target.footer).innerHTML=html;
	}
});
