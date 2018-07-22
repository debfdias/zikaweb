/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */

module.exports = function(app, passport, parameters) {

    app.get('/sistema', isLoggedIn, function(req, res) {
      req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM users',function(err,rows)
        {

          if(err)
            console.log("Error Selecting : %s ",err );

          res.render('sistema',{page_title:"sistema - Node.js",data:rows});

        });
      });
    });

    app.get('/sistema/login', isNotLoggedIn, function(req, res) {
        var options = {};
        options.message = req.flash('loginMessage');

        res.locals.message = req.flash('loginMessage');
        res.render('index',options);
    });
    

    app.post('/sistema/login', passport.authenticate('local-login', {
        successRedirect: '/sistema', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages

    }));

    app.get('/sistema/delete/:id', isLoggedIn, function(req, res) {

       var id = req.params.id;

       req.getConnection(function (err, connection) {

          connection.query("DELETE FROM users  WHERE id = ? ",[id], function(err, rows)
          {
            if(err)
              console.log("Error deleting : %s ",err );

            res.redirect('/sistema');

         });

      });

    });

    app.get('/sistema/edit/:id', isLoggedIn, function(req, res) {
      var id = req.params.id;

      req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM users WHERE id = ?',[id],function(err,rows)
        {
          if(err)
            console.log("Error Selecting : %s ",err );

          res.render('edit',{page_title:"Edit sistema - Node.js",data:rows});
        });
         //console.log(query.sql);
      }); 

    });

    app.post('/sistema/edit/:id', function(req, res) {

      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;

      req.getConnection(function (err, connection) {

        var data = {

          name    : input.name,
          address : input.address,
          email   : input.email,
          phone   : input.phone, 
          password: input.password

        };

        connection.query("UPDATE users set ? WHERE id = ? ",[data,id], function(err, rows) {
          if (err)
            console.log("Error Updating : %s ",err );
          res.redirect('/sistema');

        });
    
      });

    });

    app.get('/sistema/logout', isLoggedIn, function(req, res) {
      req.session.destroy(function(err) {
        res.redirect("/");
      })

    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

    function isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated())
            return next();
        res.redirect('/sistema');
    }

}


