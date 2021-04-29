module.exports = app => {
  const albums = require("../controllers/album.controller.js");

  let router = require("express").Router();

  // Create a new Album
  router.post("/", albums.create);

  // Retrieve all Albums
  router.get("/", albums.findAll);

  // Retrieve a single Album with id
  router.get("/:id", albums.findOne);

  // Todo: Retrieve all Albums by Artist
  // router.get("/published", albums.findAllartist);

  // Update a Album with id
  router.put("/:id", albums.update);

  // Delete a Album with id
  router.delete("/:id", albums.delete);

  // Delete all Albums
  router.delete("/", albums.deleteAll);

  app.use('/api/album', router);
};
