import { LoginButton } from "@inrupt/solid-ui-react";
import { useState, useEffect, Component } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";

class SplitText extends Component {
    render() {
        return (
            <span aria-label={this.props.copy} role={this.props.role}>
                {this.props.copy.split("").map(function (char, index) {
                    let style = { "animation-delay": (0.5 + index / 10) + "s" }
                    return <span
                        aria-hidden="true"
                        key={index}
                        style={style}>
                        {char}
                    </span>;
                })}
            </span>
        );
    }
}

export default function LogIn() {
    const [idp, setIdp] = useState("https://inrupt.net/");
    const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, [setCurrentUrl]);

    return (
        <>

            <div className="d-flex align-items-center min-vh-100">

                <Container className="">
                    <h1><SplitText copy="Welcome to Radarin!" role="heading" /></h1>
                    <Form.Group>
                        <Form.Label>Identity Provider</Form.Label>
                        <Form.Row >
                            <Col>
                                <Form.Control as="select" onChange={e => setIdp(e.target.value)}>
                                    <option value="https://inrupt.net/">Inrupt</option>
                                    <option value="https://solidcommunity.net/">Solid Community</option>
                                    <option value="https://solidweb.org/">Solid Web</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Control onChange={e => setIdp(e.target.value)} type="text" placeholder="Your idp provider goes here..." value={idp} />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <div className="test">
                        <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                            <Button variant="link" block className="otherLink">Log In</Button>{' '}
                        </LoginButton>
                    </div>
                    <p>Don't have a pod? &emsp; &ensp;<a href="https://solidproject.org/users/get-a-pod" target="_blank" rel="noreferrer">Learn how to get on here!</a></p>
                </Container>
            </div>
        </>
    );
}
