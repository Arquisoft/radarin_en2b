import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Dropdown from "react-bootstrap/Dropdown";
import saw from "../img/saw.png";
import lupa from "../img/lupa.png";
import batman from "../img/batman.webp";
import chica from "../img/chica.png";
import { Link } from "react-router-dom";
import FriendData from "../jsons/friendList.json"

const geolib = require("geolib");

class FriendList extends Component{
  render(){
    return(
      <div className="ml-3">
          <h2 className="mb-3">Nearby friends</h2>
          {FriendData.map((friendDetail, index) => {
            return <div>
                <ListGroup className="mb-3">
                  <ListGroup horizontal style={{minWidth: "70%", maxWidth: 500, minHeight: "70%", maxHeight: 150}}>
                    <ListGroup.Item>
                      <img src={saw} alt="saw"
                        width="80"
                        height="80"
                        className="d-inline-block align-top"
                      />
                    </ListGroup.Item>
                    <ListGroup.Item> <p align="center">{friendDetail.webId}</p><p align="center">
                        {geolib.getDistance({ latitude: 43.616541, longitude: -5.793476 }, { latitude: friendDetail.location.coordinates[0], longitude: friendDetail.location.coordinates[1] })}m away
                    </p> </ListGroup.Item>

                    <ListGroup.Item>
                      <Link to="/map">
                        <img src={lupa} alt="lupa"
                          width="50"
                          height="50"
                          className="m-2"
                        />
                      </Link>
                    </ListGroup.Item>

                    <ListGroup.Item >
                      <Dropdown className="m-3">
                        <Dropdown.Toggle id="dropdown-basic">

                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Delete friend</Dropdown.Item>
                          <Dropdown.Item>Info</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </ListGroup.Item>
                  </ListGroup>

                </ListGroup>
            </div>
          })}
          <h2 className="mb-3">All</h2>
          <ListGroup className="mb-3">
          <ListGroup horizontal>
            <ListGroup.Item>
              <img src={saw} alt="saw"
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
            </ListGroup.Item>
            <ListGroup.Item> <p align="center">https://user.inrupt.net/</p> <p align="center"> 4m away</p> </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/map">
                <img src={lupa} alt="lupa"
                  width="50"
                  height="50"
                  className="m-2"
                />
              </Link>
            </ListGroup.Item>
            <ListGroup.Item >
              <Dropdown className="m-3">
                <Dropdown.Toggle id="dropdown-basic">

                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Delete friend</Dropdown.Item>
                  <Dropdown.Item>Info</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          </ListGroup>

        </ListGroup>
        <ListGroup className="mb-3">
          <ListGroup horizontal>
            <ListGroup.Item>
              <img src={batman} alt="bat"
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
            </ListGroup.Item>
            <ListGroup.Item> <p align="center">https://user.inrupt.net/</p> <p align="center"> 5m away</p> </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/map">
                <img src={lupa} alt="lupa"
                  width="50"
                  height="50"
                  className="m-2"
                />
              </Link>
            </ListGroup.Item>
            <ListGroup.Item >
              <Dropdown className="m-3">
                <Dropdown.Toggle id="dropdown-basic">

                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item >Delete friend</Dropdown.Item>
                  <Dropdown.Item>Info</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          </ListGroup>

        </ListGroup>
        <ListGroup className="mb-3">
          <ListGroup horizontal>
            <ListGroup.Item>
              <img src={chica} alt="chica"
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
            </ListGroup.Item>
            <ListGroup.Item> <p align="center">https://user.inrupt.net/</p> <p align="center"> 2m away</p> </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/map">
                <img src={lupa} alt="lupa"
                  width="50"
                  height="50"
                  className="m-2"
                />
              </Link>
            </ListGroup.Item>
            <ListGroup.Item >
              <Dropdown className="m-3">
                <Dropdown.Toggle id="dropdown-basic">

                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Delete friend</Dropdown.Item>
                  <Dropdown.Item >Info</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          </ListGroup>
          
        </ListGroup>
      </div>
    )
  };
};

export default FriendList;