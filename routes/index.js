/* global tt */
var express = require('express');
var router = express.Router();
var my = require("mysql-native").createTCPClient('mysql.moscollector.local', 3306);
my.auto_prepare = true;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/settings', function(req, res, next) {
  res.render('settings', { title: 'Express' });
});


router.get('/params', function(req, res, next) {
  res.render('params', { title: 'Express' });
});


router.get('/customers', function(req, res, next) {
  res.render('customers', { title: 'Express' });
});


module.exports = router;
//// *** *** *** ////
function dump_rows(cmd)
{
   cmd.addListener('row', function(r) { console.dir(r); } );
}

function getRowsFromTable(){
    my.auth('db1cprod','v8','G0bl1n76');
    var tt = my.query('select * from `upload_settings_chg_proto`;');
    return tt;    
}
//dump_rows(getRowsFromTable());
