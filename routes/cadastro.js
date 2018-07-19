//
//CADASTRO
//

exports.add = function(req, res){
  var message = '';
  res.render('app/cadastro',{page_title:"Add sistema - Node.js"});
};

exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone,
            password: input.password
        
        };
        
        var query = connection.query("INSERT INTO users set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Erro: %s ",err );
         
          console.log("sucesso!");
          res.redirect('/');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};