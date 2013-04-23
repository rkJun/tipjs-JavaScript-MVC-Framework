tipJS.commonView({
	__name : "commonViewParent",
	__extend:"commonViewParent2",
	common : "commonViewParent property",
	commonFn : function(){
		tipJS.debug("commonViewParent.commonFn()");
		tipJS.debug(this.common);
		var opt = {
			url:"./views/template.html",
			renderTo:"contents",
			data:["commonViewParent1-1","commonViewParent1-2","commonViewParent1-3"]
		}
		this.renderTemplate(opt);
	}
});
