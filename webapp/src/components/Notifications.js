import React, { useState } from 'react';
import { getNearbyFriends, getUserById } from '../api/api';
import { useSession } from '@inrupt/solid-ui-react';

const Notifications = () =>{
    const {session} = useSession();
    const user = getUserById(session.info.webId);
    const [coords, setCoords] = useState("");
    getUserById(user.then(function (result){
        setCoords(result.location.coordinates);
    }));

    return(<h3 align="center">Right now you are in {coords}</h3>)
}

export default Notifications