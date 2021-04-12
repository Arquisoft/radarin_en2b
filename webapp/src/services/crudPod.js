import {
    getSolidDataset,
    getThing,
    addStringNoLocale,
    setThing,
    saveSolidDatasetAt,
    getStringNoLocaleAll,
    getStringNoLocale,
    removeStringNoLocale,
    getUrlAll
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";

async function addLocation(webId, lat, long) {

    const myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    const profile = getThing(myDataset, webId);
    var date = new Date();
    let updatedProfile = addStringNoLocale(profile, FOAF.interest, lat + ", " + long + ", "+date.toLocaleString());

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(
        webId.slice(0, -3),
        myChangedDataset,
        { fetch: fetch }
    );
}

async function getName(webId) {
    const myDataset = await getSolidDataset(
        webId.slice(0, -3)
    );

    const profile = getThing(
        myDataset,
        webId
    );

    const fn = getStringNoLocale(profile, VCARD.fn);

    return fn;
}

async function getLocations(webId) {
    const myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    const profile = getThing(myDataset, webId);

    let acquaintances = new Promise((resolve, reject) => {
        resolve(getStringNoLocaleAll(profile, FOAF.interest));
    });

    return await acquaintances;
}

async function deleteLocation(webId, location){
    const myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    const profile = getThing(myDataset, webId);
    let updatedProfile = removeStringNoLocale(profile, FOAF.interest, location);

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(
        webId.slice(0, -3),
        myChangedDataset,
        { fetch: fetch }
    );
}

async function getFriends(webId){
    const myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    const profile = getThing(myDataset, webId);

    let acquaintances = new Promise((resolve, reject) => {
        resolve(getUrlAll(profile, FOAF.knows));
    });

    return await acquaintances;
}

export { addLocation, getLocations, getName, deleteLocation, getFriends }