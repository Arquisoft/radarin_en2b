import {
    getSolidDataset,
    getThing,
    addStringNoLocale,
    setThing,
    saveSolidDatasetAt,
    getStringNoLocaleAll,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { FOAF} from "@inrupt/vocab-common-rdf";

async function addLocation(webId, lat, long) {

    const myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    const profile = getThing(myDataset, webId);

    let updatedProfile = addStringNoLocale(profile, FOAF.interest, lat + ", " + long);

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(
        webId.slice(0, -3),
        myChangedDataset,
        { fetch: fetch }
    );
}

async function getLocations(webId) {
    const myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    const profile = getThing(myDataset, webId);

    let acquaintances = new Promise((resolve, reject) => { 
       resolve(getStringNoLocaleAll(profile, FOAF.interest)); 
    });

    return await acquaintances;
}

export { addLocation, getLocations }