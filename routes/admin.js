/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */

 module.exports = function(app, passport) {

 	app.get('/admin/pendentes', isLoggedIn, function(req, res) {
 		req.getConnection(function (err,connection){
 			if(isAdmin(req,res))
 			{
 				connection.query('SELECT * FROM users WHERE auth = ? and type = ?', [0, 2], function(err,rows){
          if(err)
            console.log("Error Selecting : %s ", err );
          res.render('adminPanel', {page_title:"sistema - Node.js", data:rows});
        });
 			}
 			else
 			{
 				console.log("nao autorizado");
 				res.redirect('/sistema');
 			}
 		});

 	});

  app.get('/admin/refuse/:id', isLoggedIn, function(req, res) {

   var id = req.params.id;

   req.getConnection(function (err, connection) {

    connection.query('SELECT * FROM users where id=?',[id],function(err,rows){
      var email = rows[0].email;

      if(isAdmin(req,res)){
        connection.query("DELETE FROM users  WHERE id = ? ",[id], function(err, rows)
        {
          connection.query("DELETE FROM teachers  WHERE email = ? ",[email], function(err, rows)
          {
           if(err)
             console.log("Error deleting : %s ",err );
           else
             console.log("professor recusado");

           res.redirect('/sistema');
         });
        });
      }
      else
      {
        console.log("apenas admins podem recusar");
        res.redirect('sistema');
      }
    });
  });

 });

  app.get('/admin/accept/:id', isLoggedIn, function(req, res) {

   var id = req.params.id;

   req.getConnection(function (err, connection) {
     var data = {

       auth    : 1
     };

     if(isAdmin(req,res)){
      connection.query("UPDATE users set ? WHERE id = ? ",[data, id], function(err, rows)
      {
        if(err)
          console.log("Error deleting : %s ",err );
        else
          console.log("professor aprovado");

        res.redirect('/sistema');
      });
    }
    else
    {
      console.log("apenas admins podem aprovar");
      res.redirect('/sistema');
    }

  });

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

  function isAdmin (req,res) 
  {
    if (req.user.type == 0)
      return true;
    else
      return false;
  }

}