import { getNearbyFriends } from "../api/api";
import { useSession } from "@inrupt/solid-ui-react";
import { useState, useEffect } from "react";

const MapContents = () => {
    const [activeGeo, setActiveGeo] = useState(false);
    const [crd, setCrd] = useState([]);
    const [nearbyFriends, setNearbyFriends] = useState([]);
    const { session } = useSession();
    const { PathFactory } = require("ldflex");
    const { default: ComunicaEngine } = require("@ldflex/comunica");
    const { namedNode } = require("@rdfjs/data-model");
    // The JSON-LD context for resolving properties
    const context = {
        "@context": {
        "@vocab": "http://xmlns.com/foaf/0.1/",
        "friends": "knows",
        "label": "http://www.w3.org/2000/01/rdf-schema#label",
        }
    }
    // The query engine and its source
    const queryEngine = new ComunicaEngine(session.info.webId.slice(0, -3));
    // The object that can create new paths
    const path = new PathFactory({ context, queryEngine });
    const pod = path.create({ subject: namedNode(session.info.webId) });

    useEffect(() => {
        let nearby = [];
        navigator.geolocation.getCurrentPosition(async function(pos) {
            setCrd(pos.coords);
            setActiveGeo(true);
            let friends = await showPerson(pod);
            await getNearbyFriends({ type: "Point", coordinates: [pos.coords.latitude, pos.coords.longitude] }, friends).then((user)=> {
            nearby.push(user);
            });
            setNearbyFriends(nearby);
        }, async function(err) {
            console.warn("ERROR(" + err.code + "): " + err.message);
            setActiveGeo(false);
        });
    }, [setCrd, setActiveGeo, showPerson, nearbyFriends, pod]);

    async function showPerson(person) {
        for await (const name of person.knows){
          var webId = `${name}`+"profile/card#me";
          var friendsOfUser = [];
          friendsOfUser.push({webId});
        }
        return friendsOfUser.filter(onlyUnique);
      }
    
      async function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    return(
        {
        lat: crd.latitude,
        lng: crd.longitude,
        geo: activeGeo,
        nearby: nearbyFriends
    }
    );
}
export default MapContents;