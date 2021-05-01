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

async function getName(webId) {
    const myDataset = await getSolidDataset(webId.slice(0, -3));

    const profile = getThing(myDataset, webId);

    const fn = getStringNoLocale(profile, VCARD.fn);

    return fn;
}

async function addLocation(webId, lat, long) {
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/locations.txt', { fetch: fetch });
    if (myDataset === null){
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch }); 
    }
    const profile = getThing(myDataset, webId);
    var date = new Date();
    let updatedProfile = addStringNoLocale(profile, FOAF.interest, lat + ", " + long + ", " + date.toLocaleString());

    const myChangedDataset = setThing(myDataset, updatedProfile);
    console.log(webId.slice(0, -15) + 'private')
    await saveSolidDatasetAt(webId.slice(0, -15) + 'private/locations.txt', myChangedDataset, { fetch: fetch });
}

async function getLocations(webId) {
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/locations.txt', { fetch: fetch });
    if (myDataset === null){
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch }); 
    }
    const profile = getThing(myDataset, webId);

    let acquaintances = new Promise((resolve) => {
        resolve(getStringNoLocaleAll(profile, FOAF.interest));
    });

    return await acquaintances;
}

async function deleteLocation(webId, location){
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/locations.txt', { fetch: fetch });
    if (myDataset === null){
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch }); 
    }
    const profile = getThing(myDataset, webId);
    let updatedProfile = removeStringNoLocale(profile, FOAF.interest, location);

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(webId.slice(0, -15) + 'private/locations.txt', myChangedDataset, { fetch: fetch });
}

async function getFriends(webId){
    const myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    const profile = getThing(myDataset, webId);

    let acquaintances = new Promise((resolve) => {
        resolve(getUrlAll(profile, FOAF.knows));
    });

    return await acquaintances;
}

async function addTagLocation(webId, name, description, lat, long) {
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/locations.txt', { fetch: fetch });
    if (myDataset === null){
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch }); 
    }
    const profile = getThing(myDataset, webId);
    var date = new Date();
    var updatedProfile = "";
    if(description !== "" && description.length > 0){
        updatedProfile = addStringNoLocale(profile, FOAF.publications, name + ", " + description + ", " + lat + ", " + long + ", " + date.toLocaleString());
    }else{
        updatedProfile = addStringNoLocale(profile, FOAF.publications, name + ", no description, " + lat + ", " + long + ", " + date.toLocaleString());
    }
    
    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(webId.slice(0, -15) + 'private/locations.txt', myChangedDataset, { fetch: fetch });
}

async function getTagLocations(webId) {
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/locations.txt', { fetch: fetch });
    if (myDataset === null){
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch }); 
    }
    const profile = getThing(myDataset, webId);

    let acquaintances = new Promise((resolve) => {
        resolve(getStringNoLocaleAll(profile, FOAF.publications));
    });

    return await acquaintances;
}

async function deleteTagLocation(webId, tag){
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/locations.txt', { fetch: fetch });
    if (myDataset === null){
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch }); 
    }
    const profile = getThing(myDataset, webId);
    let updatedProfile = removeStringNoLocale(profile, FOAF.publications, tag);

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(webId.slice(0, -15) + 'private/locations.txt', myChangedDataset, { fetch: fetch });
}
export {  getName, addLocation, getLocations, deleteLocation, getFriends, addTagLocation, getTagLocations, deleteTagLocation };