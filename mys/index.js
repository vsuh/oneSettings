var db = require('mysql-native').createTCPClient('mysql');
db.auth('db1cprod', 'v8', 'G0bl1n76');
exports.my = function(){
              db.query('show tables')
                   .on('field', function(f) { console.log("<td>" + f.name + "</td>"); }) 
                   .on('fields_eof', function() { console.log("</tr>\n"); }) 
                   .on('row', function(r) { console.log('<tr><td>' + r[0] + '</td><tr>\n'); }) 
                   .on('end', function() { console.log("</table></body></html>"); })
                   .on('error', function(e) { console.log(e.message); });
    };

function dump_row(row,  formatter)
{
   if (!formatter)
      formatter = function(s) { return s; }

    console.log('<tr>');
    for (var i=0; i < row.length; ++i)
    {
        console.log('<td>' + formatter(row[i]) + '</td>'); 
    }
    console.log('</tr>\n');
}

function dump_query(cmd, formatter)
{

      console.log("<table>\n<tr>");
      cmd
          .on('field', function(f) { console.log('<td>' + f.name + '</td>'); }) 
          .on('fields_eof', function() { console.log('</tr>\n'); }) 
          .on('row', function(r) { dump_row(r, formatter) }) 
          .on('end', function() { console.log('</table>'); })
}



exports.myes = function(){
	console.log('yasha');
};
