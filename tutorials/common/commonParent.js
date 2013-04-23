tipJS.commonModel({
	__name : "commonParent",
	__extend:"commonParent2",
	common : "commonParent property",
	commonFn : function(){
		tipJS.debug("commonParent.commonFn()");
		tipJS.debug(this.common);
		
		document.getElementById("contents").innerHTML += "<h1>" + this.common + "</h1>";
	}
});
