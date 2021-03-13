import React from 'react'
import { handleIncomingRedirect, login, getDefaultSession } from '@inrupt/solid-client-authn-browser'

class LogIn extends React.Component {
    render() {
        
        async function myLogin() {
            // 1. Call the handleIncomingRedirect() function to complete the authentication process.
            //   If the page is being loaded after the redirect from the Solid Identity Provider
            //      (i.e., part of the authentication flow), the user's credentials are stored in-memory, and
            //      the login process is complete. That is, a session is logged in 
            //      only after it handles the incoming redirect from the Solid Identity Provider.
            //   If the page is not being loaded after a redirect from the Solid Identity Provider, 
            //      nothing happens.
            await handleIncomingRedirect();

            // 2. Start the Login Process if not already logged in.
            if (!getDefaultSession().info.isLoggedIn) {
                // The `login()` redirects the user to their identity provider;
                // i.e., moves the user away from the current page.
                await login({
                    // Specify the URL of the user's Solid Identity Provider; e.g., "https://inrupt.net"
                    oidcIssuer: "https://inrupt.net",
                    // Specify the URL the Solid Identity Provider should redirect to after the user logs in,
                    // e.g., the current page for a single-page app.

                });
            }
        }
        return (<div>
            <button onClick={myLogin}>Login</button>
        </div>
        )
    }



}

export default LogIn