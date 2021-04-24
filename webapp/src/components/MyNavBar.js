import {
    useState, useEffect
} from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../logo.svg";
import bell from "../img/bell.png";
import friends from "../img/friends.png";
import map from "../img/map.png";
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
import '../Logo.css';
import '../NavBar.css';
import { animated, useSpring } from 'react-spring';
import useBoop from '../hooks/useBoop.js';

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
            friends.forEach(friend => friendsWithWebId.push({ webId: friend + "/profile/card#me" }));
            const nearby = await getNearbyFriends({ type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] }, friendsWithWebId);
            nearby.forEach(friend => notifyFriend(friend.webId))
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
                    await addUser(webId, { type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] }, webId);
                    await addLocation(webId, position.coords.latitude, position.coords.longitude);
                });
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [role, webId]);

    return (<Router>
        <ToastContainer />
        <Navbar bg="dark" variant="dark">
        <Link to="/" class="otherLink" >
            <Navbar.Brand>
                <img src={logo} alt="logo"
                    className="App-logo d-inline-block align-top"
                />    
            </Navbar.Brand>
            </Link>
            <Link to="/" class="otherLink" >
            <Navbar.Brand>
                Radarin
            </Navbar.Brand>
            </Link>
            <Nav className="mr-auto">
                
                    <Link to="/notifications">
                        <Navbar.Brand >
                        <animated.span onMouseEnter={trigger} style={style}>
                            <img src={bell} alt="notifications"
                                width="30"
                                height="30"
                                className="Notifications d-inline-block align-top"
                            />{" "}
                             </animated.span>
                        </Navbar.Brand>
                    </Link>
               
                <Link to="/friendList">
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
                <Link to="/map">
                    <Navbar.Brand href="/map">
                        <animated.span onMouseEnter={trigger3} style={style3}>
                        <img src={map} alt="map"
                            width="30"
                            height="30"
                            className="Map d-inline-block align-top"
                        />{" "}
                        </animated.span>
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
                <Navbar.Brand>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-info"><Link to="/myTags" class="otherLink">My Locations</Link></Button>
                        <Button variant="outline-info"><Link to="/myTags" class="otherLink">My Tags</Link></Button>
                        <Button variant="outline-info"><Link to="/tagsMap" class="otherLink">Tags map </Link></Button>
                        <Button variant="outline-info"><Link to="/aboutUs" class="otherLink">About us</Link></Button>
                    </ButtonGroup>
                </Navbar.Brand>
            </Nav>
            <Navbar.Text className="mr-sm-2">Logged in as {name ? name : webId}</Navbar.Text>
            <Nav.Item>
                <LogoutButton>
                    <Button variant="outline-info">Log Out</Button>
                </LogoutButton>
            </Nav.Item>
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
                <MapView activeProfile={session.info.webId} />
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
        </Switch>
    </Router>);
};

export default MyNavBar;
