const storage = require("../db/storage");
const router = require("express").Router();

// a get route for notes in our internal api
router.get("/notes", (req, res) => {
storage 
.getNotes()
.then((notes) => {
  return res.json(notes);
}).catch((err) => res.status(500).json(err));
});

// post route for notes
router.post("/notes", (req, res) => {
storage
.addNote(req.body)
.then((note) => res.json(note))
.catch((err) => res.status(500).json(err))
});

router.delete("/notes/:id", (req, res) => {
  storage
  .removeNote(req.params.id)
  .then(() => res.json({ ok: true}))
  .catch((err) => res.status(500).json(err))

});

module.exports = router;
