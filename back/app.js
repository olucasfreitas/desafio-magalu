const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "db_magalu",
  port: 3306,
});

app.post("/sign-in", (request, response) => {
  const { username, password } = request.body;

  db.query(
    "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?",
    [username, password],
    function (err, results) {
      if (err) {
        return response.status(500).json({ error: err });
      }
      if (results.length > 0) {
        return response.status(201).json(results);
      } else {
        return response.status(500).json({ message: "Senha e/ou email errados" });
      }
    }
  );
});

app.listen(8002, () => console.log("Servidor está rodando na porta 8002"));
