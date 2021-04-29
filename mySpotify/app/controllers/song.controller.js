const db = require("../models");
const Song = db.songs;
const Op = db.Sequelize.Op;


// Create and Save a new Song
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) return res.status(400).send({ message: "Content can not be empty!" });
  // if (!req.body.name) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a Song
  const song = {
    name         : req.body.name,
    duration     : req.body.duration     ? req.body.duration     : 0,
    genre_id     : req.body.genre_id     ? req.body.genre_id     : 0,
    disc_number  : req.body.disc_number  ? req.body.disc_number  : 1,
    track_number : req.body.track_number ? req.body.track_number : 1,
    uri          : req.body.uri          ? req.body.uri          : "",
    popularity   : req.body.popularity   ? req.body.popularity   : 0
  };

  // Save Song in the database
  Song.create(song)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the song." }));
};


// Retrieve all Songs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Song.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while retrieving songs." }));
};


// Find a single Song with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Song.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving song with id=" + id }));
};


// Update a Song by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Song.update(req.body, { where: { id: id } })
    .then(num => {
      if (num === 1)
        res.send({ message: "Song was updated successfully." })
      else
        res.send({ message: `Cannot update song with id=${id}. Song was not found or req.body is empty!` })
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Song with id=" + id }));
};


// Delete a Song with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Song.destroy({ where: { id: id } })
    .then(num => {
      if (num === 1)
        res.send({ message: "Song was deleted successfully!" });
      else
        res.send({ message: `Cannot delete song with id=${id}. Song was not found!` });
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Song with id=" + id }));
};


// Delete all Songs from the database.
exports.deleteAll = (req, res) => {
  Song.destroy({
    where: {},
    truncate: false
  })
    .then(nums => res.send({ message: `${nums} Songs were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Songs." }));
};


// find all Songs of Genre
exports.findAllgenre = (req, res) => {
  Song.findAll({ where: { genre_id: true } })
      .then(data => res.send(data))
      .catch(err => res.status(500)
          .send({ message: err.message || "Some error occurred while retrieving Songs of the Genre ID =." }));
};


// find all Songs of Artist
exports.findAllartist = (req, res) => {
  Song.findAll({ where: { artist_id: true } })
      .then(data => res.send(data))
      .catch(err => res.status(500)
          .send({ message: err.message || "Some error occurred while retrieving Songs of the Artist ID =." }));
};


// find all Songs of Album
exports.findAllalbum = (req, res) => {
  Song.findAll({ where: { album_id: true } })
      .then(data => res.send(data))
      .catch(err => res.status(500)
          .send({ message: err.message || "Some error occurred while retrieving Songs of the Album ID =." }));
};


