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
app.set('views','./views')
app.set('view engine','ejs')

app.post('/book', urlencodedParser, function(req, res){
   var sess = req.session 
   res.cookie('Team:'+req.body.team+'/  Date:'+req.body.datet + '/  Tel:' + req.body.tel +
   			'<br/>Name1:'+req.body.name1+'<br/>Name2:'+req.body.name2+'<br/>Name3:'+req.body.name3 )
   		.send('Team:'+req.body.team+'/  Date:'+req.body.datet + '/  Tel:' + req.body.tel+
   			'<br/>Name1:'+req.body.name1+'<br/>Name2:'+req.body.name2+'<br/>Name3:'+req.body.name3 )
   
});



// middleware
var history = []

var bodyParser = bodyParser.urlencoded({ extended: false })
app.use(cookieParser())
app.use(session({secret : 'test',resave: false,saveUninitialized: true}))
// set template engine , template folder


// Routing
// app.[Method](route path,callback)
// [Method] GET,POST,DELETE,PUT,PATCH
app.get('/index.ejs', function(req,res){

	res.render('/index.ejs',{history: history,ck : req.cookies})
})

app.post('/home.html',bodyParser, function(req,res){
	var date = new Date()
	var day = date.getDate()
  	var monthIndex = date.getMonth()
  	var year = date.getFullYear()
  	var hour = date.getHours()
  	var min = date.getMinutes()
  	var sec = date.getSeconds()
	var time = day + '/' + monthIndex + '/' + year + ' ' + hour + ':' + min + ':' + sec


app.get('/ck_get', function(req, res) { 
   res.send(req.cookies) 
}) 

 //------------------------------------------------------------------------------------

var orders = [{'id':0,'name':'M-4 ','price': 3500,'owner':'26'}, 
				{'id':1,'name':'SK-26 ','price': 4200,'owner':'56'}, 
	       		{'id':2, 'name':'Snow_woof sniper','price': 3500,'owner':'34'}]

var projects = [{'id':0,'team':'GUN PSU1','date': '12-5-2560','tel':'0844541548', 'name1':'A','name2':'B','name3':'C'}, 
	       		{'id':1,'team':'GUN PSU2','date': '13-5-2560','tel':'0881321122', 'name1':'a','name2':'b','name3':'c'}]

var idx = 2;

router.route('/orders') 	  
    .get(function(req, res) {    	
    	res.json(orders);
    })


	.post(function(req, res) { 
		var order = {}; 
		order.id = idx++;
		order.name = req.body.name
		order.price = req.body.price
		order.owner = req.body.owner
		console.log("Name:"+req.body.name+", Price:"+req.body.price+", Owner:"+req.body.owner+".")
		orders.push(order); 
		res.json({message : 'Success'})
	}) 


router.route('/orders/:order_id')
	.get (function(req,res) {
    	res.json(orders[req.params.order_id])
    })

	.put (function(req,res) {
		var id = req.params.order_id
        orders[id].name = req.body.name;  
        orders[id].price = req.body.price;
        orders[id].owner = req.body.owner 
        res.json({ message: 'order updated!' });        
     })

	.delete (function(req,res) {
		var id = req.params.order_id
		delete 	orders[id]
        res.json({ message: 'order deleted!' });        
    })
router.get('/', function(req, res) {
    res.json({ message: 'Hello! welcome to SHOOTING api!' }) 
});

app.use('/api', bodyParser.json(), router);  
 

});


 

app.use("*",function(req,res){
  res.status(404).send('404 Not found');
});
app.listen(50088, function() {
	console.log("Server is running on port 50088")
});