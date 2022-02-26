var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ansh@2002",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM employee", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
