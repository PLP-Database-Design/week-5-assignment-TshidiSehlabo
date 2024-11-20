const express = require("express");
const app = express();
require("dotenv").config();
const mysql = require("mysql2");

// Middleware
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database");
  }
});

//question1

app.get("/patients", (req, res) => {
  const query =
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving patients:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

//question2
app.get("/providers", (req, res) => {
  const query =
    "SELECT first_name, last_name, provider_specialty FROM providers";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving providers:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

//question3
app.get("/patients/:firstName", (req, res) => {
  const { firstName } = req.params;
  const query =
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?";
  db.query(query, [firstName], (err, results) => {
    if (err) {
      console.error("Error filtering patients:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

//question4
app.get("/providers/specialty/:specialty", (req, res) => {
  const { specialty } = req.params;
  const query =
    "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";
  db.query(query, [specialty], (err, results) => {
    if (err) {
      console.error("Error retrieving providers by specialty:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

// listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
