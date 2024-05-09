const express = require('express');
const path = require('path');
const port = 5257;
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// Parse JSON bodies
app.use(bodyParser.json());

// Middleware to log request bodies
app.use((req, res, next) => {
  console.log('Request body:', req.body);
  next();
});

app.use(express.json());
app.use(express.urlencoded());

//for cookies
app.use(cookieParser());

//QUESTION 2
let numOfVisits = 0;
let date = 0;
app.get('/', (req,res) => {
  date = Date();
  res.cookie("lastVists", date, {
    httpOnly: true,
  })
  res.cookie("numOfVisits", numOfVisits, {
    httpOnly: true,
  })
  res.sendFile('/home/h_maifi/nodejs-proj/public/a3_q2.html');
  numOfVisits++;
})

app.post('/', (req,res)=>{
  let message = ` Your last visit was on `+date;
  
  if (numOfVisits==1){
    res.send("Welcome to my webpage! It is your first time that you are here.");
  }
  else{
    res.send("Hello, this is the "+numOfVisits+" time that you are visiting my webpage. " + message);
    
  }
})

//exporting the app
module.exports = app;



