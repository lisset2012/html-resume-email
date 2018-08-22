//1
var port = process.env.PORT || 8000;//process: golbal var from the nodejs enviroment:create enviromental variables
//2
var express = require('express');//require: method from nodejs to require the modules
var fs = require('fs');//fs: module that comes with express give you acces to the files system in the pc: delete, create...
var path = require('path');//
var nodemailer = require('nodemailer');
var app = express();// by running this initialize the server

//6
var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'fviclass@gmail.com',
        pass: 'fviclass2017'
    }
});

//5
//middleware. The order of the middleware matters.
//parse the body as a json object to interprete the content of the form that we are sending from the browser
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//14
//purpose of this is to enable cross domain requests
// Add headers


app.use(function (req, res, next) {

    var allowedOrgins = ['http://ltorres.techlaunch.io:8000','http://142.93.202.199:8000'];
    let origin = req.headers.origin;
    if(allowedOrgins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin',origin);
    }
    
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

//12
//expose the folder assets at the root location of my server for security (static contact as css, js, images)
//in order to use fetch
app.use('/', express.static(path.join(__dirname,'assets')));

//create a route (middlewares with DB)
//route: a way for the browser to comunicate with the back end
//4
app.get('/', function(req, res){//first parameter is the path, second callback function
 
 res.sendFile(path.join(__dirname,'form.html'));//_dirname????
});

//7 using the transporter
app.post('/', function(req, res){//first parameter is the path, second callback function
    // console.log(req.body);
    //8
    var emailBody = fs.readFileSync('./assets/prueba.html');
    //9???
    var mailOptions = {
        form: req.body.from,
        to: req.body.destination,
        html: emailBody,
        subject: req.body.subject
    };
    //10 send the email
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            return res.send({
                success: false,
                message: err.message
            });
        } 
        res.send({
            success: true,
            message: 'Your resume has been successfully sent'
        });
    });

    // res.end();//always have to respond something so the req dont keep hanging
   });

//3
app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    console.log('server listening on port', port);
});
