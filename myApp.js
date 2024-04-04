const { time } = require('console');
let express = require('express');
const { param } = require('express/lib/request');
let app = express();
var path = require('path')
require('dotenv').config()
let bodyParser = require('body-parser')

app.use("/public",express.static(path.join(__dirname, '/public')))


//to get information about viewer  and // handle POST Method

app.use(
    function(req, res, next) {
        console.log(req.method+" "+req.path+" - " +req.ip);
        next();
      }
)

app.use(bodyParser.urlencoded({extended :false}))
app.use(bodyParser.json())




//to connect to index html
app.get("/",(req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})

//get api by message style
app.get("/json",(req,res)=>{
    if(process.env.MESSAGE_STYLE == "uppercase"){
        res.json({
            "message" :"HELLO JSON"
        })
        
    }else{
        res.json({
            "message" :"Hello json"
        })
    }
})

//get current time
app.get('/now' ,function(req,res,next){
    req.time = new Date().toString()
    next()
},function(req,res){
    res.json({
        "time" : req.time
    })
})

//get data from user by route
app.get('/:word/echo', function(req,res){
    res.json({
        "echo" : req.params.word
    })
})

//get data from form by POst Method
app.post('/name', function(req,res){
    console.log(req.body.first)
    res.json({
        "name" : req.body.first + " " + req.body.last
    })
})

//get data from user by route part 2
app.get('/name',function(req,res){
    console.log(req.query.first)
    res.json({"name" : req.query.first +" "+ req.query.last})

})


console.log("Hello World")



































 module.exports = app;
