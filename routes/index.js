var express = require('express');
var router = express.Router();
const userModel = require('./users');
const userPost = require('./posts')
const passport = require('passport');
const upload = require('./multer')

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function (req, res, next) {
  res.render('index');
});

//login route 
router.get('/login', function (req, res, next) {
  res.render('login', {error: req.flash('error')});
})

//profile 
router.get('/profile', isLoggedIn , async function (req, res, next) {
  var user = await userModel.findOne({
    username: req.session.passport.user
  });
  res.render('profile', {user})
});
//route to upload files
router.post('/upload', upload.single('file'), function(req, res){
  if(!req.file){
    return res.status(404).send('No files were uploaded.')
  }
  res.send('File uploaded successfully!')
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
  failureRedirect: '/login',
  failureFlash: true
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
