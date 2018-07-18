
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load sistema route
var sistema = require('./routes/sistema'); 
var session = require('express-session');
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost', //'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'sampledb'

    },'pool') //or single

);



app.get('/', routes.index);
app.get('/sistema', sistema.list);
app.get('/sistema/login', sistema.sign);//call for login page
app.post('/sistema/login', sistema.login);//call for login post
app.get('/sistema/add', sistema.add);
app.post('/sistema/add', sistema.save);
app.get('/sistema/delete/:id', sistema.delete_customer);
app.get('/sistema/edit/:id', sistema.edit);
app.post('/sistema/edit/:id',sistema.save_edit);
app.get('/sistema/logout', sistema.logout);//call for logout


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
