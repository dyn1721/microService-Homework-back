var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var url = "mongodb://1.15.154.241:27017/2021SEAssignment";
var DB="2021SEAssignment";
var result = [];

function search(params, response) {
	console.log("Request handler 'search' was called.");
	response.writeHead(200, {
		"Content-type": "text/plain"
	});
	response.write("receive it");
	response.end();
}

function login(params, response) {
	console.log("Request handler 'login' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		console.log(params)
		dbase.collection("user").find({
			"username": params.username,
			"password": params.password
		}).toArray(function(err, result) { 
			if (err) throw err;
			console.log(result);
			var res=0;
			if (result.length>0){
				res=1;
			}
			response.writeHead(200, {
				"Content-type": "text/plain"
			});
			response.write(JSON.stringify(res));
			response.end();
		});
	
	});
}

function loginKey(params, response) {
	console.log("Request handler 'loginKey' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		var where={"username": params.username};
		var update={$set:{"loadautokey":params.loginkey}};
		dbase.collection("user").updateOne(where,update,function(err, res) {
        if (err) throw err;
        console.log("loginKey updated success");
        db.close();
		response.writeHead(200, {
			"Content-type": "text/plain"
		});
		response.write(JSON.stringify(res));
		response.end();
        })
	});
}

function checkLoginKey(params, response) {
	console.log("Request handler 'checkLoginKey' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		console.log(params)
		dbase.collection("user").find({
			"username": params.username,
			"loadautokey": params.loginkey
		}).toArray(function(err, result) { 
			if (err) throw err;
			console.log(result);
			var res=0;
			if (result.length>0){
				res=1;
			}
			response.writeHead(200, {
				"Content-type": "text/plain"
			});
			response.write(JSON.stringify(res));
			response.end();
		});
	
	});
}

function register(params, response) {
	console.log("Request handler 'register' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		dbase.collection("user").find({
			"username": params.username
		}).toArray(function(err, result) { 
			if (result.length>0){
				var res=0; // rename
				response.writeHead(200, {
					"Content-type": "text/plain"
				});
				response.write(JSON.stringify(res));
				response.end();
				return;
			}
			var insert={username: params.username,
			password:params.password,
			intro:'此人沉迷原神，暂时没空修改签名。。',
			gender:'sir',
			level:0,
			};
			
			dbase.collection("user").insertOne(insert,function(err, res) {
			if (err) throw err;
			console.log("user registing updated success");
			db.close();
			var res=1;
			response.writeHead(200, {
				"Content-type": "text/plain"
			});
			response.write(JSON.stringify(res));
			response.end();
			});
			
			});
		});
}

function level(params, response) {
	console.log("Request handler 'level' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		console.log(params)
		dbase.collection("user").find({
			"username": params.username,
		}).toArray(function(err, result) { 
			if (err) throw err;
			console.log(result);
			res=result[0].level;
			response.writeHead(200, {
				"Content-type": "text/plain"
			});
			response.write(JSON.stringify(res));
			response.end();
		});
	
	});
}

function courses(params, response) {
	console.log("Request handler 'courses' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		console.log(params)
		dbase.collection("course_user").find({
			"userid": params.username,
		}).toArray(function(err, result) { 
			if (err) throw err;
			var cno=[];
			var len=result.length;
			var i =0;
			while(i<len){
				cno.push(result[i].courseid);
				i+=1;
			}
			dbase.collection("course").find({
				"courseid": {
				$in: cno
			}
			}).toArray(function(err, result) { 
				if (err) throw err;
				console.log(result);
				response.writeHead(200, {
					"Content-type": "text/plain"
				});
				response.write(JSON.stringify(result));
				response.end();
			});
		});
	
	});
}

function createCourse(params, response) {
	console.log("Request handler 'createCourse' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		console.log(params)
		var cid=parseInt(Math.floor(Math.random() * 100000000));
		var insert={
		title: params.coursename,
		intro:params.intro,
		teacher:params.teacher,
		assistant:params.assis,
		notice:'暂无通知',
		picsrc:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
		courseid:String(cid),
		};
		dbase.collection("course").insertOne(insert,function(err, res) {
		if (err) throw err;
		console.log("course creating success");
		var insert={
			courseid: String(cid),
			userid:params.username
		}
		dbase.collection("course_user").insertOne(insert,function(err, res) {
			if (err) throw err;
			console.log("course-user relationship creating success");
			db.close();
			
			response.writeHead(200, {
				"Content-type": "text/plain"
			});
			response.write(JSON.stringify(cid));
			response.end();
		});
		});
	
	});
}

