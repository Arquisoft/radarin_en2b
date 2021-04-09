import React, { useState } from "react";
import { getUserById } from "../api/api";
import { useSession } from "@inrupt/solid-ui-react";
import { List } from "@solid/react";

const Notifications = () => {
    const { session } = useSession();
    const user = getUserById(session.info.webId);
    const [coords, setCoords] = useState("");

    getUserById(user.then(function (result) {
        setCoords(result.location.coordinates);
    }));


    return (<div>
        <h3 align="center">Right now you are in {coords}</h3>
        <h3>All friends</h3>
        <List src="[https://uo270803.inrupt.net/profile/card#me].friends.firstName" />
    </div>
    );
};

export default Notifications;