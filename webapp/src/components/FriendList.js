import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import Dropdown from 'react-bootstrap/Dropdown';
import saw from '../img/saw.png';
import lupa from '../img/lupa.png';
import batman from '../img/batman.webp';
import chica from '../img/chica.png';
import { Link } from 'react-router-dom';

const FriendList = () => {
  return (
      <div className='ml-3'>
        <h2 className='mb-3'>Nearby</h2>
        <ListGroup className='mb-3'>
          <ListGroup horizontal>
            <ListGroup.Item>
              <img src={saw} alt="saw"
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
            </ListGroup.Item>
            <ListGroup.Item> <p align="center">Saw </p> <p align="center"> 0,4 km away</p> </ListGroup.Item>

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
              <Dropdown className='m-3'>
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
        <h2 className='mb-3'>All</h2>
        <ListGroup className='mb-3'>
          <ListGroup horizontal>
            <ListGroup.Item>
              <img src={saw} alt="saw"
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
            </ListGroup.Item>
            <ListGroup.Item> <p align="center">Saw </p> <p align="center"> 0,4 km away</p> </ListGroup.Item>
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
              <Dropdown className='m-3'>
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
        <ListGroup className='mb-3'>
          <ListGroup horizontal>
            <ListGroup.Item>
              <img src={batman} alt="bat"
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
            </ListGroup.Item>
            <ListGroup.Item> <p align="center">Batman </p> <p align="center"> 4,2 km away</p> </ListGroup.Item>
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
              <Dropdown className='m-3'>
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
        <ListGroup className='mb-3'>
          <ListGroup horizontal>
            <ListGroup.Item>
              <img src={chica} alt="chica"
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
            </ListGroup.Item>
            <ListGroup.Item> <p align="center">Sara </p> <p align="center"> 2,0 km away</p> </ListGroup.Item>
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
);
}
export default FriendList