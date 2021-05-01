const express = require("express");
const promBundle = require("express-prom-bundle");
const cors = require("cors");
const mongoose = require("mongoose");
const api = require("./api");

function connect(){
    //The MONGO_URI variable is the connection string to MongoDB Atlas (for production). This env variable is created in heroku.
    var mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017/api";
    mongoose.connect(mongo_uri, { useNewUrlParser: true,useUnifiedTopology: true }).then(() => {
        const app = express();

        //Monitoring middleware
        const metricsMiddleware = promBundle({includeMethod: true});
        app.use(metricsMiddleware);

        app.use(cors()); // cross-domain communication will be enabled for the whole app
        //app.options("*", cors());

        app.use(express.json());
        app.use("/api", api);

        app.use( (request, response) => {
            request.header("Access-Control-Allow-Origin", "https://radarinen2bwebapp.herokuapp.com/*");
            request.header("Access-Control-Allow-Origin", "https://radarinen2brestapi.herokuapp.com/*");
            request.header("Access-Control-Allow-Origin", "https://radarinen2bprometheus.herokuapp.com/*");
            request.header("Access-Control-Allow-Origin", "https://radarinen2bgrafana.herokuapp.com/*");
            request.header("Access-Control-Allow-Origin", "https://radarinen2brestapi.herokuapp.com/*");
            request.header("Access-Control-Allow-Origin", "http://localhost:3000/*"); // just for working until the final delivery and all deploy
            request.header("Access-Control-Allow-Origin", "http://localhost:5000/api/*"); // " "
            request.header("GET, POST"); // the other methods are not used in the api
            response.header("Access-Control-Allow-Origin", "https://radarinen2bwebapp.herokuapp.com/*");
            response.header("Access-Control-Allow-Origin", "https://radarinen2brestapi.herokuapp.com/*");
            response.header("Access-Control-Allow-Origin", "https://radarinen2bprometheus.herokuapp.com/*");
            response.header("Access-Control-Allow-Origin", "https://radarinen2bgrafana.herokuapp.com/*");
            response.header("Access-Control-Allow-Origin", "http://localhost:3000/*"); // just for working until the final delivery and all deploy
            response.header("Access-Control-Allow-Origin", "http://localhost:5000/api/*"); // " "
        });

        app.listen(process.env.PORT || 5000);
        // Node server has started running on http://localhost:5000/api
        // Using db in mongodb://localhost:27017/api
    });
}

// Connect to MongoDB database, the wait is for giving time to mongodb to finish loading
setTimeout(connect,5000);