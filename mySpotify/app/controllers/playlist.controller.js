const db = require("../models");
const Playlist = db.playlists;
const Op = db.Sequelize.Op;


// Create and Save a new Playlist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) return res.status(400).send({ message: "Content can not be empty!" });
  // if (!req.body.name) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a Playlist
  const playlist = {
    name      : req.body.name,
    creator_id: req.body.creator_id ? req.body.creator_id : 0,
  };

  // Save Playlist in the database
  Playlist.create(playlist)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the playlist." }));
};


// Retrieve all Playlists from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Playlist.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while retrieving playlists." }));
};


// Find a single Playlist with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Playlist.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving playlist with id=" + id }));
};


// Update a Playlist by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Playlist.update(req.body, { where: { id: id } })
    .then(num => {
      if (num === 1)
        res.send({ message: "Playlist was updated successfully." })
      else
        res.send({ message: `Cannot update playlist with id=${id}. Playlist was not found or req.body is empty!` })
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Playlist with id=" + id }));
};


// Delete a Playlist with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Playlist.destroy({ where: { id: id } })
    .then(num => {
      if (num === 1)
        res.send({ message: "Playlist was deleted successfully!" });
      else
        res.send({ message: `Cannot delete playlist with id=${id}. Playlist was not found!` });
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Playlist with id=" + id }));
};


// Delete all Playlists from the database.
exports.deleteAll = (req, res) => {
  Playlist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => res.send({ message: `${nums} Playlists were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Playlists." }));
};


// Find all Playlists of Creator
exports.findAllcreator = (req, res) => {
  Playlist.findAll({ where: { creator_id: true } })
      .then(data => res.send(data))
      .catch(err => res.status(500)
          .send({ message: err.message || "Some error occurred while retrieving Playlists by Creator ID" }));
};


// Todo:
// 1. Add song to playlist
// 2. Remove song from playlist
// 3. ? Add album (all songs from album) to playlist ?



