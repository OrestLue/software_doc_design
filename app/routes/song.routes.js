module.exports = app => {
  const song = require("../controllers/song.controller.js");

  let router = require("express").Router();

  // Create a new Song
  router.post("/", song.create);

  // Retrieve all Songs
  router.get("/", song.findAll);

  // Retrieve a single Song with id
  router.get("/:id", song.findOne);

  // Retrieve all Songs by Genre
  router.get("/published", song.findByGenre);

  // Retrieve all Songs of Artist
  router.get("/published", song.findByArtist);

  // Retrieve all Songs of Album
  router.get("/published", song.findByAlbum);

  // Update a Song with id
  router.put("/:id", song.update);

  // Delete a Song with id
  router.delete("/:id", song.delete);

  // Delete all Songs
  router.delete("/", song.deleteAll);

  app.use("/api/song", router);
};
