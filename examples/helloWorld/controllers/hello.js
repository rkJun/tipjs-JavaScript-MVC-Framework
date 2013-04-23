tipJS.controller({
	name : "helloWorld.hello",
	invoke:function(params){
		document.getElementById("contents").innerHTML = "<h1>Hello World from " + params + "</h1>";
	}
});
