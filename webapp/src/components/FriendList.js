import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import Dropdown from 'react-bootstrap/Dropdown';
import saw from '../img/saw.png';
import lupa from '../img/lupa.png';
import batman from '../img/batman.webp';
import chica from '../img/chica.png';
import { Link } from 'react-router-dom';
import FriendData from '../jsons/friendList.json'

import { LoggedIn, LoggedOut, AuthButton, Value, List, withWebId } from '@solid/react';
import { useSession } from '@inrupt/solid-ui-react';

import { updateUserLocation, addUser, getUserById, getNearbyFriends } from '../api/api';

const geolib = require('geolib');

const Friends = () => {
  const{ session } = useSession();
  const [activeProfile] = useState(session.info.webId);

  var friendWebId;
  var friendsOfUser = new Array();
  var counter = 0;

  console.log('Hola');
  
  /*navigator.geolocation.getCurrentPosition(async function (position) {
    await getNearbyFriends(position, friendsOfUser);
  });*/

  function hello(){
    return (
      <div>
      {activeProfile &&
      <dl>
        <List src={`[${activeProfile}].friends`}>{friend =>
          <li key={friend}>
            {friendWebId = `${friend}`}
            {friendsOfUser[counter] = friendWebId}
            {counter++}
          </li>}
        </List>
        {counter = 0}
      </dl>}</div>);
  }
  

  return(
    <div className='ml-3'>
      {hello()}
      <h2 style={{marginTop: '10px', marginLeft: '40px'}}>Nearby friends</h2>
      {FriendData.map((friendDetail, index) => {
        return <div>
          <ListGroup horizontal style={{marginTop: '20px', marginLeft: '40px'}}>
            <ListGroup.Item>
              <img src={saw} alt="saw"
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
            </ListGroup.Item>
            <ListGroup.Item style={{minWidth: '300px', minHeight: '100px'}}> 
              <p align="center">
                {friendDetail.webId}
              </p>
              <p align="center">
                {geolib.getDistance({ latitude: 43.616541, longitude: -5.793476 }, { latitude: friendDetail.location.coordinates[0], longitude: friendDetail.location.coordinates[1] })}m away
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <Link to="/map">
                  <img src={lupa} alt="lupa"
                    width="50"
                    height="50"
                    className="m-3"
                  />
                </Link>
              </ListGroup.Item>

            <ListGroup.Item >
              <Dropdown className='m-4' >
                <Dropdown.Toggle id="dropdown-basic">

                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Delete friend</Dropdown.Item>
                  <Dropdown.Item>Info</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          </ListGroup>

        </div>
        })
      }
      <h2 style={{marginTop: '10px', marginLeft: '40px'}}>All friends</h2>
      {activeProfile &&
        <div>
          <List src={`[${activeProfile}].friends`}>{friend =>
            <ListGroup horizontal key={friend} style={{marginTop: `20px`}}>
              <ListGroup.Item horizontal style={{minWidth: '100px', minHeight: '100px'}}>
                <img src={`[${friend}].image`} alt="user_image" width="80" height="80"></img>
              </ListGroup.Item>

              <ListGroup.Item style={{minWidth: '300px', minHeight: '100px'}}>
                <p align="center"><br></br>
                  <Value src={`[${friend}].name`}>{`${friend}`}</Value>
                </p>
                <p hidden>
                  {friendsOfUser[counter] = `[${friend}].name`}{`${friend}`}
                </p>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <Link to="/map">
                  <img src={lupa} alt="lupa"
                    width="50"
                    height="50"
                    className="m-3"
                  />
                </Link>
              </ListGroup.Item>

              <ListGroup.Item >
                <Dropdown className='m-4' >
                  <Dropdown.Toggle id="dropdown-basic">
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Delete friend</Dropdown.Item>
                    <Dropdown.Item>Info</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
            </ListGroup>
          }
          </List>
        </div>
      }
    </div>
  );
}
export default withWebId(Friends)