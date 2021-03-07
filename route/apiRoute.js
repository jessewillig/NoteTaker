const express = require('express');
const app = express.Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { json, response } = require('express');

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
        fs.watchFile(path.join(__dirname, "../db/db.json"), userNote, (error, response) => {
            if (error) throw error;
            res.json({ ok: true });
        })
    })
});