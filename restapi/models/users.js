// import the mongoose moduke
const mongoose = require("mongoose")

// import the specific GeoJson
require('mongoose-geojson-schema')

/*
// My mongoose local database 
// to handle initial connection errors
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true}).catch(error => handleError(error));

// to handle errors after initial connection was established, we should listen for error events on the connection.
mongoose.connection.on('error', err => {
    logError(err);
});*/

const schema = mongoose.Schema(
    {
        //_id: mongoose.Schema.Types.ObjectId,
        webId: String,
        location: mongoose.Schema.Types.Point,
        authKey: String
    },
    { timestamps: true } // one hour behind
);

module.exports = mongoose.model("User", schema) // User is a collection
/*
const User = mongoose.model("User", schema);

const doc = new User({ 
    //_id: new mongoose.Types.ObjectId(),
    webId: "asdfghjklñ",
    location: {
        type: "Point",
        coordinates: [43.53573, -5.66152 ]
    }, 
    authKey: "auth123456789"
});

doc.save(function(err) {
    if (err) throw err;
     
    console.log('User succesfully saved.');

    User.find({
    }).sort('webId')
    .exec(function (err, users){
        if (err) throw err;
         
        console.log(users);
    });
});*/