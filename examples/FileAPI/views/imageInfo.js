tipJS.view({
	__name:"FileAPI.imageInfo",
	imageInfoLog:function(imageFile){
		var _templateConfig = {
			url:"./templates/imageInfo.tpl",
			renderTo:"imageInfo",
			data:imageFile
		};
		this.renderTemplate(_templateConfig);
	}
});