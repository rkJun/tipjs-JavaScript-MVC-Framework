tipJS.interceptor({
	name : "Interceptor.logger",
	target:"controllers",
	before:[
		function(){
			this.getById("console").innerHTML += "# before log : " + this.name + "</br>";
		}
	],
	after:[
		function(){
			this.getById("console").innerHTML += "# after log : " + this.name + "</br>";
		}
	]
});
