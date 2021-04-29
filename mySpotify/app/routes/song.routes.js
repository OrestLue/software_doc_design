module.exports = app => {
  const songs = require("../controllers/song.controller.js");

  let router = require("express").Router();

  // Create a new Song
  router.post("/", songs.create);

  // Retrieve all Songs
  router.get("/", songs.findAll);

  // Retrieve a single Song with id
  router.get("/:id", songs.findOne);

  // Retrieve all Songs by Genre
  router.get("/published", songs.findAllgenre);

  // Retrieve all Songs by Artist
  router.get("/published", songs.findAllartist);

  // Retrieve all Songs by Album
  router.get("/published", songs.findAllalbum);

  // Update a Song with id
  router.put("/:id", songs.update);

  // Delete a Song with id
  router.delete("/:id", songs.delete);

  // Delete all Songs
  router.delete("/", songs.deleteAll);

  app.use('/api/song', router);
};
