import { withWebId } from "@solid/react";
import { useSession } from "@inrupt/solid-ui-react";
import {useState} from 'react';

const Amigos = () => {
    const { session } = useSession();
    const [activeProfile] = useState(session.info.webId);

    var friendsOfUser = [];

    //////////////////////////

    const { PathFactory } = require('ldflex');
    const { default: ComunicaEngine } = require('@ldflex/comunica');
    const { namedNode } = require('@rdfjs/data-model');

    // The JSON-LD context for resolving properties
    const context = {
        "@context": {
            "@vocab": "http://xmlns.com/foaf/0.1/",
            "friends": "knows",
            "label": "http://www.w3.org/2000/01/rdf-schema#label",
        }
    };
    // The query engine and its source
    const queryEngine = new ComunicaEngine(session.info.webId.slice(0, -3));
    // The object that can create new paths
    const path = new PathFactory({ context, queryEngine });

    const pod = path.create({ subject: namedNode(session.info.webId) });
    showPerson(pod);

    async function showPerson(person) {
        //console.log(`This person is ${await person.name}`);
        //console.log(`${await person.name} is friends with:`);
        for await (const name of person.knows) {
            friendsOfUser.push(`${name}`);
        }
        var friends = await friendsOfUser.filter(onlyUnique);
        await showFriends(friends);
    }

    async function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    async function showFriends(amigos) {
        for (var i = 0; i < amigos.length; i++) {
            console.log("Luis is friend of " + amigos[i]);
        }
    }

    return <h1>Amigos</h1>
}

export default withWebId(Amigos);