import { useCallback, useEffect, useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { getLocations, deleteLocation } from "../services/crudPod";
import {Table, Button} from "react-bootstrap";
 
const MyLocations = () => {
    const [locations, setLocations] = useState([]);
    const { session } = useSession();
 
    // https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
    const updateTable = useCallback(() => {
        getLocations(session.info.webId).then((list) =>
            setLocations(list)
        );
    }, [session.info.webId]);
 
    useEffect(() => {
        updateTable();
    }, [updateTable]);
 
    var listItems = [];
    locations.forEach((location) => {
        var splited = location.split(", ");
        listItems.push(<tr>
            <td>{splited[0] + ", " +splited[1]}</td>
            <td>{splited[2] + (splited.length === 4 ? " "+splited[3] : "")}</td>
            <td><Button variant="info" data-testid={session.info.webId} onClick={ async () => {await deleteLocation(session.info.webId, location); updateTable();}}>Delete</Button></td>
        </tr>);
    });
 
    const handleDeleteAll = async () => {
        await Promise.all(locations.map(async (location) => 
            deleteLocation(session.info.webId, location)
        ));
        updateTable();
    }
 
    return (<div className="bgcenter"   style={{borderStyle: "solid",
    borderRadius: "3em",
    borderColor: "black",
    padding: "2em"}}>
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
                {listItems}
            </tbody>
        </Table>
    </div>);
}
export default MyLocations;