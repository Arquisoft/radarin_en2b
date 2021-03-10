const mongoose = require("mongoose")
require('mongoose-geojson-schema')

const schema = mongoose.Schema(
    {
        //_id: mongoose.Schema.Types.ObjectId, set by default
        webId: String,
        location: { type: mongoose.Schema.Types.Point }, 
        authKey: String
    },
    { timestamps: true } // one hour behind
);

schema.index( { location: '2dsphere' } );

module.exports = mongoose.model("User", schema) // User is a collection