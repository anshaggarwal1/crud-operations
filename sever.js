const express = require('express')
const app = express()
const port = 3000
var router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.get('/form', function(req, res, next) { 
  console.log("hello", res)
});
app.get('/', (req, res) => {
  res.render(__dirname+"/index.ejs")
})
app.use(express.urlencoded({extended:false}));
app.use(express.json());

var mysql = require('mysql');
const command = require('nodemon/lib/config/command');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ansh@2002",
  database: "mydb"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Successfully connected to db");
    });



    app.post('/employees', (req, res)=> {
       console.log("form data",req.body);
      });


  // read command
  app.get('/employees', (req, res)=> {
    con.query("SELECT * FROM employee", function (err, result, fields) {
      if (!err){
      res.send(result);
      console.log(req.body);
      }
      else
          console.log("error",err);
    })
    });

    // DELETE command

  app.delete('/employees/:id', (req, res) => {
    con.query('DELETE FROM Employee WHERE ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log("error",err);
    })
});

// insert command
app.post('/add-employees', (req, res) => {
  const data = req.body;
  console.log('body --> ', data);
  const insertQuery = "INSERT INTO EMPLOYEE (name, age) VALUES (?, ?)"
  con.query(insertQuery, [data.name, data.age] ,(err, rows, fields) => {
      if (!err)
          res.send('INSERTED successfully.');
      else
          console.log("error",err);
  })
});

// update command
app.put('/employees/:id', (req, res) => {
  const data = req.body;
  console.log('body --> ', data);
  const updQuery = "UPDATE EMPLOYEE SET name = ?, age = ? where id=?"
  con.query(updQuery, [data.name, data.age , req.params.id],(err, rows, fields) => {
      if (!err)
          res.send("Updated Successfully");
      else
          console.log("error in updating",err);
  })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})