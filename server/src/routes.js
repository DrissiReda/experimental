module.exports = function(app, passport) {
const strings = require('./config/strings.json')
const base32 = require('thirty-two')
const crypto = require('crypto')
const mailing = require('nodemailer')
const sprintf = require('sprintf')
const jwt = require('jsonwebtoken')

//config files   ===============================================================
const funct = require('./config/functions.js')
const mail  = require('./config/mail.js')
const Users = require('./models/users')
const Tweets = require('./models/tweets')
const transporter = mailing.createTransport({
    service : mail.service,
    auth    : {
      user : mail.auth.user,
      pass : mail.auth.pass
    }
})
// normal routes ===============================================================
  // show the home page (will also have our signin links)

  app.get('/', function(req, res) {
      res.json(req.user);
  });
  //pure html pages julien you can render them anyway you want
  app.get('/privacy', function(req, res) {
    res.render('privacy');
  });
  app.get('/cookies', function(req, res) {
    res.render('cookies');
  });
  app.get('/tos', function(req, res) {
    res.render('tos');
  });
  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
     if(!req.user) // no one logged in
        res.redirect('/');
      console.log("profile key is "+req.user.key);
      res.json(req.user);
  });
  app.post('/profile', function(req, res){
      console.log("profile post");
      console.log(req.user);
      if(!funct.isTotp(req.user.email))
      {
        req.session.method='plain';
        req.user.key=null;
        req.session.fixingkey=null;
        //this only happens if we cancelled and the req key is different from the db key
      }
      res.json(req.user);
  });
  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

