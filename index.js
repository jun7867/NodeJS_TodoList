var express = require("express");
var app=express();

var todos={"자바스크립트 공부하기": true};

app.use(express.json());
app.use(express.static("public"));

app.listen(3500, function(){
  console.log("App listening on port 3500!");
});

app.post("/todos", function(req,res){
  todos=req.body.todos;
  console.log(req.body);
  res.status(200).send({ message: "success"}); //chaining 구조
});

app.get("/todos", function(req, res){
  res.status(200).send(todos);
});
