var server = require("./server/server"),
    router = require("./server/router"),
    requestHandlers = require("./server/requestHandlers");


var handle = {};

// 登录注册
handle["/login"] = requestHandlers.login;
handle["/register"] = requestHandlers.register;
handle["/loginKey"] = requestHandlers.loginKey;
handle["/checkLoginKey"] = requestHandlers.checkLoginKey;

// 权限判断
handle["/level"] = requestHandlers.level;

// 课程相关
handle["/courses"] = requestHandlers.courses;
handle["/createCourse"] = requestHandlers.createCourse;
handle["/courseInfo"] = requestHandlers.courseInfo;
handle["/modifyCourseInfo"] = requestHandlers.modifyCourseInfo;
handle["/modifyCourseNotice"] = requestHandlers.modifyCourseNotice;
handle["/deleteCourse"] = requestHandlers.deleteCourse;
handle["/deleteStudent"] = requestHandlers.deleteStudent;

// 作业相关
handle["/modifyTaskInfo"] = requestHandlers.modifyTaskInfo;
handle["/createTask"] = requestHandlers.createTask;
handle["/deleteTask"] = requestHandlers.deleteTask;
handle["/taskSubmit"] = requestHandlers.taskSubmit;
handle["/getSbsubmit"] = requestHandlers.getSbsubmit;
handle["/submitTask"] = requestHandlers.submitTask;



handle["/search"] = requestHandlers.search;
handle["/search/geneID"] = requestHandlers.searchGeneID;
handle["/search/complex"] = requestHandlers.searchGeneComplex;

handle["/search/errorTest"] = requestHandlers.errorTest;

server.start(router.route, handle);