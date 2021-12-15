# microService-Homework-back

# 微服务作业平台模块后端实现


实现的接口：

```javascript
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

```
 


运行方式：   
服务器安装pm2 根目录运行 **pm2 start index.js** 即可
