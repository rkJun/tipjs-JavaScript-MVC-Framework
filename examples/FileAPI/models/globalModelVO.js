tipJS.model({
	__name:"FileAPI.globalModelVO",
	imageReader:null,
	layerFileInfo:null,
	loadingBar:null,
	init:function(){
		this.imageReader = new FileReader();
		this.layerFileInfo = document.getElementById("imageInfo");
		this.loadingBar = document.getElementById("loadingBar");
	}
});
