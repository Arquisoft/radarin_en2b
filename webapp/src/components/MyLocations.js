
import {
    getSolidDataset,
    getThing,
    setStringNoLocale,
    addStringNoLocale,
    setThing,
    saveSolidDatasetAt,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";
import { useSession } from "@inrupt/solid-ui-react";
const MyLocations = () => {


    async function updateProfile(webId) {
        
        const myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
        const profile = getThing(myDataset, webId);

        let updatedProfile = setStringNoLocale(profile, VCARD.fn, "Marcos");
        updatedProfile = addStringNoLocale(updatedProfile, FOAF.publications, "docs");
        updatedProfile = addStringNoLocale(updatedProfile, FOAF.publications, "example");

        const myChangedDataset = setThing(myDataset, updatedProfile);

        await saveSolidDatasetAt(
            session.info.webId.slice(0, -3),
            myChangedDataset,
            { fetch: fetch }
        );
    }
    const { session } = useSession();
    updateProfile(session.info.webId);
}

export default MyLocations