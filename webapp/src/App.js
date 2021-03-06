import React, {useState, useEffect} from 'react';
import {View, Button, SafeAreaView, TextInput, Image } from 'react-native';
import './App.css';
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getDefaultSession,
  login,
  handleIncomingRedirect,
  logout
} from '@inrupt/solid-client-authn-browser';

export default function App() {
  const [webId, setWebId] = useState(getDefaultSession().info.webId);
  const [issuer, setIssuer] = useState("https://broker.pod.inrupt.com/");

  // The useEffect hook is executed on page load, and in particular when the user
  // is redirected to the page after logging in the identity provider.
  useEffect(() => {
    // After redirect, the current URL contains login information.
    handleIncomingRedirect({
      restorePreviousSession: true,
    }).then((info) => {
      setWebId(info.webId);
    });
  }, [webId]);

  const handleLogin = (e) => {
    // The default behaviour of the button is to resubmit.
    // This prevents the page from reloading.
    e.preventDefault();
    // Login will redirect the user away so that they can log in the OIDC issuer,
    // and back to the provided redirect URL (which should be controlled by your app).
    login({
      redirectUrl: window.location,
      oidcIssuer: issuer,
      clientName: "RadarinEn2b",
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    // The following has no impact on the logout, it just resets the UI.
    setWebId(undefined);
  };

  return (
    <SafeAreaView className="App">
      <View className="App-header">
        <Image source={require('./logo.svg')} className="App-logo" alt="logo"/>
        <Welcome name="ASW students"/>
      </View>
      <View>
        <p>{webId ? `Logged in as ${webId}` : "Not logged in yet"}</p>
        <View>
          <form>
            <label for="issuer">Issuer</label>
            <TextInput
              id = "issuer"
              style={{ height: 30, width: 200 , borderColor: 'black', borderWidth: 1 }}
              onChangeText={text => setIssuer(text)}
              value={issuer}
            />
            <Button title="Log In" onPress={(e) => handleLogin(e)}/>
            <Button title="Log Out" onPress={(e) => handleLogout(e)}/>
          </form>
        </View>
      </View>
    </SafeAreaView>
  );
}