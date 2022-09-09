const mysql = require('mysql');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = process.nextTick.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

//MYSQL


const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'passwodffrd',
    database        : 'test_nodejs'
    
});

//get infos

app.get('', (req, res) => {

  pool.getConnection((err, connection) => {
    if(err) {console.log(err); return;}
    
    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * from tests', (err, rows) => {
      connection.release() //return the connection to pool

      if(!err){
        res.send(rows)
      } else {
        console.log(err)
      }
    })

  })

})

app.get('/:nome', (req, res) => {

  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * from tests WHERE NOME = ?', [req.params.nome], (err, rows) => {
      connection.release() //return the connection to pool

      if(!err){
        res.send(rows)
      } else {
        console.log(err)
      }
    })

  })

})

//DELETE
app.get('/ciao/:nome', (req, res) => {

  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);

    connection.query('DELETE from tests WHERE NOME = ?', [req.params.nome], (err, rows) => {
      connection.release() //return the connection to pool

      if(!err){
        res.send([req.params.nome] + "eliminato")
      } else {
        console.log(err)
      }
    })

  })

})



/*
var con = mysql.createConnection({
  host: "localhost",
  user: "mysql",
  password: "your_password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connectd!");
});
*/


app.listen(port,() => console.log("LISTEN ON PORT " + port));