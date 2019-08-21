var express = require('express'),
    app = express(),
    session = require('express-session');

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "user" && req.session.admin)
    return next();
  else
    return res.redirect('/');
};
 
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.send('login failed');    
  } else if(req.body.username === "user" || req.body.password === "abcd1234") {
    req.session.user = "user";
    req.session.admin = true;
    return res.redirect('/content');
  }
});

// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logged out");
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect("/");
});
 
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});
 
app.listen(3000);
console.log("app running at http://localhost:3000");