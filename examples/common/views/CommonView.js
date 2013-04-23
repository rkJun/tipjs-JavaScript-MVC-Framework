// define commonViews
tipJS.commonView({
	// required name property
	__name:"CommonView",
	target:{
		header:"header",
		footer:"footer"
	},
	drawHeader:function(html){
		document.getElementById(this.target.header).innerHTML=html;
	},
	drawFooter:function(html){
		document.getElementById(this.target.footer).innerHTML=html;
	}
});
