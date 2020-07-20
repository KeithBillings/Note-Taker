const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, '/db/')));
app.use(express.static(path.join(__dirname, '/public/')));

const port = process.env.PORT || 3000;

// routers
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/api/notes', (req,res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

// Saving a note
app.post('/api/notes', (req,res) => {
  let newNote = req.body;
  let notes = JSON.parse(fs.readFileSync(__dirname, '/db/db.json'));

  newNote.id = String(notes.length);

  notes.push(newNote);
  fs.writeFileSync(__dirname+"/db/db.json", JSON.stringify(notes));
  res.json(notes);
});


app.listen(port, () => {
  console.log(`Running on port: ${port}`)
});




// user writes into web browser with data
// take data into variable 1
// fs.readfile of the existing db.json in variable 2
// when user clicks 'save'
// fs.writefile of variable 1 and 2 
