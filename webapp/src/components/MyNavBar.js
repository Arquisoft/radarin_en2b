import React, {
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

/*import FriendList from './FriendList';*/
import MyLocations from "./MyLocations";
import Amigos from './Amigos';
import AboutUs from './AboutUs';
import Home from './Home';
import Notifications from './Notifications';
import MapView from './MapView';
import AdminManageUsers from './AdminManageUsers';
import {  LogoutButton,useSession  } from '@inrupt/solid-ui-react';
import { updateUserLocation, addUser, getUserById } from '../api/api';

const MyNavBar = () => {
    const { session } = useSession();
    const [webId] = useState(session.info.webId);
    const [role, setRole] = useState(null);

    useEffect(() => {
            if(role == null){
                navigator.geolocation.getCurrentPosition(async function (position) {
                    await addUser(webId, { type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] }, webId);
                    await getUserById(webId).then((user) => setRole(user.role));
               });
            }else{
                const interval = setInterval(() => {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        updateUserLocation(webId, { type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] });
                   });
                }, 30000);
                return () => clearInterval(interval);
            }
    }, [role, webId]);

    return (<Router>
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
                            <Nav className="mr-auto justify-content-center" fill>
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
                                <Link to="/aboutUs">
                                <Navbar.Brand>
                                    About us
                                </Navbar.Brand>
                                </Link>
                                <Navbar.Text>Logged in as {webId}</Navbar.Text>
                                <Nav.Item>
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
                            <Amigos />
                        </Route>
                        <Route path="/adminManageUsers">
                            <AdminManageUsers />
                        </Route>
                        <Route path="/aboutUs">
                            <AboutUs />
                        </Route>
                        <Route path="/notifications">
                            <Notifications />
                        </Route>
                        <Route path="/map">
                            <MapView />
                        </Route>
                        <Route path="/myLocations">
                            <MyLocations />
                        </Route>
                    </Switch>
            </Router>);
}
export default MyNavBar;