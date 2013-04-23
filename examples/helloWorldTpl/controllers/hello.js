tipJS.controller({
	name : "helloWorldTpl.hello",
	invoke:function(params){
		var _templateConfig = {
			url:"./templates/helloWorld.tpl",
			renderTo:"contents",
			data:{
				helloworld:"Hello World from " + params
			}
		};
		this.renderTemplate(_templateConfig);
	}
});
