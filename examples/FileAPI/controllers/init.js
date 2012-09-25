/*
 * tipJS - Javascript MVC Framework ver.1.19
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "FileAPI.init",
	invoke:function(){
		tipJS.debug(this.name + " Start");
		
		if (!window.File) {
			alert("do not support the File API");
			return;
		}
		// Global 변수 초기화
		this.loadModel("globalModel", true).init();
		
		// Load 버튼 객체에 이벤트 정의
		this.setEventLoadButton();
		tipJS.debug(this.name + " Done");
	},
	setEventLoadButton:function(){
		document.getElementById("btLoad").addEventListener("click", function(){
			// load button click
			tipJS.action("FileAPI.load");
		},true);
	}
});
