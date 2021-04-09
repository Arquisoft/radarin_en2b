import React from "react";
import {getName} from "../services/getPodInfo";
import {  useSession  } from "@inrupt/solid-ui-react";

const Home = () => {
    const { session } = useSession();

    const message = "Welcome " + getName(session.info.webId) + "!";

    return (
        <div>
            <br></br>
            <h1 align="center">Welcome!</h1>
        </div>
    );
};

export default Home;