// =============================================================================
// AUTHENTICATE (FIRST signin) ==================================================
// =============================================================================

  // locally --------------------------------
      // signin ===============================
      // show the signin form
      //you can display whatever you want but we need a form
      app.get('/signin', function(req, res) {
          res.render('signin');
      });

		app.post('/api/signin', function(req, res, next){
          passport.authenticate('local-signin',
            function(err, user, next){
              if(err)
                return next(err);
                if(!user){
                  return res.status(401).json({message: 'no authorization, get lost!'});
                }else {
                console.log(user)
                /*if(user.key) {
                res.session.fixingkey=req.user.key;
                  console.log(" this is totp");
                  res.session.method = 'totp';
              } else {
                  console.log(" this is plain ");
                  res.session.method = 'plain';
              }*/
              // what is sent to the server
              var payload={
                username : user.username,
                email : user.email,
                avatar_url:user.avatar_url,
                key : user.key,
              };
              res.status(200).json({
                  success:true,
                  message: 'successfully authenticated !',
                  data : payload
              })
            }
          })(req, res, next)
      })
      // process the signin form
      app.post('/signin', passport.authenticate('local-signin', {
          failureRedirect: '/signin'
        }),function(req, res) {
            if(req.user.key) {
              req.session.fixingkey=req.user.key;
                console.log(" this is totp");
                req.session.method = 'totp';
                res.redirect('/totp-input');
            } else {
                console.log(" this is plain ");
                req.session.method = 'plain';
                res.redirect('/');
            }
          }
      );

      // SIGNUP =================================
      // show the signup form
      app.get('/signup', function(req, res) {
          res.json(req.user);
      });

      // process the signup form
      app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/', // redirect to the secure profile section
          failureRedirect : '/signup' // redirect back to the signup page if there is an error
      }));

  // facebook -------------------------------

      // send to facebook to do the authentication
      app.get('/auth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'email'],
        failureRedirect: '/signin'
        }));

      // handle the callback after facebook has authenticated the user
      app.get('/auth/facebook/callback',
          passport.authenticate('facebook', {
              failureRedirect : '/'
          }), function(req, res) {
                console.log("we're here though");
                if(req.user.key) {
                  req.session.fixingkey=req.user.key;
                  console.log(" this is totp");
                  req.session.method = 'totp';
                  res.redirect('/totp-input');
                } else {
                  console.log(" this is plain ");
                  req.session.method = 'plain';
                  res.redirect('/');
                }
            });

  // twitter --------------------------------

      // send to twitter to do the authentication
      app.get('/auth/twitter', passport.authenticate('twitter', {
        scope : 'email',
        failureRedirect: '/signin'
        }));

      // handle the callback after twitter has authenticated the user
      app.get('/auth/twitter/callback',
          passport.authenticate('twitter', {
              failureRedirect : '/'
          }), function(req, res) {
                console.log("we're here though");
                if(req.user.key) {
                  req.session.fixingkey=req.user.key;
                  console.log(" this is totp");
                  req.session.method = 'totp';
                  res.redirect('/totp-input');
                } else {
                  console.log(" this is plain ");
                  req.session.method = 'plain';
                  res.redirect('/');
                }
            });


  // google ---------------------------------

      // send to google to do the authentication
      app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));

      // the callback after google has authenticated the user
      app.get('/auth/google/callback',
          passport.authenticate('google', {
              failureRedirect : '/auth/google'
          }), function(req, res) {
                console.log("we're here though");
                if(req.user.key) {
                  req.session.fixingkey=req.user.key;
                  console.log(" this is totp");
                  req.session.method = 'totp';
                  res.redirect('/totp-input');
                } else {
                  console.log(" this is plain ");
                  req.session.method = 'plain';
                  res.redirect('/');
                }
            });
     app.get('/totp-setup',
        isLoggedIn,
        ensureTotp,
        function(req, res) {
            var url = null;
            req.user.key=req.session.fixingkey
            if(req.user.key) {
              //need to remove spaces otherwise some apps don't recognize the QRcodes
                var qrData = sprintf('otpauth://totp/%s?secret=%s',
                                     req.user.username.toString().replace(/ /g, ''), req.user.key);
                url = "https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=" +
                       qrData;

            }
            console.log(url);
            //console.log(req.user);
            console.log("rendering "+req.user.key);
            res.json({
                strings: strings,
                username: req.user.username,
                key : req.user.key,
                url: url
            });
        }
    );

    app.post('/totp-setup',
        isLoggedIn,
        ensureTotp,
        function(req, res) {
          console.log("totp post");
            if(req.body.totp) {
                req.session.method = 'totp';
                console.log("Setting to totp");
                var secret = base32.encode(crypto.randomBytes(16));
                //Discard equal signs (part of base32,
                //not required by Google Authenticator)
                //Base32 encoding is required by Google Authenticator.
                //Other applications
                //may place other restrictions on the shared key format.
                secret = secret.toString().replace(/=/g, '');
                //setting the req.user.key but not the value on the database
                //we will update the db value after the user successfully verifies the code
                //that way he will not be locked out of his account if he doesn't finish the setup
                //process
                req.user.key = secret;
                req.session.fixingkey = req.user.key;
                console.log("We have set the key to "+req.user.key);
            } else {
                req.session.method = 'plain';
                console.log("Setting to plain");
                req.user.key = null;
                req.session.fixingkey = req.user.key;
            }
            res.redirect('/totp-setup');
        }
    );
    //totp input routes
    app.get('/totp-input', isLoggedIn, function(req, res) {
        if(!req.session.fixingkey)
          req.user.key=funct.isTotp(req.user.email);
        else {
          req.user.key=req.session.fixingkey;
        }
        if(!req.user.key) {
            console.log("Logic error, totp-input requested with no key set");
            res.redirect('/login');
        }

        res.json(strings);
    });
    //TODO add enableTotp here at success
    app.post('/totp-input', isLoggedIn, passport.authenticate('totp', {
        failureRedirect: '/totp-input',
    }), function (req, res) {
        //if the user succeeds for the first time we will set his key value
        req.user.key=req.session.fixingkey;
        console.log("notice is "+req.session.disablingtotp);
        if(req.session.disablingtotp){
            req.user.key=null;
            req.session.fixingkey=null;
            funct.disableTotp(req.user);
            req.session.notice="Your otp is disabled";
            req.session.method="plain";
            res.redirect('/profile');
        }
        else {
          //if this is the first time it's being enabled, make it persistent on the db
          funct.enableTotp(req.user,req.user.key);
          req.session.success="Your otp is valid !";
          res.redirect('/');
        }
    });
    //disables totp
    app.get('/totp-disable', isLoggedIn, function(req,res){
        req.session.notice="Please enter the code generated on your app to disable 2FA";
        req.session.disablingtotp=1;
        console.log("disabling....");
        //needs to verify the code before disabling it
        res.redirect('/totp-input');
    });
    // testing route
  app.get('/test', isLoggedIn, function(req,res){
     if (req.user.email.indexOf('@')< 1){
       console.log(req.user.twitter);
       req.session.error="twitter have no right here";
       res.redirect('/profile');
     } else {
      transporter.sendMail({
          from : mail.auth.user,
          to : req.user.email,
          subject : "sending a test",
          html : '<h1>Welcome</h1><p>This requires testing</p>'
      }, function(error, info){
        if(error){
          console.log("error");
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.redirect('/');
    }
  })
  //=====================================================================================
  //=====================================================================================
  //=====Marin's routes  ================================================================
  //=====================================================================================

  app.get('/api/tweets', (req, res) => {
    Tweets.getTweets((err, tweets) => {
      if (err) throw err
      res.json(tweets)
    })
  })

  // send all tweets by an user
  app.get('/api/tweets/:userId', (req, res) => {
    Tweets.getTweetsByUser(req.params.userId, (err, tweets) => {
      if (err) throw err
      res.json(tweets)
    })
  })

  // send all users
  app.get('/api/users', (req, res) => {
    Users.getUsers((err, users) => {
      if (err) throw err
      res.json(users)
    })
  })

  // send user matching the id
  app.get('/api/users/:_id', (req, res) => {
    Users.getUserById(req.params._id, (err, user) => {
      if (err) throw err
      res.json(user)
    })
  })

  // send user info for the name in the url
  app.get('/api/users/find/:username', (req, res) => {
    Users.getUserByName(req.params.username, (err, user) => {
      if (err) throw err
      res.json(user)
    })
  })

  // create new user
  app.post('/api/signup', (req, res) => {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    Users.addUser(newUser, (err, user) => {
      if (err) throw err
      res.json(user)
    })
  })

  // create a new tweet
  app.post('/api/tweets', (req, res) => {
    let tweet = req.body
    Tweets.tweet(tweet, (err, tweet) => {
      if (err) throw err
      res.json(tweet)
    })
  })

  app.get('/api/update', (req, res) => {
    Users.updateInfos((err) => {
      if (err) throw err
      res.send('updated')
    })
  })
  //=====================================================================================
  //=====================================================================================
  //=====================================================================================
  // route middleware to ensure user is logged in
  function ensureTotp(req, res, next) {
    req.user.key=req.session.fixingkey;
      console.log("ensure totp"+req.user);
      if((req.user.key && req.session.method == 'totp') ||
         (!req.user.key && req.session.method == 'plain')) {
           console.log("method is "+ req.session.method);
          next();
      } else {
        console.log("no totp cuz "+req.session.method);
          res.redirect('/');
      }
  }
  function  isLoggedIn(req, res, next) {
      if(req.user)
        req.user.key=req.session.fixingkey;
      if (req.isAuthenticated())
          return next();

      res.redirect('/');
  }
};
