import React from 'react';
import { getNearbyFriends, getUserById } from '../api/api';
import { useSession } from '@inrupt/solid-ui-react';

const Notifications = () =>{
    const {session} = useSession();

    const {user} = getUserById(session.info.webId);

    console.log(user);

    return(<h1>Notifications</h1>)
}

export default Notifications