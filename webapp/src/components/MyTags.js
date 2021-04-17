import { useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { getTagLocations, deleteTagLocation, addTagLocation } from "../services/crudPod";
import { ListGroup, InputGroup, FormControl, Table } from "react-bootstrap";
import { Button } from "@material-ui/core";
import lupa from "../img/lupa.png";

//import Prueba from "./Prueba";

//import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
//import mapStyles from "./MapStyles.js";

/*
var crd = [];

navigator.geolocation.getCurrentPosition(function position(position){
    crd = position.coords;
});

function Map(){
    return (<GoogleMap defaultZoom={15} //Starting zoom and position
        defaultCenter={{lat: crd.latitude, lng: crd.longitude}}
        defaultOptions={{styles: mapStyles}}>
    </GoogleMap>
    );
};

var WrappedMap = withScriptjs(withGoogleMap(Map));*/

const MyTags = () => {
    const { session } = useSession();
    const [tags, setTags] = useState([]);
    const [searchValue, setSearchValue] = useState();
    //const [markers, setMarkers] = useState([]);
    //const [isOpen, setIsOpen] = useState();
    //const [change, setChange] = useState(true);

    var listItems = [];
    var searchItems = [];

    async function onClickFunction(){
        navigator.geolocation.getCurrentPosition(async function (position) {
            var name = document.getElementById("name").value;
            var aux = name.replace(/\s/g, '').length;
            var description = document.getElementById("description").value;
            if(name !== "" && aux > 0){
                await addTagLocation(session.info.webId, name, description, position.coords.latitude, position.coords.longitude);
                //setChange(true);
                /*WrappedMap = withScriptjs(withGoogleMap(Map));
                markers.push(<Marker icon={{url: "/iconTag.png"}} key={name} position={{lat: position.coords.latitude, lng: position.coords.longitude}} onClick={ () => setIsOpen(true)}>
                    {isOpen && (<InfoWindow onCloseClick={ () => setIsOpen(false) }>
                            <div>
                                <h3>{name}</h3>
                                <h5>{description}</h5>
                            </div>
                        </InfoWindow>)}
                    </Marker>
                );
                setMarkers(markers);
                console.log(markers);*/
            }
            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
        });
    };

    function search(){
        var searchValue = document.getElementById("search").value;
        setSearchValue(searchValue);
        document.getElementById("search").value = "";
    };

    getTagLocations(session.info.webId).then((list) => setTags(list));
    tags.forEach(tag => {
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
        /*if(markers === undefined){
            var markers = [];
            markers.push(<Marker icon={{url: "/iconTag.png"}} key={splited[0]} position={{lat: parseInt(splited[2]), lng: parseInt(splited[3])}} onClick={ () => setIsOpen(true)}>
                {isOpen && (<InfoWindow onCloseClick={ () => setIsOpen(false) }>
                        <div>
                            <h3>{splited[0]}</h3>
                            <h5>{splited[1]}</h5>
                        </div>
                    </InfoWindow>)}
                </Marker>
            );
            setMarkers(markers);
            console.log(markers);
        }*/
    });

    return (<div>
        <h2 style={{ margin: "20px" }}>Create a tag location</h2>
        <div>
            <ListGroup horizontal style={{ margin: "20px" }}>
                <ListGroup.Item style={{ borderColor: "white" }}>
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
                <ListGroup.Item style={{ minWidth: "750px", borderColor: "white" }}>
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
                <ListGroup.Item style={{ borderColor: "white" }}>
                    <Button style={{ background: "rgb(194, 194, 194)" }} id="saveTagLocation" onClick={ () => onClickFunction() }>Save tag location</Button>
                </ListGroup.Item>
            </ListGroup> 
        </div>

        <h3 style={{ margin: "20px" }}>Tag locations list</h3>
        <Table striped bordered hover style={{ margin: "20px" }}>
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

        <h4 style={{ margin: "20px" }}>Search tags</h4>
        <div>
            <ListGroup horizontal style={{ margin: "20px" }}>
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
        <Table striped bordered hover style={{ margin: "20px" }}>
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

        <h5 style={{ margin: "20px" }}>Map</h5>
        <div style={{width: "100vw", height: "90vh", padding: "20px"}}>
            {/*(() => {
                if(change){
                    setChange(false);
                    return ( Prueba() );
                }
            })()*/}
        </div>
    </div>);
};

export default MyTags;