tipJS.model({
	__name : "ModelVO.modelVO",
	proper : "modelVO property",
	methodB : function(){
		tipJS.debug("modelB.methodB()");
		tipJS.debug(this.proper);
		
		return this.loadModel("modelA").methodA();
	}
});
