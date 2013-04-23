tipJS.model({
	__name : "ModelExtend.modelChild2VO",
	__extend:[
		"ModelExtend.modelParent",
		"commonParent3"
	],
	child : "child property",
	childFn : function(){
		tipJS.debug("modelChild.childFn()");
		tipJS.debug(this.child);
		
		document.getElementById("contents").innerHTML += "<h3>" + this.child + "</h3>";
	}
});
