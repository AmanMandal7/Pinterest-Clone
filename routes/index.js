var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function (req, res, next) {
  res.render('index');
});

//login route 
router.get('/login', function (req, res, next) {
  res.render('login')
})

//profile 
router.get('/profile', isLoggedIn ,function (req, res, next) {
  res.render('profile')
})

//feed route 
router.get('/feed',function (req, res, next) {
  res.render('feed')
})

//register 
router.post('/register', function (req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
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
  failureRedirect: '/login'
}) ,function(req, res, next){})

//logout
router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err) return next(err);
    res.redirect('/login')
  })
})

//isLoggedIn
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

module.exports = router;
