import { useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { getTagLocations, deleteTagLocation, addTagLocation } from "../services/crudPod";
import { ListGroup, InputGroup, FormControl, Table } from "react-bootstrap";
import { Button } from "@material-ui/core";
import lupa from "../img/lupa.png";

const MyTags = () => {
    const { session } = useSession();
    const [tags, setTags] = useState([]);
    const [searchValue, setSearchValue] = useState();

    var listItems = [];
    var searchItems = [];

    async function onClickFunction(){
        navigator.geolocation.getCurrentPosition(async function (position) {
            var name = document.getElementById("name").value;
            var aux = name.replace(/\s/g, "").length;
            var description = document.getElementById("description").value;
            if(name !== "" && aux > 0){
                await addTagLocation(session.info.webId, name, description, position.coords.latitude, position.coords.longitude);
            }
            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
        });
    }

    function search(){
        var searchValue = document.getElementById("search").value;
        setSearchValue(searchValue);
        document.getElementById("search").value = "";
    }

    getTagLocations(session.info.webId).then((list) => setTags(list));
    tags.forEach((tag) => {
        var splited = tag.split(", ");
        listItems.push(<tr>
            <td style={{ textAlign: "center" }}>{splited[0] + " - " + splited[1]}</td>
            <td>{splited[4]}</td>
            <td>{splited[2] + ", " + splited[3]}</td>
            <td><Button variant="contained" onClick={ () => { deleteTagLocation(session.info.webId, tag); /*setChange(true); /*setMarkers([]);*/ }}>Delete</Button></td>
        </tr>);
        if(searchValue !== undefined && (splited[0].toLowerCase() === searchValue.toLowerCase() || splited[0].toLowerCase().includes(searchValue.toLowerCase()))){
            searchItems.push(<tr>
                <td style={{ textAlign: "center" }}>{splited[0] + " - " + splited[1]}</td>
                <td>{splited[4]}</td>
                <td>{splited[2] + ", " + splited[3]}</td>
            </tr>);
        }
    });

    return (<div class="bigcenter">
        <div class="contenedor">
        <h2>Create a tag location</h2>
        <div>
            <ListGroup horizontal>
                <ListGroup.Item>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl
                                placeholder="Tag's name"
                                aria-label="Tag's name"
                                aria-describedby="basic-addon1"
                                id="name"
                            />
                    </InputGroup>
                </ListGroup.Item>
                <ListGroup.Item style={{ minWidth: "750px"}}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon2">Description (optional)</InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl
                                placeholder="Tag's description"
                                aria-label="Tag's description"
                                aria-describedby="basic-addon2"
                                id="description"
                            />
                    </InputGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button style={{ background: "rgb(194, 194, 194)" }} id="saveTagLocation" onClick={ () => onClickFunction() }>Save tag location</Button>
                </ListGroup.Item>
            </ListGroup> 
        </div>
        </div>
        <div class="contenedor">
        <h2>Tag locations list</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        Tag name and description
                    </th>
                    <th>
                        Creation date and time
                    </th>
                    <th>
                        Coordinates
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
        <div class="contenedor">
        <h2>Search tags</h2>
        <div>
            <ListGroup horizontal>
                <ListGroup.Item style={{ borderColor: "white" }}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">Search</InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl
                                placeholder="Search by tag's name"
                                aria-label="Search by tag's name"
                                aria-describedby="basic-addon3"
                                id="search"
                            />
                    </InputGroup>
                </ListGroup.Item>
                <ListGroup.Item style={{ borderColor: "white" }}>
                    <Button onClick={ () => search() }>
                        <img src={lupa} alt="submitSearch"
                                width="30px"
                                height="30px"
                                className="Search d-inline-block align-top"
                        />
                    </Button>
                </ListGroup.Item>
            </ListGroup> 
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        Tag name and description
                    </th>
                    <th>
                        Creation date and time
                    </th>
                    <th>
                        Coordinates
                    </th>
                </tr>
            </thead>
            <tbody>
                {searchItems}
            </tbody>
        </Table>
        </div>
    </div>);
}
export default MyTags;