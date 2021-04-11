const express = require("express");
const User = require("./models/users");
const router = express.Router();
const async = require("async");

router.use(express.json());

// Basic example
router.get("/", function(req, res) {
    res.send("RestAPI welcome page");
});

// Get a specific user by its webId
router.post("/users/getById", async (req, res) => {
    let webId = req.body.webId;
    let user = await User.findOne({ webId: webId });
	res.json(user);
});

// Delete a specific user by its webId
router.post("/users/removeById", async (req, res) => {
    let webId = req.body.webId;
    let user = await User.deleteOne({ webId: webId });
	res.json(user);
});

// Get all users
router.get("/users/list", async (req, res) => {
    const users = await User.find({}).sort("_id");
	res.json(users);
});

// Get all normal users
router.get("/users/normal/list", async (req, res) => {
    const users = await User.find({ "role": "Normal" }).sort("_id");
	res.json(users);
});

// Register a new user
router.post("/users/add", async (req, res) => {
    let webId = req.body.webId; // supposed to be unique
    let location = req.body.location;
    let authKey = req.body.authKey;
    //Check if the user is already in the db
    let user = await User.findOne({ webId: webId });
    if (user){
        res.send({error: "This user is already registered"});
    }else{
        user = new User({
            webId: webId,
            location: location,
            authKey: authKey
        });
        await user.save();
        res.json(user);
    }
});

// Submit user's location
router.post("/users/location/submit", async (req, res) => {
    let webId = req.body.webId;
    let location = req.body.location;
    //Check if the device is already in the db
    let user = await User.findOne({ webId: webId });
    if (user){
        user.location = location;
        await user.save();
        res.json(user);
    }
    // an else is not needed because when a user firstly signs in (/user/add)
    // the user is created and the location is saved
});

// Find the user's friends that are near
router.post("/users/location/near", async (req, res) => {
    let userLocation = req.body.userLocation;
    let userFriends = req.body.friends; 
    let userNearByFriends = [];
        
    async.each(userFriends, async function(friend) {

                        const near = await User.findOne({
                                                            webId: friend.webId
                                                            , location: {
                                                                            $near: {
                                                                                $geometry: userLocation,
                                                                                $minDistance: 0, // meters
                                                                                $maxDistance: 1000
                                                                            }   
                                                                        }
                                                        });
                                                        
                        if(near != null){
                            console.log(near);
                            userNearByFriends.push(near);
                        }
                        
                    }, async function(err) {
                        if(err) {
                            console.log('A element failed to process', err);
                            res.status(500).json(err);
                        } else {
                            console.log('All elements have been processed successfully');
                            res.status(200).json(userNearByFriends);
                        }

                })
});

module.exports = router;