exports.addanswers = function(req, res){

    usr = req.body;
	console.log(usr);
    var details = {
        username: usr.username,
        password: usr.password,
    };
    db.query('INSERT into  `answers` SET ?', details, function (err, result) {
        if (err)
            throw err;
        else{
        console.log(' The value inserted. ');
            req.flash('success', 'Successfully completed.');
            res.redirect('/answers');
        }
    });

};