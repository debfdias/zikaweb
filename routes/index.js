/*
 * GET home page.
 */

//Chamada para Tela Index
exports.index = function(req, res){
    res.render('app/index', { title: 'Página Inicial - ZikaWeb' });
};