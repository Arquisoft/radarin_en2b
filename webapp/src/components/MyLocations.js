import React, { useEffect, useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { getLocations, deleteLocation } from "../services/crudPod";
import Table from "react-bootstrap/Table";
import { Button } from "@material-ui/core";


const MyLocations = () => {
    const [locations, setLocations] = useState([]);
    const { session } = useSession();
    useEffect(() => {
        getLocations(session.info.webId).then((list) =>
            setLocations(list)
        )
    });


    var listItems = []
    locations.forEach(location => {
        var splited = location.split(", ");
        listItems.push(<tr>
            <td>{splited[0] + ", " +splited[1]}</td>
            <td>{splited[2]}</td>
            <td><Button variant="contained" data-testid={session.info.webId} onClick={ () => deleteLocation(session.info.webId, location)}>Delete</Button></td>
        </tr>);
    }
    );


    return <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        Locations
                    </th>
                    <th>
                        Date and time
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </Table>
    </div>

}

export default MyLocations