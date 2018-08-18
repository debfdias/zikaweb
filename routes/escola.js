/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */
 
module.exports = function(app, passport) {

    app.get('/escola/delete/:id', isLoggedIn, function(req, res) {

       var id = req.params.id;

       req.getConnection(function (err, connection) {

          if(isAdmin(req,res)){
            connection.query("DELETE FROM schools  WHERE id = ? ",[id], function(err, rows)
            {
            	if(err)
                    console.log("Error deleting : %s ",err );
                else
                	console.log("escola deletada por admin");
                res.redirect('/sistema');
           });
          }
          else
          {
            console.log("apenas admins podem deletar escola");
            res.redirect('/sistema');
          }
      });

    });

    app.get('/escola/edit/:id', isLoggedIn, function(req, res) {
      var id = req.params.id;

      req.getConnection(function(err,connection){

      	if(!isStudent(req,res))
      	{
	        var query = connection.query('SELECT * FROM schools WHERE id = ?',[id],function(err,rows)
	        {
	         	if(err)
	            	console.log("Error Selecting : %s ",err );

	          	res.render('app/escolaEdit',{page_title:"Edit sistema - Node.js",school:rows});
	        });
  	    }
  	    else
  	    {
  	    	console.log("admins e profs editam escola");
  	    	res.redirect('/sistema');
  	    }
      }); 
    });

    app.post('/escola/edit/:id', function(req, res) {

      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;

      req.getConnection(function (err, connection) {

      	var data = {

            name    : input.name,
            token   : input.token
        };

        if(isAdmin(req,res)) 
        {
        	connection.query("UPDATE schools set ? WHERE id = ? ",[data,id], function(err, rows) {
	          	if (err)
	                console.log("Error Updating : %s ",err );
	            else
	           		console.log("editado escola por admin");

	            res.redirect('/sistema');
          	});
        }
        else if(isTeacher(req,res))
        {
      			connection.query('SELECT * FROM teachers where email=?',[req.user.email],function(err,rows){
      				var school_id = rows[0].school_id;
              var isPrincipal = rows[0].principal;
      				if(school_id == id && isPrincipal == 1)
      				{
      		        	connection.query("UPDATE schools set ? WHERE id = ? ",[data,id], function(err, rows) {
      			          	if (err)
      			                console.log("Error Updating : %s ",err );
      			            else
      			           		console.log("editado escola por prof");
      			            
      			            res.redirect('/sistema');
      		          	});
      				}
      				else
      				{
      					console.log("voce nao eh prof dessa escola ou nao eh diretor para editar");
      					res.redirect('/sistema');
      				}

          	});
        }
    
      });

    });

    app.get('/escola/cadastro', isLoggedIn, function(req, res) {

      	req.getConnection(function(err,connection){
        
          if(isAdmin(req,res))
          {
            var query = connection.query('SELECT * FROM states', function(err,rows)
            {
              if(err)
                console.log("Error Selecting : %s ",err );

              res.render('app/cadastroEscola',{page_title:"escola - Node.js",state:rows});

            });
          }
          else
          {
            console.log("voce nao pode cadastrar escola");
            res.redirect('/sistema');
          }
      });
    });

    app.post('/escola/cadastro', function(req, res) {

	    var input = JSON.parse(JSON.stringify(req.body));

	    req.getConnection(function (err, connection) {

		    var data = {

	            name     : input.name,
	            city_id  : 1,
	            state_id : input.stateId,
	            points   : 0,
	            token    : 'null',
              num_students : 0,
              num_teachers : 0

	        };

          if(isTeacher(req,res))
            data.num_teachers++;

	        	connection.query("INSERT INTO schools set ?",[data], function(err,rows1){
	        		if(err)
            			console.log("Error Selecting : %s ",err );
            		else
						console.log("escola cadastrada");

            		res.redirect('/sistema');
            	});

	    });
    });


    app.get('/escola/:id', isLoggedIn, function(req, res) {

    	var id = req.params.id;
      	req.getConnection(function(err,connection){

        connection.query('SELECT * FROM states', function(err,rows_)
        {
          connection.query('SELECT * FROM schools where id=?', [id], function(err,rows)
          {
            if(err)
              console.log("Error Selecting : %s ",err );

            res.render('app/escola',{page_title:"escola - Node.js",school:rows, state:rows_});

          });
        });
      });
    });

    app.get('/escolas/:id', isLoggedIn, function(req, res) {

      var id = req.params.id;
        req.getConnection(function(err,connection){

        connection.query('SELECT * FROM states', function(err,rows_)
        {
          connection.query('SELECT * FROM schools where id=?', [id], function(err,rows)
          {
            if(err)
              console.log("Error Selecting : %s ",err );

            res.render('app/escola',{page_title:"escola - Node.js",school:rows, state:rows_});

          });
        });
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

}