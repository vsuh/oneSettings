//var db = require('mysql-native').createTCPClient('mysql');
//db.auth('db1cprod', 'v8', 'G0bl1n76');


var mydb = require('mysql');

// var stages = getPasesList();

exports.phases = function phases() {
    var conn = mydb.createConnection({
        host: "mysql",
        user: "v8",
        password: "G0bl1n76",
        stringifyObjects: true,
        charset: "utf8mb4_general_ci", 
        database: "db1cprod"
    });
    var sql = "SELECT `p_fullName` FROM  `reglResult_phases` ORDER BY  `p_id`;";
    var __ret = [];
    conn.connect(function (err) {
        if (err) {
            console.error('error mysql connecting: ' + err.stack);
            return;
        }
    });
    var query = conn.query(sql);
    query
        .on('error', function (err) {
            console.log(err);
        })
        .on('result', function (row) {
            conn.pause();
            console.log(row.p_fullName);
            __ret.push(row.p_fullName)
            // row.forEach(function (val, i) {
            //     __ret.push(val.p_fullName);
            // });
            conn.resume();
        })
        .on('end', function () { console.log('finish..') })
    ;
    // conn.query(sql, function (err, rows, fields) {
    //     if (err) throw err;
    //     rows.forEach(function (val, i) {
    //         __ret.push(val.p_fullName);
    //     });
    // });
    conn.end();
    console.log(__ret);
    return __ret;
    
} 
 
exports.phasen = function phasen() {
    var conn = mydb.createConnection({
        host: "mysql",
        user: "v8",
        password: "G0bl1n76",
        stringifyObjects: true,
        charset: "utf8mb4_general_ci", 
        database: "db1cprod"
    });
    var sql = "SELECT `p_name` FROM  `reglResult_phases` ORDER BY  `p_id`;";
    var aRet = [];
    conn.connect();
    conn.query(sql, function (err, rows, fields) {
        if (err) throw err;
        rows.forEach(function (val, i) {
            aRet.push(val.p_name);
            console.log(""+i+"  "+val['p_name']);
        });
    });
    conn.end();
    console.log('returnin: '+aRet);
    return aRet;
};


// 
// exports.phases1 = function () {
//     var _phases = ["mom"];
//     db.query("SELECT `p_name` FROM  `reglResult_phases` ORDER BY  `p_id`;")
//         .on('field', function (f) { })
//         .on('fields_eof', function () { })
//         .on('row', function (r) { console.log("rr: " + r.p_name); _phases.push(r.p_name); })
//         .on('end', function () { })
//         .on('error', function (e) { console.log(e.message); }
//             );
//     return _phases;
// };



exports.myes = function myes() {
    console.log('yasha');
    return [ 3, 2, 1 ];
};
