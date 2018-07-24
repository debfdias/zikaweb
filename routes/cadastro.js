/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */

 module.exports = function(app, passport, parameters) {


  app.get('/cadastro', isNotLoggedIn, function(req, res){
    var message = '';
    const queryStates  = "select * from states";
    const queryProfiles= "select * from profiles";

    req.getConnection(function (err,connection){
      connection.query(queryStates,function (err,rows1)
      {

        if(err)
          console.log("Error Selecting : %s ",err );

        connection.query(queryProfiles,function(err,rows2)
        {
          res.render('app/cadastro',{page_title:"sistema - Node.js", data_state:rows1, data_profiles:rows2});
        });

      });
    });
  });

  app.post('/cadastro', function(req, res){

    //const input    = req.body;
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input)

    req.getConnection(function (err, connection) {

      var id_state   = input.stateId;
      var id_profile = input.profileId;

      if(id_profile == 2)
      {
        res.redirect('/cadastro/professor/'+id_state);
      }
      else if(id_profile == 1)
      {
        res.redirect('/cadastro/estudante/'+id_state);
      }

    });

  });

  app.get('/cadastro/professor/:id', isNotLoggedIn, function(req, res){
    var message = '';
    var id = req.params.id;

    req.getConnection(function(err,connection){
      connection.query("select * from schools where state_id = ?",[id], function(err,rows1)
      {

        if(err)
          console.log("Error Selecting : %s ",err );

        res.locals.message = req.flash('registerMessage');
        res.render('app/cadastroProfessor',{page_title:"sistema - Node.js", data_school:rows1});
      });
    });
  });

  app.post('/cadastro/professor', passport.authenticate('local-signup-prof', {
    successRedirect: '/', 
    failureRedirect: '/', 
    failureFlash: true // allow flash messages
  }));

  app.get('/cadastro/estudante/:id', isNotLoggedIn, function(req, res){
    var message = '';
    var id = req.params.id;

    req.getConnection(function(err,connection){
      connection.query("select * from schools where state_id = ?",[id], function(err,rows1)
      {

        if(err)
          console.log("Error Selecting : %s ",err );

        res.locals.message = req.flash('registerMessage');
        res.render('app/cadastroEstudante',{page_title:"sistema - Node.js", data_school:rows1});
      });
    });

  });

  app.post('/cadastro/estudante', passport.authenticate('local-signup-std', {
    successRedirect: '/', 
    failureRedirect: '/', 
    failureFlash: true // allow flash messages
  }));



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