function errorTest(params, response) {
	return 1/0;
}


function submitTask(params, response) {
	console.log("Request handler 'submitTask' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		console.log(params)
		var cid=parseInt(Math.floor(Math.random() * 100000000));
		var insert={
		taskid: params.taskId,
		userid:params.username,
		submit:params.submit
		};
		dbase.collection("user_task").insertOne(insert,function(err, res) {
		if (err) throw err;
		console.log("submitTask creating success");
		db.close();
		
		response.writeHead(200, {
			"Content-type": "text/plain"
		});
		response.write(JSON.stringify(cid));
		response.end();
		});
	
	});
}



function createTask(params, response) {
	console.log("Request handler 'createTask' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		console.log(params)
		var cid=parseInt(Math.floor(Math.random() * 100000000));
		var insert={
		tasktitle: params.taskname,
		taskintro:params.taskIntro,
		taskid:String(cid)
		};
		dbase.collection("task").insertOne(insert,function(err, res) {
		if (err) throw err;
		console.log("createTask creating success");
		var insert={
			courseid: String(params.courseId),
			taskid:String(cid),
		}
		dbase.collection("course_task").insertOne(insert,function(err, res) {
			if (err) throw err;
			console.log("course_task relationship creating success");
			db.close();
			
			response.writeHead(200, {
				"Content-type": "text/plain"
			});
			response.write(JSON.stringify(cid));
			response.end();
		});
		});
	
	});
}


function courseInfo(params, response) {
	console.log("Request handler 'courseInfo' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		console.log(params)
		dbase.collection("course").find({
			"courseid": params.courseid,
		}).toArray(function(err, result) { 
			if (err) throw err;
			console.log(result);
			res=result[0];
			res.courseId=res.courseid;
			dbase.collection("course_task").find({
				"courseid": params.courseid,
			}).toArray(function(err, result) { 
				if (err) throw err;
				var cno=[];
				var len=result.length;
				var i =0;
				while(i<len){
					cno.push(result[i].taskid);
					i+=1;
				}
				dbase.collection("task").find({
					"taskid": {
					$in: cno
				}
				}).toArray(function(err, result) { 
					if (err) throw err;
					res.task=result;
					
					dbase.collection("course_user").find({
						"courseid": params.courseid,
					}).toArray(function(err, result) { 
						if (err) throw err;
						var cno=[];
						var len=result.length;
						var i =0;
						while(i<len){
							cno.push(result[i].userid);
							i+=1;
						}
						dbase.collection("user").find({
							"username": {
							$in: cno
						}
						}).toArray(function(err, result) { 
							if (err) throw err;
							res.studentList=result;
							console.log(result);
							console.log(res);
							response.writeHead(200, {
								"Content-type": "text/plain"
							});
							response.write(JSON.stringify(res));
							response.end();
						});
					});
				});
			});
		});
	
	});
}

function getSbsubmit(params, response) {
	console.log("Request handler 'getSbsubmit' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		dbase.collection("course_task").find({
			"courseid": params.courseid
		}).toArray(function(err, result) { 
			if (err) throw err;
			var cno=[];
			var len=result.length;
			var i =0;
			while(i<len){
				cno.push(result[i].taskid);
				i+=1;
			}
			dbase.collection("user_task").find({
				"taskid": {
				$in: cno
			},
			"userid":params.username,
			
			}).toArray(function(err, result) { 
				if (err) throw err;
				
				console.log("getSbsubmit updated success");
				console.log(result)
				db.close();
				response.writeHead(200, {
					"Content-type": "text/plain"
				});
				response.write(JSON.stringify(result));
				response.end();
			})
		})
	});
}


function modifyCourseInfo(params, response) {
	console.log("Request handler 'modifyCourseInfo' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		var where={"courseid": params.courseid};
		var update={$set:{"title":params.title, "intro":params.intro }};
		dbase.collection("course").updateOne(where,update,function(err, res) {
        if (err) throw err;
        console.log("course updated success");
        db.close();
		response.writeHead(200, {
			"Content-type": "text/plain"
		});
		response.write(JSON.stringify(res));
		response.end();
        })
	});
}

function modifyCourseNotice(params, response) {
	console.log("Request handler 'modifyCourseNotice' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		var where={"courseid": params.courseid};
		var update={$set:{"notice":params.notice, }};
		dbase.collection("course").updateOne(where,update,function(err, res) {
        if (err) throw err;
        console.log("modifyCourseNotice updated success");
        db.close();
		response.writeHead(200, {
			"Content-type": "text/plain"
		});
		response.write(JSON.stringify(res));
		response.end();
        })
	});
}


