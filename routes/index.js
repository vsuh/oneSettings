/* global tt */
var express = require('express');
var router = express.Router();
var fs = require("fs");
var Iconv = require('iconv-lite');
//   fs.writeFileSync(filePath, String, 'utf-8');
//var my = require("mysql-native").createTCPClient('mysql.moscollector.local', 3306);
//my.auto_prepare = true;

/* GET home page. */
router.get('/', function (req, res, next) {
    var stage = req.query.ws || '1';
    var content = function () {
    var text = new Array();
        if (stage == '1') {
            var fileLog = '//kopt-app-01/com/cmd/dt23/23_b2out_mc_bnu.log';
            var ctime = fs.statSync(fileLog).ctime;
            var translated = Iconv.decode(fs.readFileSync(fileLog), 'windows1251');
            if(!translated) {
                translated = "Не удалось прочитать логфайл `"+fileLog+"`";
            }
            text.push([_tStamp(ctime),'1cKucy', translated]);
        } else if (stage == '2') {
            var today = new Date();
            text.push([_tStamp(today), 'initialized ok']);
        } else if (stage == '3') {
            var logFiles = [
                '//kopt-app-01/com/cmd/log/02_out_1cCORP.dt.log',
                '//kopt-app-01/com/cmd/log/02_out_1cKucy.dt.log',
                '//kopt-app-01/com/cmd/log/02_out_1cUAT.dt.log'
            ];
            logFiles.forEach(function(fn, index, array){
                var ct = fs.statSync(fn).ctime;
                var rt = 'out_(.*)\.dt.*$';
                var re = RegExp(rt);
                var ib = re.exec(fn);
                var translated = Iconv.decode(fs.readFileSync(fn), 'windows1251');
                text.push([_tStamp(ct), ib[1], translated]);
            //    console.log(_tStamp(ct), ib[1]);
            });

        } else {
            var today = new Date();
            text.push([_tStamp(today), 'not implemented yet']);

        }
        return text;
    }
    res.render('index', {
      stage: stage,
      content: content(),
      infoTable: infoTable()
    });
});

function infoTable() {
  var regl = JSON.parse(fs.readFileSync('//kopt-app-01/com/cmd/regl.json'));

  return ' \
  <div><span class="r-cell">INFOTABLE-1</span><span class="r-cell">OK</span></div> \
  <div><span class="r-cell">INFOTABLE-2</span><span class="r-cell">OK</span></div> \
  <div><span class="r-cell">INFOTABLE-3</span><span class="r-cell">ERR</span></div> \
  ';
}

function _tStamp(tm) {
    return '<div style="white-space:nowrap;">'+tm.toLocaleDateString() + "&nbsp;" + tm.toLocaleTimeString()+'</div>';
}

router.get('/settings', function (req, res, next) {
    res.render('settings', { title: 'Express' });
});


router.get('/params', function (req, res, next) {
    res.render('params', { title: 'Express' });
});


router.get('/customers', function (req, res, next) {
    res.render('customers', { title: 'Express' });
});


module.exports = router;
//// *** *** *** ////
function dump_rows(cmd) {
    cmd.addListener('row', function (r) { console.dir(r); });
}

function getRowsFromTable() {
    my.auth('db1cprod', 'v8', 'G0bl1n76');
    var tt = my.query('select * from `upload_settings_chg_proto`;');
    return tt;
}
//dump_rows(getRowsFromTable());
