import React, {
    useState
} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.svg';
import bell from '../img/bell.png';
import friends from '../img/friends.png';
import map from '../img/map.png';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import LogIn from './LogIn';
import NearbyFriends from './FriendList';
import AboutUs from './AboutUs';
import Home from './Home';
import Notifications from './Notifications';
import MapView from './MapView';
import { LogoutButton, useSession } from '@inrupt/solid-ui-react';


const MyNavBar = () => {
    const {session} = useSession();
    const [webId] = useState(session.info.webId);

    return (
        <Router>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/">
                                <Navbar.Brand>
                                    <img src={logo} alt="logo"
                                        width="30"
                                        height="30"
                                        className="App-logo d-inline-block align-top"
                                    />{' '}
                                        Radarin
                                </Navbar.Brand>
                            </Link>
                            <Link to="/notifications">  
                            <Navbar.Brand>
                                <img src={bell} alt="notifications"
                                    width="30"
                                    height="30"
                                    className="Notifications d-inline-block align-top"
                                />{' '}
                            
                            </Navbar.Brand>
                            </Link>
                            <Link to="/friendList">
                                <Navbar.Brand>
                                    <img src={friends} alt="friends"
                                        width="30"
                                        height="30"
                                        className="Friends d-inline-block align-top"
                                    />{' '}

                                </Navbar.Brand>
                            </Link>
                            <Link to="/map">
                            <Navbar.Brand>
                                <img src={map} alt="map"
                                    width="30"
                                    height="30"
                                    className="Map d-inline-block align-top"
                                />{' '}

                            </Navbar.Brand>
                            </Link>
                            <Link to="/aboutUs">
                            <Navbar.Brand>
                                {' '}
                About us
                
              </Navbar.Brand>
              </Link>
                        </Nav>
                        <Navbar.Brand>Logged in as {webId}</Navbar.Brand>
                        <LogoutButton>
                            <Button>Log Out</Button>
                        </LogoutButton>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/friendList">
                        <NearbyFriends />
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
                </Switch>
            
        </Router>);
}

export default MyNavBar
