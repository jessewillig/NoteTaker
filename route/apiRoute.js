const express = require("express");
const app = express.Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { json, response } = require("express");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parseNote = JSON.parse(data);
        res.send(parseNote);
      }
    });
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
      const parseNote = JSON.parse(data);
      const mergeNote = [...parseNote, newNote];
      const userNote = JSON.stringify(mergeNote);
      fs.watchFile(
        path.join(__dirname, "../db/db.json"),
        userNote,
        (err, response) => {
          if (err) throw err;
          res.json({ ok: true });
        }
      );
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) throw err;
      let userNote = [];
      data = JSON.parse(data);
      for (i = 0; i < data.length; i++) {
        if (data[i].id !== req.params.id) {
          userNote.push(data[i]);
        }
      }
      userNote = JSON.stringify(userNote);
      fs.watchFile(
        path.join(__dirname, "../db/db.json"),
        userNote,
        (err, response) => {
          if (err) throw err;
          res.json({ ok: true });
        }
      );
    });
  });
};
