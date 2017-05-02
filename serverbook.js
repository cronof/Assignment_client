var express = require('express'); 
var app = express(); 
var router = express.Router(); 
var session = require('express-session');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
//------------------------------------------------------------------------------------
app.use(session({ 
				secret : 'keyboard cat',
				cookie : {maxAge : 60000},
				resave : false,
				saveUninitalized : false
}))
app.use(cookieParser('cat')) 

var urlencodedParser = bodyParser.urlencoded({ extended: false }); 
app.use(express.static('public'))
app.use('/',express.static(__dirname + '/public')); 

app.get('/ck_get', function(req, res) { 
   res.send(req.cookies) 
}) 

 //------------------------------------------------------------------------------------

var projects = [{'id':0,'team':'GUN PSU1','date': '12-5-2560','tel':'0844541548', 'name1':'A','name2':'B','name3':'C'}, 
	       		{'id':1,'team':'GUN PSU2','date': '13-5-2560','tel':'0881321122', 'name1':'a','name2':'b','name3':'c'}]

var idx = 2;

router.route('/projects') 	  
    .get(function(req, res) {    	
    	res.json(projects);
    })


	.post(function(req, res) { 
		var project = {}; 
		project.id = idx++;
		project.team = req.body.team
		console.log(req.body.team + req.body.date)
		project.tel = req.body.tel
		project.date = req.body.date
		projects.push(project); 
		res.json({message : 'Success'})
	}) 

router.route('/projects/:project_id')
	.get (function(req,res) {
    	res.json(projects[req.params.project_id])
    })
    .put (function(req,res) {
		var id = req.params.project_id
        projects[id].team = req.body.team;  
        projects[id].tel = req.body.tel;
        projects[id].date = req.body.date 
        res.json({ message: 'project updated!' });        
     })

	.delete (function(req,res) {
		var id = req.params.project_id
		delete 	projects[id]
        res.json({ message: 'project deleted!' });        
    })

router.get('/', function(req, res) {
    res.json({ message: 'Hello! welcome to SHOOTING api!' }) 
});




app.use('/api', bodyParser.json(), router);  
app.use("*",function(req,res){
  res.status(404).send('404 Not found');
});
app.listen(50088, function() {
	console.log("Server is running on port 50088")
});
