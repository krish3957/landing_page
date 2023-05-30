//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");


const https = require("https");
const { join } = require("path");
// const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})


app.post("/",function(req,res){
    var firstName =req.body.fname;
    var lastName = req.body.lname;
    var Email = req.body.email;
    
    
    var data={
        members:[
            {
                email_address: Email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    var jsonData= JSON.stringify(data);
    const options = {
        method: "POST",
        auth: "krish3957:cc82efa2f53851c29e6f5d2f6f6b1fd2-us21"
    }
    const url ="https://us21.api.mailchimp.com/3.0/lists/1d1043357f";
    const request = https.request(url,options,function(response){
        response.on("data", function(data){
            const statusCode = response.statusCode;
            if(statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(3001,function(){
    console.log("Server is running on port 3001");
});

//api key
//cc82efa2f53851c29e6f5d2f6f6b1fd2-us21

// unique id
//1d1043357f