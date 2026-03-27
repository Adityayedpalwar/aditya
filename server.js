const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "portfolio_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// API route
app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const sql = "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [name, email, subject, message], (err) => {
    if (err) return res.status(500).send("Error saving");

    res.send("Message saved successfully!");
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
