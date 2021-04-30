import { LoginButton } from "@inrupt/solid-ui-react";
import { useState, useEffect } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";

export default function LogIn() {
    const [idp, setIdp] = useState("https://inrupt.net/");
    const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, [setCurrentUrl]);

    return (
        <div className="d-flex align-items-center min-vh-100">
        <Container className="">
            <Form.Group>
                <Form.Label>Identity Provider</Form.Label>
                <Form.Row >
                    <Col>
                        <Form.Control as="select" onChange={(e) => setIdp(e.target.value)}>
                            <option value="https://inrupt.net/">Inrupt</option>
                            <option value="https://solidcommunity.net/">Solid Community</option>
                            <option value="https://solidweb.org/">Solid Web</option>
                        </Form.Control>
                    </Col>
                    <Col> 
                        <Form.Control onChange={(e) => setIdp(e.target.value)} type="text" placeholder="Your idp provider goes here..." value={idp}/>
                    </Col>
                </Form.Row>
            </Form.Group>
            <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                <Button variant="primary" block>Log In</Button>{" "}
            </LoginButton>
            <p>Don't have a pod? <a href="https://solidproject.org/users/get-a-pod" target="_blank" rel="noreferrer">Learn how to get on here!</a></p>
        </Container>
        </div>
    );
}
