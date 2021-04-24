import { useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import MyNavBar from "./components/MyNavBar";
import LogIn from "./components/LogIn";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import './Custom.css';

export default function App () {
  const {session, sessionRequestInProgress} = useSession();
  const [loggedIn, setLoggedIn]  = useState(false);

  session.onLogin(() => setLoggedIn(true));
  session.onLogout(() => setLoggedIn(false));

  if (sessionRequestInProgress) {
    return(
      <Container className="min-vh-100 d-flex">
        <Row className="m-auto align-self-center">
          <Col>
            <h1>Loading<Spinner animation="grow" size="sm" variant="light"/>
            <Spinner animation="grow" variant="light"/></h1>
          </Col>
        </Row>
      </Container>
    );
  }
  
  if (!loggedIn) {
    return <LogIn/>;
  } 

  return (
  <>
  <MyNavBar rotation={20} timing={200}/>
  <footer className="fixed-bottom">
    <p class="footerText">Radarin-En-2B | University of Oviedo | 2020-2021</p>
</footer>)
</>);
};