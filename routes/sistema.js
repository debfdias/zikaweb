
/*
 * GET users listing.
 */

exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM users',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.render('sistema',{page_title:"sistema - Node.js",data:rows});
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };
  

exports.edit = function(req, res){
    
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
};

exports.save_edit = function(req,res){
    
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
        
        connection.query("UPDATE users set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/sistema');
          
        });
    
    });
};

exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM users  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/sistema');
             
        });
        
     });
};

exports.sign = function(req, res){
  res.render('index',{page_title:"Add sistema - Node.js"});
};

exports.login = function(req, res){
    var message = '';
   req.getConnection(function (err, connection) {

        name = req.body.name;
        pass = req.body.phone;

        var sql="SELECT * FROM `users` WHERE `name`='"+name+"' and password = '"+pass+"'";    

        connection.query(sql, function(err, results){      
         if(results.length){
            console.log(results[0].id);
            res.redirect('/sistema');
         }
         else{
            message = 'Wrong Credentials.';
         }
                 
      });                       
      

  });
           
};

exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/");
   })
};

