var express = require ('express');
var bodyParser = require ('body-parser');
var path = require ('path');

var routes = require('./App/Routes/Web');
var app = express();
//bodeParser handling
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/*var logger = function(req, res, next){
	console.log('logging');
	next();
};

app.use(logger);
*/

//view Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Set static Path
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.listen (3000, function(){
	console.log("Server is running on port 3000");
});

//module.exports = app;