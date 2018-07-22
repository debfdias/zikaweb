/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */

 module.exports = function(app, passport, parameters) {

  app.get('/cadastro/professor', isNotLoggedIn, function(req, res){
    var message = '';

    res.locals.message = req.flash('registerMessage');
    res.render('app/cadastroProfessor',{page_title:"Add sistema - Node.js"});
  });

  app.post('/cadastro/professor', passport.authenticate('local-signup-prof', {
    successRedirect: '/', 
    failureRedirect: '/', 
    failureFlash: true // allow flash messages
  }));

  app.get('/cadastro/estudante', isNotLoggedIn, function(req, res){
    var message = '';

    res.locals.message = req.flash('registerMessage');
    res.render('app/cadastroEstudante',{page_title:"Add sistema - Node.js"});
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