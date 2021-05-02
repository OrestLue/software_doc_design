const db = require("../models");
const Artist = db.artist;
const Album  = db.album;
const Song   = db.song;
const Op     = db.Sequelize.Op;

// Create and Save a new Artist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) return res.status(400).send({ message: "Content can not be empty!" });

  // Create a Artist
  const artist = { name: req.body.name };

  // Save Artist in the database
  Artist.create(artist)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the artist." }));
};


// Retrieve all Artists from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Artist.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while retrieving artist." }));
};


// Find a single Artist with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Artist.findByPk(id, { include: [{ model: Album } /*, { model: Song } */] })
    .then(data => {
      data["dataValues"]["albums"].forEach(obj => delete obj["dataValues"]["artist_album"]);
      res.send(data);
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving artist with id=" + id }));
};


// Update a Artist by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Artist.update(req.body, { where: { id: id } })
    .then(num => {
      if (num === 1)
        res.send({ message: "Artist was updated successfully." })
      else
        res.send({ message: `Cannot update artist with id=${id}. Artist was not found or req.body is empty!` })
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Artist with id=" + id }));
};


// Delete a Artist with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Artist.destroy({ where: { id: id } })
    .then(num => {
      if (num === 1)
        res.send({ message: "Artist was deleted successfully!" });
      else
        res.send({ message: `Cannot delete artist with id=${id}. Artist was not found!` });
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Artist with id=" + id }));
};


// Delete all Artists from the database.
exports.deleteAll = (req, res) => {
  Artist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => res.send({ message: `${nums} Artists were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Artists." }));
};


