const express = require('express');
const path = require('path');
const port = 5257;
const app = express();
const fs = require('node:fs');
const session = require('express-session');

//MiddleWare
app.use(session(
  { name:'SessionCookie', 
    secret: 'Shsh!Secret!',
    resave: false,
    saveUninitialized: true, //changed from false to true
    cookie: { secure: false }
  }));

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Set up EJS
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', __dirname + '/views');

//connect other files (eg. css)
app.use(express.static(path.join(__dirname, 'public')));

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

/*
app.use(
	express.json(),
	express.urlencoded({
		extended: true,
  }));
app.use(express.static(path.join(__dirname, 'public')));
*/

//app.get('/', (req, res) => {
//	res.send('Hello from Concordia University');
//});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'a3.html'));
});


app.post('/', (req, res) => {
  console.log('Got body:', req.body);
  res.send("Received your request!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//QUESTION 1
app.get('/question1', (req,res) => {
  res.sendFile('/home/h_maifi/nodejs-proj/public/a3_q1.html');

})

app.get('/question1/a', (req,res) => {
  res.sendFile('/home/h_maifi/nodejs-proj/public/a3_q1.html');

})

app.post('/question1/a',function findSummation(req, res){
  console.log('Got body A:', req.body);
  
  const num = Number(req.body.num);
  var num2 = num - 1;
  var total = 0;
  if (num<0){
      total = false;
      res.send("The number "+num+" is not a positive integer");
  }
  else{
      total = num;
      for (; num2>=0; num2--){
          total += num2;
      }
      res.send("The sum of all the integers from 0 to "+num+" is equal to "+total);
  }

  
  console.log("Got number: ", req.body.num);
  
  
});
//--
app.get('/question1/b', (req,res) => {
  res.sendFile('/home/h_maifi/nodejs-proj/public/a3_q1.html');

})
app.post('/question1/b', (req, res) => {
  console.log("Got body B: ", req.body);
  let phrase = String(req.body.phrase);
  
  let stringArr = phrase.split(" ");
  
  for (let i=0; i<stringArr.length; i++){
    let length = stringArr[i].length;
    let cha = stringArr[i].charAt(0).toUpperCase();
    let lastCha = stringArr[i].charAt(length -1).toUpperCase();
    let newWord = cha;
    for (let j = 1; j<stringArr[i].length; j++){
      if (j==length-1){
        newWord+=lastCha;
      }
      else{
       newWord += stringArr[i].charAt(j);
      }
    }
    stringArr[i] = newWord;
  }
  let total='';
  for (let i=0; i<stringArr.length; i++){
    total += stringArr[i] + " ";
  }
  
  res.send(total);
})
//--
app.get('/question1/c', (req,res) => {
  res.sendFile('/home/h_maifi/nodejs-proj/public/a3_q1.html');
})
app.post('/question1/c', (req,res) => {
  let numbers = req.body.numbers;
  let numArr = numbers.split(" ");
  let length = numArr.length;

  //making the elements of the array "Numbers"
  for(let i=0; i<length; i++){
    let temp = Number(numArr[i]);
    numArr[i] = temp;
  }

  let average = 0;
  let median = 0;
  for (let i=0; i<numArr.length;i++){
    average+=numArr[i];
  }
  average = average/numArr.length;
  //ordering the array
  for (let i=0; i<length-1 ;i++){
    if(numArr[i]>numArr[i+1]){
      let temp = numArr[i];
      numArr[i] = numArr[i+1];
      numArr[i+1] = temp;
    }
  }
  let midIndex = length/2;
  console.log(midIndex);
  if(length%2==0){ //the length is even
    median = (numArr[midIndex-1]+numArr[midIndex])/2;
  }
  else{ //the length is odd
    median = numArr[midIndex-0.5];
  }
  res.send("The average is "+average+" and the median is "+median);
})
app.get('/question1/d', (req,res) => {
  res.sendFile('/home/h_maifi/nodejs-proj/public/a3_q1.html');
})
app.post('/question1/d', (req,res) => {
  let text = req.body.text;
  const digits = [0,0,0,0];
  let j=0;

  for (let i =0; i<text.length && j<4;i++){
    if (text.charAt(i)==" "){
      continue;
    }
    else if (text.charAt(i)<10){
      digits[j] = text.charAt(i);
      j++;
    }
  }
 console.log(digits.length);
  if (j>=4){
    res.send("The function returns true and the first 4 digits are: "+digits[0]+", "+digits[1]+", "+digits[2]+", "+digits[3]);
  }
  else{
    res.send("The function returns false");
  }
})
//QUESTION 2
const q2Route = require("./routes/numOfVisits");
app.use("/question2",q2Route);
//QUESTION 3
app.get('/question3', (req,res) => {
  res.sendFile('/home/h_maifi/nodejs-proj/public/a3_q3.html');
})
app.post('/question3', (req,res) => {
  let username = req.body.username;
  let phone = req.body.phonenumber;
  let validPhone = true; 
  //verifiying if the phone number is valid
  if(phone.length!=12){
    validPhone = false;
  }
  
  for(let i =0 ; i<12; i++){
    if (i==3 || i==7){
      if (phone.charAt(i)!="-"){
        validPhone = false;
      }
    }
    else if (!(phone.charAt(i)<10)){
      validPhone = false;
    }
    
  }
  if (validPhone){
    res.send(req.body);
  }
  else{
    res.send("Hi "+username+"! You phone number is invalid");
  }
  console.log("Got body: ",req.body);
})

//QUESTION 4 (Project)
app.get('/home', (req, res)=>{
  res.render('home');
});
app.get('/browse', (req, res)=>{
  res.render('browse');
});
app.get('/catcare', (req, res)=>{
  res.render('catcare');
});
app.get('/contact', (req, res)=>{
  res.render('contact');
});
app.get('/dogcare', (req, res)=>{
  res.render('dogcare');
});
app.get('/find', (req, res)=>{
  res.render('find');
});
app.get('/giveaway', (req, res)=>{
  res.redirect('login');
});
app.get('/statement', (req, res)=>{
  res.render('statement');
});
app.get('/login',(req, res) =>{
  res.render('login');
})
const users = ["username", "password"];
//Keeping infos about the users
app.post('/login', (req, res) =>{
  const verify = verifyInfos(users, req.body.username, req.body.password);
  if(verify==1){//both the username exists and the password is correct
    console.log("Correct username and correct password");
    let username = req.body.username;
    let password = req.body.password;
    req.session.authenticated = true;
    req.session.user = {username:username};
    //res.json(req.session);
    res.render('giveaway');
  }
  else if(verify==2){ //the username exists but the password is not correct
    console.log("Invalid password for this username");
    res.render('invalidUser');
  }
  else{
    console.log("A new user has been created");
    users.push(req.body.username,req.body.password)
    write(req.body.username, req.body.password);
    let username = req.body.username;
    let password = req.body.password;
    req.session.authenticated = true;
    req.session.user = {username:username};
    res.render('giveaway');
  }
  
})
function write(username, password){
  fs.appendFile('public/login.txt', username+":"+password+"\n",err =>{
    if(err){
      console.error(err);
    }
  })
}
function verifyInfos(dataArr, username, password){
  let found = false; 
  let passwordMatch = false;
  for (let i = 0; i<dataArr.length && !found && !passwordMatch; i++){
    equalUsername = (username.localeCompare(dataArr[i]));
    if (i%2==0 && (equalUsername==0)){
      found = true;
      passwordEqual = (password.localeCompare((dataArr[i+1])));
      if(passwordEqual==0){
        passwordMatch = true;
      }
    }
  }
  if(found && passwordMatch){
    return 1;
  }
  else if (found && !passwordMatch){
    return 2;
  }
  else {
    return 3;
  }

}

//Entering infos about pets given away
app.post('/giveaway', (req, res) => {
  const cORd = req.body.cORd;
  const breed = req.body.breed;
  const mixed = req.body.mixed;
  const age = req.body.age;
  const gender = req.body.gender;
  const otherPets = req.body.otherPets;
  const otherKids = req.body.otherKids;
  const comments = req.body.comments;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  let username = req.session.user.username;
  writeGA(cORd, breed, mixed, age, gender, otherPets, otherKids, comments, firstName, lastName, email, username);
  console.log("File Updated");
  res.render('giveaway');
  /* cat or dog: cORd
      name: breed
      name: mixed
      name: age
      name: gender
      name: otherPets
      name: otherKids
      name: comments
      name: firstName
      name: lastName
      name: email
  */
})
function writeGA(cORd, breed, mixed, age, gender, otherPets, otherKids, comments, firstName, lastName, email, username){ 
    fs.appendFile('public/giveaway.txt', "Animal given by "+lastName+" "+firstName+" Username: "+username+" email: "+email+"\n"+"Cat or dog? "+cORd+"\nBreed: "+breed+" Mixed? "+mixed+"\nAge: "+age+"\nGender: "+gender+"\nOther Pets: "+otherPets+" Other Kids: "+otherKids+"\nAdditional Comments: "+comments+"\n\n",err =>{
    if(err){
      console.error(err);
    }
  })
}
app.get('/logout', (req, res)=>{
  res.render('logout');
})
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    // destroy the session
    if (err) {
      return console.log(err);
    }
    res.render("logoutS");
  });
});
