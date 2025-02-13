const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  database: 'week6',
});

const express = require('express')
const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM `tbl_user`',
        function (err, results, fields) {
          res.json(results);
        }
      );
});
app.get('/:id', (req, res) => {
    connection.query(
        'SELECT * FROM `tbl_user`WHERE id ='+ req.params.id,
        function (err, results, fields) {
          res.json(results);
        }
      );
});
app.post('/', (req, res) => {
    const data = req.body;
    //res.send(`INSERT INTO tbl_user (fname, lname, status)
       // VALUES ('${dataq.fname}', '${data.lname}','1')`)
        connection.query(
            `INSERT INTO tbl_user (fname, lname, status)
            VALUES ('${data.fname}', '${data.lname}', '1')`,
    function (err, results, fields) {
res.json(results);
    }
    );
})
  app.delete('/:id', (req, res) =>{
    connection.query(
        `UPDATE tbl_user SET status = 0 WHERE ID = ${req.params.id}`,
        function (err, results, fields) {
            res.json(results);
        }
    );
  })

  app.put('/', (req, res) => {
    const data = req.body;

    // ตรวจสอบข้อมูลที่ได้รับ
    if (!data.fname || !data.lname) {
        return res.status(400).json({ error: 'First name and last name are required' });
    }

    // ใช้ query แบบ parameterized เพื่อหลีกเลี่ยง SQL Injection
    const query = 'INSERT INTO tbl_user (fname, lname, status) VALUES (?, ?, ?)';
    connection.query(query, [data.fname, data.lname, '1'], function (err, results, fields) {
        if (err) {
            res.status(500).json({ error: 'Database query failed' });
            return;
        }
        res.json(results);
    });
});
app.listen(port, () => {
    console.log('Server is running on port :', port);
})