tipJS.model({
	__name : "ModelExtend.modelChildVO",
	__extend:"ModelExtend.modelParent",
	child : "child property",
	childFn : function(){
		tipJS.debug("modelChild.childFn()");
		tipJS.debug(this.child);
		
		document.getElementById("contents").innerHTML += "<h3>" + this.child + "</h3>";
	}
});
