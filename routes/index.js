/* global tt */
var express = require('express');
var router = express.Router();
var fs = require("fs");
var Iconv = require('iconv-lite');
//var cnf = require('../config');
var path = require('path');

var debug = require('debug');

/* GET home page. */
router.get('/', function (req, res, next) {
    debug('warning!!');
    var cnf = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/config.json'), 'utf-8'));
    var stage = req.query.ws || '1';
    var content = function () {
        var text = new Array();
        if (stage == '1') {
            var fileLog = path.join(cnf.bsdir, 'dt23/23_b2out_mc_bnu.log');
            var ctime = fs.statSync(fileLog).ctime;
            if (!ctime) {
                var translated = "Файл " + fileLog + " недоступен";
            } else {
                var translated = Iconv.decode(fs.readFileSync(fileLog), 'windows1251');
                if (!translated) {
                    translated = "Не удалось прочитать логфайл `" + fileLog + "`";
                }
            }
            text.push([_tStamp(ctime), '1cKucy', translated]);
        } else if (stage == '2') {
            var today = new Date();
            text.push([_tStamp(today), 'initialized ok']);
        } else if (stage == '3') {

            var ibs_re = '';
            for (var key in cnf.w_ib) {
                ibs_re += '|' + cnf.w_ib[key];
            }
            // для массива:
            // workIBs.w_ib.forEach(function (val) {
            //     ibs_re += '|' + val;
            // });
                
            ibs_re = ibs_re.substr(1);
            // var logFiles = [];
            var files = fs.readdirSync(path.join(cnf.bsdir, 'log'));

            var re = RegExp('^.*(' + ibs_re + ')\.dt.*$', 'i');
            files.forEach(function (fn, index, next) {

                if (re.test(fn)) {
                    var logFile = path.join(cnf.bsdir, 'log', fn);
                    console.log(' >>> ', logFile);
                    var ct = fs.statSync(logFile).ctime;

                    var reg = RegExp('out_(.*)\.dt.*$', 'i');
                    var ib = reg.exec(fn);
                    var translated = Iconv.decode(fs.readFileSync(logFile), 'windows1251');
                    text.push([_tStamp(ct), ib[1], translated]);

                }
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
    var fn = '//kopt-app-01/com/cmd/regl.json';
    var plText = fs.readFileSync(fn, 'utf-8');

    if (plText.charCodeAt(0) == '65279') plText = plText.substr(1);
    var regl = JSON.parse(plText);
    var today = '&nbsp;&nbsp;[ ' + regl.Today.substring(0, 10) + ' ]&nbsp;&nbsp;';
    var infoTable = '<table class="tbl-regl-total">';
    regl.Result.forEach(function (val, ind, next) {
        infoTable += '<tr class="table-row"> \
                <td class="r-cell r-ib">' + val.wib + '</td> \
                <td class="r-cell">' + val.oko + '</td> \
                <td class="r-cell r-ib">' + val.cib + '</td> \
                <td class="r-cell">' + val.oki + '</td> \
                </tr>';
    });
    return infoTable + '</table><div id="date-regl">' + today + '</div>';
}

function _tStamp(tm) {
    return '<div style="white-space:nowrap;">' + tm.toLocaleDateString() + "&nbsp;" + tm.toLocaleTimeString() + '</div>';
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