function modifyTaskInfo(params, response) {
	console.log("Request handler 'modifyTaskInfo' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		var where={"taskid": params.taskid};
		var update={$set:{"tasktitle":params.tasktitle, "taskintro":params.taskintro}};
		dbase.collection("task").updateOne(where,update,function(err, res) {
        if (err) throw err;
        console.log("modifyTaskInfo updated success");
        db.close();
		response.writeHead(200, {
			"Content-type": "text/plain"
		});
		response.write(JSON.stringify(res));
		response.end();
        })
	});
}

function taskSubmit(params, response) {
	console.log("Request handler 'taskSubmit' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		console.log(params)
		dbase.collection("user_task").find({
			"taskid": params.taskid,
		}).toArray(function(err, result) { 
			if (err) throw err;
			console.log(result);
			response.writeHead(200, {
				"Content-type": "text/plain"
			});
			response.write(JSON.stringify(result));
			response.end();
		});
	
	});
}

function deleteCourse(params, response) {
	console.log("Request handler 'deleteCourse' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		var where={"courseid": params.courseid};
		dbase.collection("course").deleteOne(where,function(err, res) {
        if (err) throw err;
        console.log("deleteCourse course db delete success");
		dbase.collection("course_task").deleteOne(where,function(err, res) {
		if (err) throw err;
		console.log("deleteCourse course_task db delete success");
		dbase.collection("course_user").deleteOne(where,function(err, res) {
		if (err) throw err;
		console.log("deleteCourse course_user db delete success");
		db.close();
		response.writeHead(200, {
			"Content-type": "text/plain"
		});
		response.write(JSON.stringify(res));
		response.end();
		})
		})
        })
	});
}

function deleteTask(params, response) {
	console.log("Request handler 'deleteTask' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		var where={"taskid": params.taskid};
		dbase.collection("task").deleteOne(where,function(err, res) {
        if (err) throw err;
        console.log("deleteTask task db delete success");
		dbase.collection("course_task").deleteOne(where,function(err, res) {
		if (err) throw err;
		console.log("deleteTask course_task db delete success");
		dbase.collection("user_task").deleteOne(where,function(err, res) {
		if (err) throw err;
		console.log("deleteTask user_task db delete success");
		db.close();
		response.writeHead(200, {
			"Content-type": "text/plain"
		});
		response.write(JSON.stringify(res));
		response.end();
		})
		})
        })
	});
}



function deleteStudent(params, response) {
	console.log("Request handler 'deleteStudent' was called.");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db(DB);
		var where={"courseid": params.courseid, "userid": params.username };
		dbase.collection("course_user").deleteOne(where,function(err, res) {
        if (err) throw err;
        console.log("deleteTask course_user db delete success");
		db.close();
		response.writeHead(200, {
			"Content-type": "text/plain"
		});
		response.write(JSON.stringify(res));
		response.end();
        })
	});
}

function searchGeneID(params, response) {
	console.log("Request handler 'searchGeneID' was called.");
	console.log('--params : ID = ' + params.ID);
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbase = db.db("gffData");
		dbase.collection("gene").find({
			"attributes.ID": {
				$regex: params.ID
			}
		}).toArray(function(err, result) { // 返回集合中所有数据
			if (err) throw err;
			var arr = [];
			for (let i in result) {
				arr.push(result[i])
			};
			response.writeHead(200, {
				"Content-type": "text/plain"
			});
			response.write(JSON.stringify(arr));
			response.end();
		});

	});
}


function findIndexs(name, arr) {
	for (i = 0; i < arr.length; i++) {
		if (name == arr[i])
			return i;
	}
	return -1;
}


