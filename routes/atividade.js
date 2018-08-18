/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */
 
module.exports = function(app, passport) {

    app.get('/desafio/delete/:id', isLoggedIn, function(req, res) {

       var id = req.params.id;

       req.getConnection(function (err, connection) {

          if(isAdmin(req,res)){
            connection.query("DELETE FROM activities WHERE id = ? ",[id], function(err, rows)
            {
            	if(err)
                    console.log("Error deleting : %s ",err );
                else
                	console.log("desafio deletado por admin");
                res.redirect('/sistema');
           });
          }
          else
          {
            console.log("apenas admins podem deletar desafios");
            res.redirect('/sistema');
          }
      });

    });

    app.get('/desafio/edit/:id', isLoggedIn, function(req, res) {
      var id = req.params.id;

      req.getConnection(function(err,connection){

      	if(isAdmin(req,res))
      	{
	        var query = connection.query('SELECT * FROM activities WHERE id = ?',[id],function(err,rows)
	        {
	         	if(err)
  	         {
              console.log("Error Selecting : %s ",err );
             }
             else
             {
              var query2 = connection.query('SELECT * FROM type_activity',function(err2,rows2)
              {
                if(err2)
                  console.log("erro %s ", err2);

                res.render('app/desafioEdit',{page_title:"Edit sistema - Node.js",data:rows, type:rows2});

              });
             }
	          	
	        });
  	    }
  	    else
  	    {
  	    	console.log("admins editam desafios");
  	    	res.redirect('/sistema');
  	    }
      }); 
    });

    app.post('/desafio/edit/:id', function(req, res) {

      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;

      req.getConnection(function (err, connection) {

      	var data = {

            name          : input.name,
            description   : input.description,
            points        : input.points,
            type          : input.typeId
        };

        if(isAdmin(req,res)) 
        {
        	connection.query("UPDATE activities set ? WHERE id = ? ",[data,id], function(err, rows) {
	          	if (err)
	                console.log("Error Updating : %s ",err );
	            else
	           		console.log("editado desafio por admin");

	            res.redirect('/sistema');
          	});
        }
        else
        {
        	console.log("sem permissao para editar desafio");
        	res.redirect('/sistema');

        }
    
      });

    });

    app.get('/desafio/cadastro', isLoggedIn, function(req, res) {

      const queryTypeActivities = "select * from type_activity";

      	req.getConnection(function(err,connection){
        
	        if(isAdmin(req,res))
	        {  
            connection.query(queryTypeActivities,function (err,rows1)
            {
              res.render('app/cadastroDesafio',{page_title:"ZikaWEB ", data:rows1});
            });
	        }
	        else
	        {
	            console.log("voce nao pode cadastrar desafio");
	            res.redirect('/sistema');
	        }
      });
    });

    app.post('/desafio/cadastro', function(req, res) {

	    var input = JSON.parse(JSON.stringify(req.body));

	    req.getConnection(function (err, connection) {

		    var data = {

	            name         : input.name,
	            description  : input.description,
	            points       : input.points,
	            active       : 0,
              type         : input.typeId

	        };

	        connection.query("INSERT INTO activities set ?",[data], function(err,rows){
	        	if(err)
            		console.log("Error inserting : %s ",err );
            	else
					console.log("desafio cadastrado");

            	res.redirect('/sistema');
            });

	    });
    });

  app.get('/desafio/activate/:id', isLoggedIn, function(req, res) {

	   var id = req.params.id;

	   req.getConnection(function (err, connection) {

		   	if(isAdmin(req,res))
		   	{
		   		connection.query('UPDATE  activities SET active = 1 WHERE id = ?',[id],function(err,rows){
		   			if(err)
		   				console.log("problema em ativar");
		   			else
		   				console.log("desafio ativada")
		   			res.redirect('/sistema');

			    });
		   	}
		   	else
		   	{
		   		console.log("sem permissao para mexer em desafio");
		   		res.redirect('/sistema');
		   	}
		    
		});
	});

    app.get('/desafio/deactivate/:id', isLoggedIn, function(req, res) {

	   var id = req.params.id;

	   req.getConnection(function (err, connection) {

		   	if(isAdmin(req,res))
		   	{
		   		connection.query('UPDATE  activities SET active = 0 WHERE id = ?',[id],function(err,rows){
		   			if(err)
		   				console.log("problema em ativar");
		   			else
		   				console.log("desafio desativada");

		   			res.redirect('/sistema');

			    });
		   	}
		   	else
		   	{
		   		console.log("sem permissao para mexer em atividade");
		   		res.redirect('/sistema');
		   	}
		    
		});
	});

    app.get('/desafio/:id', isLoggedIn, function(req, res) {

    	var id = req.params.id;
      	req.getConnection(function(err,connection){

        connection.query('SELECT a.name AS act_name, a.description AS act_description, a.points, a.active, t.name AS type_name, t.description AS type_description FROM activities a JOIN type_activity t ON a.type = t.id WHERE a.id = ?',[id], function(err,rows)
        {
            if(err)
              console.log("Error Selecting : %s ",err );

            res.render('app/desafio',{page_title:"atividade - Node.js",data:rows});
        });
      });
    });

    app.get('/desafios', isLoggedIn, function(req, res) {

      	req.getConnection(function(err,connection){
        var q = "SELECT a.name AS act_name, a.description AS act_description, a.points, a.active, t.name AS type_name, t.description AS type_description FROM activities a JOIN type_activity t ON a.type = t.id";
        connection.query(q, function(err,rows)
        {
            if(err)
              console.log("Error Selecting : %s ",err );

            //res.render('app/desafiosLista',{page_title:"atividade - Node.js",data:rows});
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

    function isAdmin (req,res) 
    {
      if (req.user.type == 0)
        return true;
      else
        return false;
    }
}