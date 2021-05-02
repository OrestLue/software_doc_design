const express = require("express");
const bodyParser = require("body-parser");
const app = express();


// const cors = require("cors");
// app.use(cors({
//     origin: "http://localhost:8081",
//     optionsSuccessStatus: 200
// }));


// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => console.log("Drop and re-sync db."));


// simple route
app.get("/", (req, res) => res.json({ message: "Welcome to Songs Collection" }));


require("./app/routes/album.routes")(app);
require("./app/routes/artist.routes")(app);
require("./app/routes/genre.routes")(app);
require("./app/routes/playlist.routes")(app);
require("./app/routes/song.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Songs Collection Server is running on port ${PORT}`));
