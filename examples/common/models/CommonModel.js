// define commonViews
tipJS.commonModel({
	// required name property
	__name:"CommonModel",
	htmlData:{
		header:"<h2>This is a Header HTML</h2>",
		footer:"<h3>This is a Footer HTML</h3>"
	},
	getHeader:function(){
		return this.htmlData.header;
	},
	getFooter:function(){
		return this.htmlData.footer;
	}
});
