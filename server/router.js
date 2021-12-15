function route(handle, pathname,params,response) {
    console.log("About to route a request for " + pathname);

    // 检查给定的路径对应的请求处理程序是否存在，如果存在的话直接调用相应的函数
    if (typeof handle[pathname] == "function") {
       return  handle[pathname](params,response);
    } else {
        console.log("No request handler found for " + pathname);
		return '';
    }
}

exports.route = route;