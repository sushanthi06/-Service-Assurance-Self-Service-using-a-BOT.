const express=require('express');
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());
const MongoClient=require('mongodb').MongoClient;

const url='mongodb://127.0.0.1:27017';
const dbName='customerinfo';
let db

MongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{
    if(err) return console.log(err);
    db=client.db(dbName);
    console.log(`Connected MongoDB: ${url}`);
    console.log(`Database: ${dbName}`);
})

app.post('/searchbymobilenum',(req,res)=>{
    console.log("search user by mobile number");
    var mobile_number=req.body.mobile_number;
    var query={"mobile_number":mobile_number}
    console.log(query);
    db.collection('information').find(query).toArray(function(err,result){
          if(err)
          console.log("No match found");
          res.json(result);
    });
    
});
app.post('/getname',(req,res)=>{
    console.log(req.body);
    var mobile_number=req.body.queryResult.queryText;
    console.log(mobile_number);
    db.collection('information').find({"mobile_number":mobile_number}).toArray()
    .then((result)=>{
        console.log(result);
        res.json(result);
    }).catch((err)=>{
        res.send("please enter valid info");
    });
});
app.listen(3050);