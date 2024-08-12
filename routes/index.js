var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//profile 
router.get('/profile', isLoggedIn ,function (req, res, next) {
  res.send('Welcome to your profile')
})

//register 
router.post('/register', function (req, res, next) {
  var userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullName: req.body.fullName,
  });

  userModel.register(userData, req.body.password)
    .then(function (registereduser) {
        passport.authenticate('local')(req, res, function(){
          res.redirect('/profile')
        })
    })
})

//login 
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/'
}) ,function(req, res, next){})

//logout
router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err) return next(err);
    res.redirect('/')
  })
})

//isLoggedIn
function isLoggedIn(req, res, next){
  if(req.isauthenticated()){
    return next()
  }
  res.redirect('/')
}

module.exports = router;
