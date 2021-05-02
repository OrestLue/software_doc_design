module.exports = app => {
  const playlist = require("../controllers/playlist.controller.js");

  let router = require("express").Router();

  // Create a new Playlist
  router.post("/", playlist.create);


  // Todo:
  // 1. Add song to playlist
  // 2. Remove song from playlist
  // 3. ? Add album (all songs from album) to playlist ?


  // Retrieve all Playlists
  router.get("/", playlist.findAll);

  // Retrieve a single Playlist with id
  router.get("/:id", playlist.findOne);

  // Find all Playlists of Creator
  router.get("/published", playlist.findByCreator);

  // Update a Playlist with id
  router.put("/:id", playlist.update);

  // Delete a Playlist with id
  router.delete("/:id", playlist.delete);

  // Delete all Playlists
  router.delete("/", playlist.deleteAll);

  app.use('/api/playlist', router);
};
