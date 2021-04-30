const User = require("./models/users");
const mongoose = require("mongoose");

var mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017/api";

mongoose.connect(mongo_uri, { useNewUrlParser: true,useUnifiedTopology: true }).then(async () => {
    var user = new User({
        webId: process.env.ADMIN_WEBID,
        location: {
            "type": "Point",
            "coordinates": [0.0, 0.0]
        },
        authKey: "unused",
        role: "Admin"
    });
    await user.save();
    process.exit();
});
