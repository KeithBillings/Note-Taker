const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/db/')));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// routers
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

// Saving a note
app.post('/api/notes', function (req, res) {
  let newNote = req.body;
  let notes = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf-8'));
  newNote.id = String(notes.length);

  notes.push(newNote);
  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// Deleting a note
app.delete('/api/notes/:id', function (req, res) {
  let notes = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf-8'));
  const deleteNote = notes.filter(item => item.id != req.params.id);

  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(deleteNote));
  res.json(deleteNote);
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`)
});