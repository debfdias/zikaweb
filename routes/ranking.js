/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */


 module.exports = function(app, passport) {

 	app.get('/ranking/escolas', isLoggedIn, function(req, res) {
 		req.getConnection(function (err,connection){
	 		connection.query('SELECT * FROM schools ORDER BY points DESC', function(err,rows){
	 			if(err)
	 			{
	 				console.log("alguma coisa deu errado");
	 				res.redirect('/sistema');
	 			}
	 			else
	 			{
	 				res.render('rankingEscolas', {page_title:"ranking escolas", data:rows});
	 			}

	 		});
 		});
 	});

 	app.get('/ranking/estudantes', isLoggedIn, function(req, res) {
 		req.getConnection(function (err,connection){
	 		connection.query('SELECT * FROM students ORDER BY points DESC', function(err,rows){
	 			if(err)
	 				console.log("alguma coisa deu errado");

	 			connection.query('SELECT * FROM schools', function(err2,rows_){
	 				if(err)
	 					console.log("alguma coisa deu errado 2");
	 				else
		 				res.render('rankingEstudantes', {page_title:"ranking estudantes", data:rows, school:rows_});
		 		});
	 			
	 		});
	 	});
 	});

  	app.get('/ranking/escola/:id', isLoggedIn, function(req, res) {
  		var id = req.params.id;
 		req.getConnection(function (err,connection){
	 		connection.query('SELECT * FROM students WHERE school_id = ? ORDER BY points DESC',[id], function(err,rows){
	 			if(err)
	 				console.log("alguma coisa deu errado");

	 			connection.query('SELECT * FROM schools where id = ?', [id], function(err2,rows_){
	 				if(err2)
	 					console.log("alguma coisa deu errado 2");
	 				else
		 				res.render('rankingEscola', {page_title:"ranking estudantes", data:rows, school:rows_});
		 		});
	 			
	 		});
	 	});
 	});

    function isStudent(req,res)
    {
      if(req.user.type == 1)
        return true;
      else
        return false;
    }

    function isTeacher(req,res)
    {
      if (req.user.type == 2)
        return true;
      else
        return false;
    }

  function isAdmin (req,res) 
  {
    if (req.user.type == 0)
      return true;
    else
      return false;
  }
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