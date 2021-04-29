const db = require("../models");
const Album = db.albums;
const Op = db.Sequelize.Op;


// Create and Save a new Album
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) return res.status(400).send({ message: "Content can not be empty!" });
  // if (!req.body.name) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a Album
  const album = {
    name         : req.body.name,
    release_date : req.body.release_date ? req.body.release_date : 0,
    uri          : req.body.uri          ? req.body.uri          : "",
  };

  // Save Album in the database
  Album.create(album)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the album." }));
};


// Retrieve all Albums from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Album.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while retrieving albums." }));
};


// Find a single Album with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Album.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving album with id=" + id }));
};


// Update a Album by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Album.update(req.body, { where: { id: id } })
    .then(num => {
      if (num === 1)
        res.send({ message: "Album was updated successfully." })
      else
        res.send({ message: `Cannot update album with id=${id}. Album was not found or req.body is empty!` })
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Album with id=" + id }));
};


// Delete a Album with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Album.destroy({ where: { id: id } })
    .then(num => {
      if (num === 1)
        res.send({ message: "Album was deleted successfully!" });
      else
        res.send({ message: `Cannot delete album with id=${id}. Album was not found!` });
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Album with id=" + id }));
};


// Delete all Albums from the database.
exports.deleteAll = (req, res) => {
  Album.destroy({
    where: {},
    truncate: false
  })
    .then(nums => res.send({ message: `${nums} Albums were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Albums." }));
};


// Todo: Find all Albums of Artist
// exports.findAllartist = (req, res) => {
//   Album.findAll({ where: { artist_id: true } })
//       .then(data => res.send(data))
//       .catch(err => res.status(500)
//           .send({ message: err.message || "Some error occurred while retrieving Albums of the Artist ID =." }));
// };




