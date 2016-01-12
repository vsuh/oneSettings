/* global tt */
var express = require('express');
var router = express.Router();
var fs = require("fs");
//   fs.writeFileSync(filePath, String, 'utf-8');
//var my = require("mysql-native").createTCPClient('mysql.moscollector.local', 3306);
//my.auto_prepare = true;

/* GET home page. */
router.get('/', function(req, res, next) {
  var stage = req.query.ws;
  var content = function() {
  var text = [ ["om", "km", "pl"], ["be", "pl", "ko"], ["ce", "kl", "ok"] ];
      if (stage == '1') {
        var fileLog = '//kopt-app-01/com/cmd/dt23/23_b2out_mc_bnu.log';
        var cnt = fs.readFileSync(fileLog, 'utf8');
          text.push(['12.01.2016 04:12' , 'Какая - то длинная строка из файла протокола за сегодняшнюю ночь']);
          text.push(['12.01.2016 04:13' , 'еще Какая- то длинная строка из файла протокола за сегодняшнюю ночь']);
    //  } elseif(stage == '2') {
    //      var today = new Date();
    //      text.push([today, '[&nbsp;]', 'some log text']);
    //  } else {
    //      text.push(['today', '[&nbsp;]', 'some log text']);
      }
    return text;
  }
  res.render('index', { stage: stage , content: content()});
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