function searchGeneComplex(params, response) {
	result = [];
	console.log("Request handler 'searchGeneComplex' was called.");
	console.log('--params : type = ' + params.type);
	console.log('--params : chro = ' + params.chro);
	console.log('--params : keywords = ' + params.keywords);
	var chro = JSON.parse(params.chro);
	var type = JSON.parse(params.type);
	var tmp;
	var reg;
	var col;
	//CDS
	tmp = findIndexs('CDS', JSON.parse(params.type));
	MongoClient.connect(url, function(err, db) {
		console.log("func 1");
		col = 'CDS';
		if (tmp == -1) col = 'bin';
		reg = {
			"seqid": {
				$in: chro
			},
			$or: [{
				"attributes.ID": {
					$regex: params.keywords
				}
			}, {
				"attributes.Parent": {
					$regex: params.keywords
				}
			}]
		};
		var dbase = db.db("gffData");
		dbase.collection(col).find(reg).toArray(function(err, results) { // 返回集合中所有数据
			if (err) throw err;
			for (let i in results) {
				result.push(results[i])
			};
			console.log("func 1 end");
			//gene
			tmp = findIndexs('gene', JSON.parse(params.type));
			col = 'gene';
			if (tmp == -1) col = 'bin';
			console.log("func 2");
			var reg = {
				"seqid": {
					$in: chro
				},
				"attributes.ID": {
					$regex: params.keywords
				}
			};
			if (err) throw err;
			dbase.collection(col).find(reg).toArray(function(err, results) { // 返回集合中所有数据
				if (err) throw err;
				for (let i in results) {
					result.push(results[i])
				};
				console.log("func 2 end");
				//mRNA
				tmp = findIndexs('mRNA', JSON.parse(params.type));
				col = 'mRNA';
				if (tmp == -1) col = 'bin';
				console.log("func 3");
				var reg = {
					"seqid": {
						$in: chro
					},
					$or: [{
						"attributes.ID": {
							$regex: params.keywords
						}
					}, {
						"attributes.Parent": {
							$regex: params.keywords
						}
					}]
				};
				if (err) throw err;
				dbase.collection(col).find(reg).toArray(function(err, results) {
					if (err) throw err;
					var arr = [];
					for (let i in results) {
						result.push(results[i])
					};
					console.log("func 3 end");
					//exon
					tmp = findIndexs('exon', JSON.parse(params.type));
					col = 'exon';
					if (tmp == -1) col = 'bin';
					console.log("func 4");
					var reg = {
						"seqid": {
							$in: chro
						},
						$or: [{
							"attributes.Name": {
								$regex: params.keywords
							}
						}, {
							"attributes.Parent": {
								$regex: params.keywords
							}
						}]
					};
					if (err) throw err;
					dbase.collection(col).find(reg).toArray(function(err, results) {
						if (err) throw err;
						var arr = [];
						for (let i in results) {
							result.push(results[i])
						};
						console.log("func 4 end");
						//five_prime_UTR
						tmp = findIndexs('five_prime_UTR', JSON.parse(params.type));
						col = 'five_prime_UTR';
						if (tmp == -1) col = 'bin';
						console.log("func 5");
						var reg = {
							"seqid": {
								$in: chro
							},
							"attributes.Parent": {
								$regex: params.keywords
							}
						};
						if (err) throw err;
						dbase.collection(col).find(reg).toArray(function(err, results) {
							if (err) throw err;
							var arr = [];
							for (let i in results) {
								result.push(results[i])
							};
							console.log("func 5 end");
							//three_prime_UTR 
							tmp = findIndexs('three_prime_UTR', JSON.parse(params.type));
							col = 'three_prime_UTR';
							if (tmp == -1) col = 'bin';
							console.log("func 6");
							var reg = {
								"seqid": {
									$in: chro
								},
								"attributes.Parent": {
									$regex: params.keywords
								}
							};
							if (err) throw err;
							dbase.collection(col).find(reg).toArray(function(err, results) {
								if (err) throw err;
								var arr = [];
								for (let i in results) {
									result.push(results[i])
								};
								console.log("func 6 end");
								//response
								console.log("func 7");
								response.writeHead(200, {
									"Content-type": "text/plain"
								});
								response.write(JSON.stringify(result));
								response.end();
							});


						});


					});


				});


			});

		});
	});

}



exports.search = search;
exports.searchGeneID = searchGeneID;
exports.searchGeneComplex = searchGeneComplex;
exports.login = login;
exports.loginKey = loginKey;
exports.checkLoginKey = checkLoginKey;
exports.register = register;
exports.level = level;
exports.courses = courses;
exports.createCourse = createCourse;
exports.courseInfo = courseInfo;
exports.modifyCourseInfo = modifyCourseInfo;
exports.modifyCourseNotice = modifyCourseNotice;
exports.modifyTaskInfo = modifyTaskInfo;
exports.deleteCourse = deleteCourse;
exports.createTask = createTask;
exports.deleteTask = deleteTask;
exports.deleteStudent = deleteStudent;
exports.taskSubmit = taskSubmit;
exports.getSbsubmit = getSbsubmit;
exports.submitTask = submitTask;
exports.errorTest=errorTest;