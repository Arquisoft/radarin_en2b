import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from '@inrupt/solid-ui-react';
import LogIn from './components/LogIn';
import MyNavBar from './components/MyNavBar';

export default function App() {
  const {session} = useSession();
  
  if (!session.info.isLoggedIn) {
    return <LogIn/>;
  } else {
    return <MyNavBar/>;
  }
}
