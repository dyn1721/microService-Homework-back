var http = require("http"),
	url = require("url");

// console.log(url);

// 调用 http模块 提供的 createServer函数: 
// 返回一个对象,这个对象有一个 listen 方法,这个方法带一个数值参数,
// 指定这个 http 服务器监听的端口号.

function start(route, handle) {

	function onRequest(request, response) {
		// 获取请求路径
		var pathname = url.parse(request.url).pathname;
		var params = url.parse(request.url, true).query;
		// 关闭nodejs 默认访问 favicon.ico
		if (!pathname.indexOf('/favicon.ico')) {
			return;
		};

		// 收到来自 pathname 的请求
		console.log("Request for " + pathname + " received.");

		// 路由器处理
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
		response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
		route(handle, pathname, params,response);
		
	}
		console.log("Server has start!");
		http.createServer(onRequest).listen(3000);
		
			
		// catch(e){
		// 	console.log("Server stopped by uncaught error , trying to restart...");
		// }
	
}

// 开放接口
exports.start = start;
