import { useCallback, useEffect, useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { getLocations, deleteLocation } from "../services/crudPod";
import { Table, Button } from "react-bootstrap";

const MyLocations = () => {
    const [locations, setLocations] = useState([]);
    const [locationElements, setLocationElements] = useState([]);
    const { session } = useSession();

    // https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
    const updateTable = useCallback(() => {
        getLocations(session.info.webId).then((list) => {
            setLocations(list);
            var listItems = []
            list.forEach(async function (location) {
                var splited = location.split(", ");
                const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + splited[0] + ',' + splited[1]
                    + '&sensor=true&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY');
                const json = await res.json();
                if (typeof json.results[1] !== "undefined") {
                    const addr = json.results[1].formatted_address;
                    listItems.push(<tr>
                        <td>{addr}</td>
                        <td>{splited[2] + (splited.length === 4 ? " " + splited[3] : "")}</td>
                        <td><Button variant="info" data-testid={session.info.webId} onClick={async () => { await deleteLocation(session.info.webId, location); updateTable(); }}>Delete</Button></td>
                    </tr>);
                }
            })
            console.log(listItems.length)
            setLocationElements(listItems);
        });
    }, [session.info.webId]);

    useEffect(() => {
        updateTable();
    }, [updateTable]);

    const handleDeleteAll = async () => {
        await Promise.all(locations.map(async (location) =>
            deleteLocation(session.info.webId, location)
        ));
        updateTable();
    }
    console.log(locationElements.length)
    return (<div className="bgcenter">
        <Button variant="danger" block onClick={handleDeleteAll}>Delete All Locations</Button>
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
                {locationElements}
            </tbody>
        </Table>
    </div>);
}
export default MyLocations;
