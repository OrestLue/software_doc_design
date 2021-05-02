module.exports = app => {
  const genre = require("../controllers/genre.controller.js");

  let router = require("express").Router();

  // Create a new Genre
  router.post("/", genre.create);

  // Retrieve all Genres
  router.get("/", genre.findAll);

  // Retrieve a single Genre with id
  router.get("/:id", genre.findOne);

  // Update a Genre with id
  router.put("/:id", genre.update);

  // Delete a Genre with id
  router.delete("/:id", genre.delete);

  // Delete all Genres
  router.delete("/", genre.deleteAll);

  app.use('/api/genre', router);
};
