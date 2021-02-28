import React from 'react';
import _uniqueId from 'lodash/uniqueId';
import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.sessionId = _uniqueId("session-");
        this.state = {oidcIssuer: "https://broker.pod.inrupt.com/"};
    }

    render() {
        return(
            <SessionProvider sessionId={this.sessionId}>
                <LoginButton
                    oidcIssuer={this.state.oidcIssuer}
                    redirectUrl="http://localhost:3000/">
                </LoginButton>
            </SessionProvider>
        )
    }
}

export default LogIn