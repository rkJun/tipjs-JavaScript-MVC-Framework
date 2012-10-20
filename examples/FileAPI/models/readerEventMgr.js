/*
 * tipJS - Javascript MVC Framework ver.1.19
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model({
	__name:"FileAPI.readerEventMgr",
	setEvent : function(){
		var imageReader = this.loadModel("globalModelVO", true).imageReader;
		imageReader.onload = this.onload;
		imageReader.onprogress = this.onprogress;
	},
	onload : function(e){
		tipJS.debug("reader onload");
		var totalData = e.total;
		var globalModel = tipJS.loadModel("FileAPI.globalModelVO", true);
		globalModel.loadingBar.innerHTML = "100% ("+totalData+"/"+totalData+" Bytes)";
		globalModel.loadingBar.value = 100;
		globalModel.layerFileInfo.innerHTML += "읽기 완료<br>";
		
		// 썸네일 작성
		var imgTag = document.createElement("img");
		imgTag.src = e.target.result;
		imgTag.width = 100;
		imgTag.height = 100;
		imgTag.onclick = function(){
			document.getElementById("imageView").src = this.src;
		}
		imgTag.onload = function(){
			document.getElementById("imageList").appendChild(imgTag);
		}
	},
	onprogress : function(e){
		var loadData = e.loaded;
		var totalData = e.total;
		var per = (loadData/totalData) * 100;
		//per = per.toFixed(1);
		tipJS.loadModel("FileAPI.globalModelVO", true).loadingBar.innerHTML = per+"% ("+loadData+"/"+totalData+" Bytes)";
		tipJS.loadModel("FileAPI.globalModelVO", true).loadingBar.value = per;
	}
});
