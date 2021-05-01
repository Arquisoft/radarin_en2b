import {
    getSolidDataset,
    getThing,
    getThingAll,
    addStringNoLocale,
    setThing,
    saveSolidDatasetAt,
    getStringNoLocaleAll,
    getStringNoLocale,
    removeStringNoLocale,
    getUrlAll,
    getUrl,
    getDatetime
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { FOAF, VCARD, DCTERMS, RDFS } from "@inrupt/vocab-common-rdf";
const rdf = require('rdflib');

async function getName(webId) {
    const myDataset = await getSolidDataset(webId.slice(0, -3));

    const profile = getThing(myDataset, webId);

    const fn = getStringNoLocale(profile, VCARD.fn);

    return fn;
}

async function addLocation(webId, lat, long) {
    getSolidDataset(webId.slice(0, -15) + 'private/radarin.txt', { fetch: fetch }).then(async function (myDataset){
        const profile = getThing(myDataset, webId);
        var date = new Date();
        let updatedProfile = addStringNoLocale(profile, FOAF.interest, lat + ", " + long + ", " + date.toLocaleString());

        const myChangedDataset = setThing(myDataset, updatedProfile);
        await saveSolidDatasetAt(webId.slice(0, -15) + 'private/radarin.txt', myChangedDataset, { fetch: fetch });
        return;
    });
    getSolidDataset(webId.slice(0, -3), { fetch: fetch }).then(async function (myDataset){
        const profile = getThing(myDataset, webId);
        var date = new Date();
        let updatedProfile = addStringNoLocale(profile, FOAF.interest, lat + ", " + long + ", " + date.toLocaleString());

        const myChangedDataset = setThing(myDataset, updatedProfile);
        await saveSolidDatasetAt(webId.slice(0, -15) + 'private/radarin.txt', myChangedDataset, { fetch: fetch });
        return;
    });
}

async function getLocations(webId) {
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/radarin.txt', { fetch: fetch });
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
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/radarin.txt', { fetch: fetch });
    if (myDataset === null){
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch }); 
    }
    const profile = getThing(myDataset, webId);
    let updatedProfile = removeStringNoLocale(profile, FOAF.interest, location);

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(webId.slice(0, -15) + 'private/radarin.txt', myChangedDataset, { fetch: fetch });
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
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/radarin.txt', { fetch: fetch });
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

    await saveSolidDatasetAt(webId.slice(0, -15) + 'private/radarin.txt', myChangedDataset, { fetch: fetch });
}

async function getTagLocations(webId) {
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/radarin.txt', { fetch: fetch });
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
    let myDataset = await getSolidDataset(webId.slice(0, -15) + 'private/radarin.txt', { fetch: fetch });
    if (myDataset === null){
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch }); 
    }
    const profile = getThing(myDataset, webId);
    let updatedProfile = removeStringNoLocale(profile, FOAF.publications, tag);

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(webId.slice(0, -15) + 'private/radarin.txt', myChangedDataset, { fetch: fetch });
}

async function getChats(webId){
    getSolidDataset(webId.slice(0, -15) + 'inbox/prueba', { fetch: fetch }).then(async function (myDataset){
        const chat = await getThing(myDataset, webId.slice(0, -15) + 'inbox/prueba');
        const dc = await getDatetime(chat, DCTERMS.modified);
        const year = dc.getUTCFullYear()
        const split = dc.toLocaleDateString().split('/')
        const month = split[1].length === 1 ? '0' +split[1] : split[1];
        const day = split[0].length === 1 ? '0' +split[0] : split[0];
        const date = year + '/' +  month + '/' + day
        console.log(webId.slice(0, -15) + 'inbox/prueba/' + date + '/chat.ttl')

        getSolidDataset(webId.slice(0, -15) + 'inbox/prueba/' + date + '/chat.ttl', { fetch: fetch }).then(async function (myDataset){
            console.log(myDataset)
            const index = await getThing(myDataset, webId.slice(0, -15) + 'inbox/prueba/index.ttl#this')
            const messages = await getUrlAll(index, 'http://www.w3.org/2005/01/wf/flow#message');
            console.log(messages[0])
            const message1 = await getThing(myDataset, messages[0])
            console.log(message1)
            const message1Content = await getStringNoLocale(message1, 'http://rdfs.org/sioc/ns#content')
            console.log(message1Content)
        }) 
        return;
    });
}
export {  getName, addLocation, getLocations, deleteLocation, getFriends, addTagLocation, getTagLocations, deleteTagLocation, getChats };