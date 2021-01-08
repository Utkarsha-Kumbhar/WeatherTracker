const express = require("express");
const https = require("https");//no need to install bcoz it is a native model already present in the project.
const bodyParser=require("body-parser");//body-parser allows us to look through the body of the request and fetch the data based on the name of my input

const app = express();

app.use(bodyParser.urlencoded({extended: true}));//compulsory statement to use body-parser

app.get("/",function(req, res){// this res is between client and my server
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apiKey= "506855f2c0ab1dec828e4c5e97bb4150#";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
    https.get(url,function(response){// this response is between my server and the server from where e=we are feching the data
    console.log(response.statusCode);
    
    //response.on("data")==> means when we received the data from server(here in this we are gettinh data in hexadecimal form)
    //to make the hexadecimal to read convert it to json format by JSON.parse
        response.on("data",function(data){
           const weatherData= JSON.parse(data);
           const temp=weatherData.main.temp;
           const description = weatherData.weather[0].description;
    
           const icon=weatherData.weather[0].icon
           const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
           
           res.write("<p>the weather is currently "+description+"</p>");
           res.write("<h1>Tempreture in "+query+" is "+temp+" degree celcius.</h1>");
           res.write("<img src="+imgurl+">");
    
           res.send()//we can have only one send in the website
        });
       
    });
     
       
})



app.listen(8080,function(){
    console.log("Server is running on port 8080 ");
});