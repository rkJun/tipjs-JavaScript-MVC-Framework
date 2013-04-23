tipJS.model({
	name:"FileAPI.globalModel",
	imageReader:null,
	layerFileInfo:null,
	loadingBar:null,
	init:function(){
		this.imageReader = new FileReader();
		this.layerFileInfo = document.getElementById("imageInfo");
		this.loadingBar = document.getElementById("loadingBar");
	}
});
