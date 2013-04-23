tipJS.commonModel({
	__name : "commonParent3",
	common3 : "commonParent3 property",
	commonFn3 : function(){
		tipJS.debug("commonParent3.commonFn3()");
		tipJS.debug(this.common3);
		
		document.getElementById("contents").innerHTML += "<h1>" + this.common3 + "</h1>";
	}
});
