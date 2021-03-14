import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.svg';
import bell from '../img/bell.png';
import friends from '../img/friends.png';
import map from '../img/map.png';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import FriendList from './FriendList';
import AboutUs from './AboutUs';
import Home from './Home';



const MyNavBar = () => {
    return (
        <Router>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/">
                                <Navbar.Brand>
                                    <img src={logo} className="App-logo" alt="logo"
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"
                                    />{' '}
                                        Radarin
                                </Navbar.Brand>
                            </Link>
                            <Link to="/login">  
                            <Navbar.Brand>
                                <img src={bell} className="Notifications" alt="notifications"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />{' '}
                            
                            </Navbar.Brand>
                            </Link>
                            <Link to="/friendList">
                                <Navbar.Brand>
                                    <img src={friends} className="Friends" alt="friends"
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"
                                    />{' '}

                                </Navbar.Brand>
                            </Link>
                            <Navbar.Brand href="#home">
                                <img src={map} className="Map" alt="map"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />{' '}

                            </Navbar.Brand>
                            <Link to="aboutUs">
                            <Navbar.Brand>
                                {' '}
                About us
                
              </Navbar.Brand>
              </Link>
                        </Nav>
                        <Nav>
                            <Navbar.Brand href="#home">
                                {' '}
                Logout
              </Navbar.Brand>
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
                    <Route path="/aboutUs">
                        <AboutUs />
                    </Route>
                </Switch>
            
        </Router>);
}

export default MyNavBar