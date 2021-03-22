import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from '@inrupt/solid-ui-react';
import LogIn from './components/LogIn';
import MyNavBar from './components/MyNavBar';
import {updateUserLocation} from './api/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
      userPos: "",
    };
  }

  currentCoords = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    this.setState(previous => ({
      userPos: {...previous.userPos, 
      lat: latitude, lng: longitude}
    }))
  };

  render() {
    
    updateUserLocation(session.info.webId, this.currentCoords);
    if (!session.info.isLoggedIn) {
      return <LogIn />;
    } else {
      return <MyNavBar />;
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => updateUserLocation(session.info.webId, this.currentCoords), 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

async function getSession() {
  return useSession();
}

export default App