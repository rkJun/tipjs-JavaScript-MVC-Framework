tipJS.commonModel({
	__name : "commonParent2",
	common2 : "commonParent2 property",
	commonFn2 : function(){
		tipJS.debug("commonParent2.commonFn2()");
		tipJS.debug(this.common2);
		
		document.getElementById("contents").innerHTML += "<h1>" + this.common2 + "</h1>";
	}
});
