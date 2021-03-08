const express = require("express")
const User = require("./models/users")
const router = express.Router()

// Get all users
router.get("user/list", async (req, res) => {
    const users = await User.find({}).sort('webId')
    //console.log(users)
	res.send(users)
})

// Register a new user
router.post("user/add", async (req, res) => {
    let webId = req.body.webId;
    let location = req.body.location;
    let authKey = req.body.authKey;
    //Check if the user is already in the db
    let user = await User.findOne({ webId: webId })
    if (user){
        res.send({error:"Error: This user is already registered"})
    }else{
        user = new User({
            webId: webId,
            location: location,
            authKey: authKey
        })
        await user.save()
        res.send(user)
    }
})

// Submit user's location
router.post("user/location/submit", async (req, res) => {
    let webId = req.body.webId;
    let location = req.body.location;
    let authKey = req.body.authKey;
    //Check if the device is already in the db
    let user = await User.findOne({ webId: webId })
    if (user){
        user.location = location
        console.log("User's location updated")     
    }
    // an else is not needed because when a user signs up (/user/add)
    // the user is created and the location is saved
    await user.save()
    res.send(user)
})

// Find the user's friends that are near
router.post("user/location/near", async (req, res) => {
    let userLocation = req.body.userLocation;
    let userFriends = req.body.friends; // subcollection of User
    let userNearByFriends = await userFriends.find({ location: {
                                                    $near: userLocation,
                                                    $minDistance: 10, // meters
                                                    $maxDistance: 100
                                                } 
                                            })
    res.send(userNearByFriends)
})

module.exports = router