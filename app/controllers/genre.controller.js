const db = require("../models");
const Genre = db.genre;
const Op = db.Sequelize.Op;


// Create and Save a new Genre
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) return res.status(400).send({ message: "Content can not be empty!" });

  // Create a Genre
  const genre = { name: req.body.name };

  // Save Genre in the database
  Genre.create(genre)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the genre." }));
};


// Retrieve all Genres from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Genre.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while retrieving genre." }));
};


// Find a single Genre with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Genre.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving genre with id=" + id }));
};


// Update a Genre by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Genre.update(req.body, { where: { id: id } })
    .then(num => {
      if (num === 1)
        res.send({ message: "Genre was updated successfully." })
      else
        res.send({ message: `Cannot update genre with id=${id}. Genre was not found or req.body is empty!` })
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Genre with id=" + id }));
};


// Delete a Genre with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Genre.destroy({ where: { id: id } })
    .then(num => {
      if (num === 1)
        res.send({ message: "Genre was deleted successfully!" });
      else
        res.send({ message: `Cannot delete genre with id=${id}. Genre was not found!` });
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Genre with id=" + id }));
};


// Delete all Genres from the database.
exports.deleteAll = (req, res) => {
  Genre.destroy({
    where: {},
    truncate: false
  })
    .then(nums => res.send({ message: `${nums} Genres were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Genres." }));
};


