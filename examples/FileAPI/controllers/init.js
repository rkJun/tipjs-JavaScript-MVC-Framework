tipJS.controller({
	name : "FileAPI.init",
	invoke:function(){
		tipJS.debug(this.name + " Start");
		
		if (!window.File) {
			alert("do not support the File API");
			return;
		}
		// Global 변수 초기화
		this.loadModel("globalModelVO", true).init();
		
		// Load 버튼 객체에 이벤트 정의
		this.setEventLoadButton();
		tipJS.debug(this.name + " Done");
	},
	setEventLoadButton:function(){
		document.getElementById("btLoad").addEventListener("click", function(){
			// load button click
			tipJS.action("FileAPI.load");
		},true);
	}
});
