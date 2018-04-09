var path = require ('path');
var mysql = require('mysql');
var database = require(path.join('../../db/database.js'));
var unique = require('unix-time');

exports.render = function(req, res){
	var getFirst = "SELECT * FROM questions ORDER BY id ASC LIMIT 1";
	var qst = null;
	database.query(getFirst,function(err, data){
		if(!err){
			qst = data;
			var request = {
				qst: 	qst,
				uid: 	unique(new Date()),
				last: 	false,
				suc: 	false
			}
			res.render('index', { req: request });
		} else {
			res.status(404).send('404 Not Found');
		}
	});
}

exports.handlePost = function(req, res){
	if( typeof req.body.ans !== 'undefined' && req.body.ans && 
	    typeof req.body.qid !== 'undefined' && req.body.qid && 
	    typeof req.body.uid !== 'undefined' && req.body.uid ){
		var ans = Boolean(Number(req.body.ans));
		var uid = req.body.uid;
		var qid = req.body.qid;
		var iQuery = "INSERT INTO answers (qid, uid, ans) VALUES (?, ?, ?)";
		var iValue = [qid, uid, ans];
			iQuery = mysql.format(iQuery, iValue);
		database.query(iQuery,function(err, data){
			if(!err){
				if(ans){
					iQuery = "SELECT * FROM questions where id = (SELECT MIN(id) FROM questions WHERE id > ?)";
					iValue = [qid];
					iQuery = mysql.format(iQuery, iValue);
					database.query(iQuery,function(err, data){
						if(!err){
							if(data.length>0){
								var request = {
									qst: 	data,
									uid: 	uid,
									last: 	false,
									suc: 	false
								}
								iQuery = "SELECT * FROM questions where id = (SELECT MIN(id) FROM questions WHERE id > ?)";
								iValue = [data[0].id];
								iQuery = mysql.format(iQuery, iValue);
								database.query(iQuery,function(err, data){
									if(!err){
										if(!(data.length>0)){
											request.last = true;
										}
									}
									res.render('index', { req: request });
								});
								
							} else {
								res.render('index', { req: {
									suc: 'Yes, You need DPIA'
								} });
							}
						} else {
							res.render('index', { req: {
								suc: 'System Error!!'
							} });
						}
					});
					
				} else {
					res.render('index', { req: {
						suc: 'You don\'t need DPIA'
					} });
				}
			}
		});
	} else {
		res.send('');
	}
}
