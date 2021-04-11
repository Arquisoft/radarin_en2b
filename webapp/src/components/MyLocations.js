import React, {useEffect, useState} from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { getLocations } from "../services/crudPod";



const MyLocations = () => {
    const [locations, setLocations] = useState([]);
    const { session } = useSession();
    useEffect (() =>{
        getLocations(session.info.webId).then((list) => 
            setLocations(list)
        )
    });

    var listItems = []
    locations.forEach(location => listItems.push(<li>{location} <p><a href={location}>eliminar</a></p></li>))


    return <div>
        <ul>{listItems}</ul>
    </div>

}

export default MyLocations