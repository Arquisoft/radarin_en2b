import React, {
    useState, useEffect
} from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../logo.svg";
import bell from "../img/bell.png";
import friends from "../img/friends.png";
import map from "../img/mapicon.png";
import Nav from "react-bootstrap/Nav";
import { Button, ButtonGroup } from "react-bootstrap";
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
import { addUser, getUserById } from "../api/api";
import { getName } from "../services/crudPod";
import { addLocation, getFriends } from "../services/crudPod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNearbyFriends } from "../api/api";
import MyTags from "./MyTags";
import TagsMap from "./TagsMap";
import "../NavBar.css";
import { animated } from "react-spring";
import useBoop from "../hooks/useBoop.js";
import LocationsMap from "./LocationsMap";
import Notifications from "./Notifications";
import Prometheus from "./Prometheus";

const MyNavBar = ({ ...boopConfig }) => {
    const { session } = useSession();
    const [webId] = useState(session.info.webId);
    const [name, setName] = useState("");
    const [role, setRole] = useState(null);
    const notifyFriend = (friend) => toast(friend + " is near you");

    const [style, trigger] = useBoop(boopConfig);
    const [style2, trigger2] = useBoop(boopConfig);
    const [style3, trigger3] = useBoop(boopConfig);


    useEffect(() => {

        getName(webId).then((name) => setName(name));
        navigator.geolocation.getCurrentPosition(async function (position) {
            let friends = await getFriends(webId).then(function (list) {
                return list;
            });
            var friendsWithWebId = [];
            await friends.forEach((friend) => friendsWithWebId.push({ webId: friend + "/profile/card#me" }));
            let nearby = await getNearbyFriends({ type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] }, friendsWithWebId).then(function (list) {
                return list;
            });
            await nearby.forEach((friend) => notifyFriend(friend.webId));
        });

        if (role == null) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                await addUser(webId, { type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] });
                await getUserById(webId).then((user) => setRole(user.role));
                await addLocation(webId, position.coords.latitude, position.coords.longitude);
            });
        } else {
            const interval = setInterval(() => {
                navigator.geolocation.getCurrentPosition(async function (position) {
                    await addUser(webId, { type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] });
                    await addLocation(webId, position.coords.latitude, position.coords.longitude);
                    let friends = await getFriends(webId).then(function (list) {
                        return list;
                    });
                    var friendsWithWebId = [];
                    friends.forEach((friend) => friendsWithWebId.push({ webId: friend + "/profile/card#me" }));
                    let nearby = await getNearbyFriends({ type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] }, friendsWithWebId).then(function (list) {
                        return list;
                    });
                    await nearby.forEach((friend) => notifyFriend(friend.webId));
                });
            }, 120000);
            return () => clearInterval(interval);
        }
    }, [role, webId]);
    return (
        <Router>
            <ToastContainer />
            <div className="grad">
                <Navbar variant="dark">
                    <Link to="/" className="otherLink" >
                        <Navbar.Brand>
                            <img src={logo} alt="logo"
                                className="App-logo d-inline-block align-top"
                            />
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto justify-content-center container-fluid" fill>
                            <Link to="/" className="otherLink" >
                                <Navbar.Brand>
                                    Radarin
                                </Navbar.Brand>
                            </Link>
                            <Nav className="mr-auto">
                                {(() => {
                                    if (role === null || role !== "Admin") {
                                        return (
                                            <React.Fragment>
                                                <Link data-testid="link-notifications" to="/notifications">
                                                    <Navbar.Brand>
                                                        <animated.span onMouseEnter={trigger} style={style}>
                                                            <img src={bell} alt="notifications"
                                                                width="30"
                                                                height="30"
                                                                className="Notifications d-inline-block align-top"
                                                            />{" "}
                                                        </animated.span>
                                                    </Navbar.Brand>
                                                </Link>
                                                <Link data-testid="link-friend-list" to="/friendList">
                                                    <Navbar.Brand>
                                                        <animated.span onMouseEnter={trigger2} style={style2}>
                                                            <img src={friends} alt="friends"
                                                                width="30"
                                                                height="30"
                                                                className="Friends d-inline-block align-top"
                                                            />{" "}
                                                        </animated.span>
                                                    </Navbar.Brand>
                                                </Link>
                                                <Link data-testid="link-map" to="/map">
                                                    <Navbar.Brand>
                                                        <animated.span onMouseEnter={trigger3} style={style3}>
                                                            <img src={map} alt="map"
                                                                width="30"
                                                                height="30"
                                                                className="Map d-inline-block align-top"
                                                            />{" "}
                                                        </animated.span>
                                                    </Navbar.Brand>
                                                </Link>
                                                <Navbar.Brand>
                                                    <ButtonGroup aria-label="Basic example">
                                                        <Button variant="link"><Link data-testid="link-my-locations" to="/myLocations" className="otherLink">My Locations</Link></Button>
                                                        <Button variant="link"><Link data-testid="link-my-tags" to="/myTags" className="otherLink">My Tags</Link></Button>
                                                        <Button variant="link"><Link data-testid="link-tags-map" to="/tagsMap" className="otherLink">Tags Map</Link></Button>
                                                        <Button variant="link"><Link data-testid="link-locations-map" to="/locationMap" className="otherLink">Locations Map</Link></Button>
                                                        <Button variant="link"><Link data-testid="link-about-us" to="/aboutUs" className="otherLink">About Us</Link></Button>
                                                    </ButtonGroup>
                                                </Navbar.Brand>
                                            </React.Fragment>
                                        );
                                    }
                                })()}
                                {(() => {
                                    if (role !== null && role === "Admin") {
                                        return (
                                            <React.Fragment>
                                                <Link id="linkAdminManageUsers" to="/adminManageUsers">
                                                    <Navbar.Brand>
                                                        Manage users
                                                    </Navbar.Brand>
                                                </Link>
                                                <Link id="linkPrometheus" to="/prometheus">
                                                    <Navbar.Brand>
                                                        Prometheus
                                                    </Navbar.Brand>
                                                </Link>
                                                <Link id="linkGrafana" to="" onClick={() => { window.open("https://radarinen2bgrafana.herokuapp.com/", "_blank"); }}>
                                                    <Navbar.Brand>
                                                        Grafana
                                                    </Navbar.Brand>
                                                </Link>
                                            </React.Fragment>
                                        );
                                    }
                                })()}
                            </Nav>
                            <div className="mr-sm-2">
                                <Navbar.Text className="loggedText">Logged in as {name ? name : webId}</Navbar.Text></div>
                            <Nav.Item>
                                <LogoutButton>
                                    <Button variant="dark">Log Out</Button>
                                </LogoutButton>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/friendList">
                    <FriendList />
                </Route>
                <Route path="/map">
                    <MapView activeProfile={session.info.webId} />
                </Route>
                <Route path="/myLocations">
                    <MyLocations />
                </Route>
                <Route path="/locationMap">
                    <LocationsMap webId={session.info.webId} />
                </Route>
                <Route path="/myTags">
                    <MyTags />
                </Route>
                <Route path="/tagsMap">
                    <TagsMap webId={session.info.webId} />
                </Route>
                <Route path="/adminManageUsers">
                    <AdminManageUsers />
                </Route>
                <Route path="/notifications">
                    <Notifications webId={webId} />
                </Route>
                <Route path="/prometheus">
                    <Prometheus />
                </Route>
                <Route path="/aboutUs">
                    <AboutUs />
                </Route>
            </Switch>
        </Router>
    );
};

export default MyNavBar;
