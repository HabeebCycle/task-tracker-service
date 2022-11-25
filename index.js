const express = require("express");

const app = express();

const PORT = 5500;

const students = [
  { name: "Habeeb", email: "habeeb@habeeb.com" },
  { name: "Rasheedat", email: "rasheedat@habeeb.com" },
];

app.get("/students", (req, res) => res.json(students));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
