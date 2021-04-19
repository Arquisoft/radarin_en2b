import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { getLocations, deleteLocation, getAddress } from "../services/crudPod";
import Table from "react-bootstrap/Table";
import { Button } from "@material-ui/core"


const MyLocations = () => {
    //const [locations, setLocations] = useState([]);
    const { session } = useSession();
    const [addresses, setAddresses] = useState(new Set());


    useEffect(() => {
        async function fetchLocations() {
            const locations = await getLocations(session.info.webId);
            setAddresses(await locations.map(async function (location) {
                const splited = await location.split(", ")
                const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + splited[0] + ',' + splited[1] + '&sensor=true&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY')
                const json = await res.json();
                const results = await json.results
                const addr = await results[1].formatted_address
                await console.log(addr)
                return await <tr>
                <td>{addr}</td>
                <td>{splited[2]}</td>
                <td><Button variant="contained" data-testid={session.info.webId} onClick={() => deleteLocation(session.info.webId, location)}>Delete</Button></td>
                </tr>;
            }))
        }

        fetchLocations()
    }, [setAddresses]);

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
                {console.log(addresses[0])}
                {addresses[0]}
                {addresses[1]}
            </tbody>
        </Table>
    </div>

}

export default MyLocations