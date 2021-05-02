module.exports = app => {
  const album = require("../controllers/album.controller.js");

  let router = require("express").Router();

  // Create a new Album
  router.post("/", album.create);

  // Retrieve all Albums
  router.get("/", album.findAll);

  // Retrieve a single Album with id
  router.get("/:id", album.findOne);

  // Todo: Retrieve all Albums of Artist
  // router.get("/published", album.findByArtist);

  // Update a Album with id
  router.put("/:id", album.update);

  // Delete a Album with id
  router.delete("/:id", album.delete);

  // Delete all Albums
  router.delete("/", album.deleteAll);

  app.use('/api/album', router);
};
