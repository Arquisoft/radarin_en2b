import { useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import MyNavBar from "./components/MyNavBar";
import LogIn from "./components/LogIn";
import { Col, Container, Row } from "react-bootstrap";

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
            <h1>Loading...</h1>
          </Col>
        </Row>
      </Container>
    );
  }
  
  if (!loggedIn) {
    return <LogIn/>;
  } 

  return <MyNavBar/>;
};