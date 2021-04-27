import {
    useState, useEffect
} from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../logo.svg";
import bell from "../img/bell.png";
import friends from "../img/friends.png";
import map from "../img/map.png";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import FriendList from "./FriendList";
import MyLocations from "./MyLocations";
import AboutUs from "./AboutUs";
import Home from "./Home";
import MapView from "./MapView";
import AdminManageUsers from "./AdminManageUsers";
import { LogoutButton, useSession } from "@inrupt/solid-ui-react";
import { updateUserLocation, addUser, getUserById } from "../api/api";
import { getName } from "../services/crudPod";
import { addLocation, getFriends } from "../services/crudPod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNearbyFriends } from "../api/api";
import MyTags from "./MyTags";
import TagsMap from "./TagsMap";
import LocationsMap from "./LocationsMap";

const MyNavBar = () => {
    const { session } = useSession();
    const [webId] = useState(session.info.webId);
    const [name, setName] = useState("");
    const [role, setRole] = useState(null);

    const notifyFriend = (friend) => toast(friend + " is near you");

    useEffect(() => {
        getName(webId).then((name) => setName(name))
        navigator.geolocation.getCurrentPosition(async function (position) {
            let friends = await getFriends(webId).then(function (list) {
                return list;
            });
            var friendsWithWebId = [];
            friends.forEach((friend) => friendsWithWebId.push({ webId: friend + "/profile/card#me" }));
            const nearby = await getNearbyFriends({ type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] }, friendsWithWebId);
            nearby.forEach((friend) => notifyFriend(friend.webId));
        });

        if (role == null) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                await addUser(webId, { type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] }, webId);
                await getUserById(webId).then((user) => setRole(user.role));
                await addLocation(webId, position.coords.latitude, position.coords.longitude);
            });
        } else {
            const interval = setInterval(() => {
                navigator.geolocation.getCurrentPosition(async function (position) {
                    await updateUserLocation(webId, { type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] });
                    await addLocation(webId, position.coords.latitude, position.coords.longitude);
                });
            }, 300000);
            return () => clearInterval(interval);
        }
    }, [role, webId]);

    return (<Router>
        <ToastContainer />
        <Navbar bg="dark" expand="lg" variant="dark">
            <Link to="/">
                <Navbar.Brand>
                    <img src={logo} alt="logo"
                        width="30"
                        height="30"
                        className="App-logo d-inline-block align-top"
                    />{" "}
                    Radarin
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto justify-content-center container-fluid" fill>
                    <Link to="/notifications">
                        <Navbar.Brand>
                            <img src={bell} alt="notifications"
                                width="30"
                                height="30"
                                className="Notifications d-inline-block align-top"
                            />{" "}
                        </Navbar.Brand>
                    </Link>
                    <Link to="/friendList">
                        <Navbar.Brand>
                            <img src={friends} alt="friends"
                                width="30"
                                height="30"
                                className="Friends d-inline-block align-top"
                            />{" "}
                        </Navbar.Brand>
                    </Link>
                    <Link to="/map">
                        <Navbar.Brand>
                            <img src={map} alt="map"
                                width="30"
                                height="30"
                                className="Map d-inline-block align-top"
                            />{" "}
                        </Navbar.Brand>
                    </Link>
                    {(() => {
                        if (role != null && role === "Admin") {
                            return (
                                <Link id="linkAdminManageUsers" to="/adminManageUsers">
                                    <Navbar.Brand>
                                        {" "}
                                        Manage users
                                    </Navbar.Brand>
                                </Link>
                            );
                        }
                    })()}
                    <Link to="/myLocations">
                        <Navbar.Brand>
                            My Locations
                        </Navbar.Brand>
                    </Link>
                    <Link to="/locationMap">
                        <Navbar.Brand>
                            LocationsMap
                        </Navbar.Brand>
                    </Link>
                    <Link to="/myTags">
                        <Navbar.Brand>
                            My Tags
                        </Navbar.Brand>
                    </Link>
                    <Link to="/tagsMap">
                        <Navbar.Brand>
                            TagsMap
                        </Navbar.Brand>
                    </Link>
                    <Link to="/aboutUs">
                        <Navbar.Brand>
                            About us
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Text>Logged in as {name}</Navbar.Text>
                    <Nav.Item className="float-right">
                        <LogoutButton>
                            <Button>Log Out</Button>
                        </LogoutButton>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/friendList">
                <FriendList />
            </Route>
            <Route path="/adminManageUsers">
                <AdminManageUsers />
            </Route>
            <Route path="/aboutUs">
                <AboutUs />
            </Route>
            <Route path="/map">
                <MapView />
            </Route>
            <Route path="/myLocations">
                <MyLocations />
            </Route>
            <Route path="/myTags">
                <MyTags />
            </Route>
            <Route path="/tagsMap">
                <TagsMap webId={session.info.webId} />
            </Route>
            <Route path="/locationMap">
                <LocationsMap webId={session.info.webId} />
            </Route>
        </Switch>
    </Router>);
}
export default MyNavBar;
