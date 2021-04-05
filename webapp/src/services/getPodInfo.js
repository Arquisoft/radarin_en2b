import solidAuth from 'solid-auth-client';
import {foaf} from 'rdf-namespaces';
import {fetchDocument} from 'tripledoc';

//Returns the user that is logged in the pod
export async function getLoggedUser() {
    const session = await solidAuth.currentSession();
    if (!session) {
        return null;
    }
    const id = await fetchDocument(session.webId);
    const user = id.getSubject(session.webId);
    return user;
}

//Gets the name of a user from its webId
export async function getName(webId) {
    const id = await fetchDocument(webId);
    const user = id.getSubject(webId);
    const name = await user.getString(foaf.name);
    return name;
}

//Gets the friends of the logged user
export async function getFriends() {
    let user = await getLoggedUser();
    if (user != null) {
    let friends = await user.getAllRefs(foaf.knows);
    return friends;
    } else {
        return [];
    }
}