import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.svg';
import bell from '../img/bell.png';
import friends from '../img/friends.png';
import map from '../img/map.png';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Home extends React.Component {
    render() {
        return (<>
            <Navbar bg="dark" variant="dark">
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Navbar.Brand href="#home">
                        <img src={logo} className="App-logo" alt="logo"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                Radarin
              </Navbar.Brand>
                    <Navbar.Brand href="#home">
                        <img src={bell} className="Notifications" alt="notifications"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}

                    </Navbar.Brand>
                    <Navbar.Brand href="#home">
                        <img src={friends} className="Friends" alt="friends"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}

                    </Navbar.Brand>
                    <Navbar.Brand href="#home">
                        <img src={map} className="Map" alt="map"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}

                    </Navbar.Brand>

                    <Navbar.Brand href="#home">
                        {' '}
                About us
              </Navbar.Brand>
                </Nav>
                <Nav>
                    <Navbar.Brand href="#home">
                        {' '}
                Logout
              </Navbar.Brand>
                </Nav>
                </Navbar.Collapse>
            </Navbar>

        </>)
    }
}

export default Home