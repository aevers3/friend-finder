// Dependencies
var express = require("express");
var path = require("path");

// Express setup
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Router
const apiRoutes = require('./app/routing/apiRoutes');
apiRoutes(app);
const htmlRoutes = require('./app/routing/htmlRoutes');
htmlRoutes(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  