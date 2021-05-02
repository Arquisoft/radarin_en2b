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
    getDatetime,
    addUrl,
    createThing,
    addDatetime,
    asUrl
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { FOAF, VCARD, DCTERMS } from "@inrupt/vocab-common-rdf";

async function getName(webId) {
    const myDataset = await getSolidDataset(webId.slice(0, -3));

    const profile = getThing(myDataset, webId);

    const fn = getStringNoLocale(profile, VCARD.fn);

    return fn;
}

async function addLocation(webId, lat, long) {
    var success = getSolidDataset(webId.slice(0, -15) + "private/radarin.txt", { fetch: fetch }).then(async function (myDataset) {
        const profile = getThing(myDataset, webId);
        var date = new Date();
        let updatedProfile = addStringNoLocale(profile, FOAF.interest, lat + ", " + long + ", " + date.toLocaleString());

        const myChangedDataset = setThing(myDataset, updatedProfile);
        await saveSolidDatasetAt(webId.slice(0, -15) + "private/radarin.txt", myChangedDataset, { fetch: fetch });
        return true;
    });
    if (!success) {
        getSolidDataset(webId.slice(0, -3), { fetch: fetch }).then(async function (myDataset) {
            const profile = getThing(myDataset, webId);
            var date = new Date();
            let updatedProfile = addStringNoLocale(profile, FOAF.interest, lat + ", " + long + ", " + date.toLocaleString());

            const myChangedDataset = setThing(myDataset, updatedProfile);
            await saveSolidDatasetAt(webId.slice(0, -15) + "private/radarin.txt", myChangedDataset, { fetch: fetch });
        });
    }
}

async function getLocations(webId) {
    var myDataset = await getSolidDataset(webId.slice(0, -15) + "private/radarin.txt", { fetch: fetch });
    if (myDataset === null) {
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    }
    const profile = getThing(myDataset, webId);

    var acquaintances = new Promise((resolve) => {
        resolve(getStringNoLocaleAll(profile, FOAF.interest));
    });

    return await acquaintances;
}

async function deleteLocation(webId, location) {
    var myDataset = await getSolidDataset(webId.slice(0, -15) + "private/radarin.txt", { fetch: fetch });
    if (myDataset === null) {
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    }
    const profile = getThing(myDataset, webId);
    var updatedProfile = removeStringNoLocale(profile, FOAF.interest, location);

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(webId.slice(0, -15) + "private/radarin.txt", myChangedDataset, { fetch: fetch });
}

async function getFriends(webId) {
    var myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    const profile = getThing(myDataset, webId);

    let acquaintances = new Promise((resolve) => {
        resolve(getUrlAll(profile, FOAF.knows));
    });

    return await acquaintances;
}

async function addTagLocation(webId, name, description, lat, long) {
    let myDataset = await getSolidDataset(webId.slice(0, -15) + "private/radarin.txt", { fetch: fetch });
    if (myDataset === null) {
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    }
    const profile = getThing(myDataset, webId);
    var date = new Date();
    var updatedProfile = "";
    if (description !== "" && description.length > 0) {
        updatedProfile = addStringNoLocale(profile, FOAF.publications, name + ", " + description + ", " + lat + ", " + long + ", " + date.toLocaleString());
    } else {
        updatedProfile = addStringNoLocale(profile, FOAF.publications, name + ", no description, " + lat + ", " + long + ", " + date.toLocaleString());
    }

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(webId.slice(0, -15) + "private/radarin.txt", myChangedDataset, { fetch: fetch });
}

async function getTagLocations(webId) {
    let myDataset = await getSolidDataset(webId.slice(0, -15) + "private/radarin.txt", { fetch: fetch });
    if (myDataset === null) {
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    }
    const profile = getThing(myDataset, webId);

    let acquaintances = new Promise((resolve) => {
        resolve(getStringNoLocaleAll(profile, FOAF.publications));
    });

    return await acquaintances;
}

async function deleteTagLocation(webId, tag) {
    let myDataset = await getSolidDataset(webId.slice(0, -15) + "private/radarin.txt", { fetch: fetch });
    if (myDataset === null) {
        myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    }
    const profile = getThing(myDataset, webId);
    let updatedProfile = removeStringNoLocale(profile, FOAF.publications, tag);

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(webId.slice(0, -15) + "private/radarin.txt", myChangedDataset, { fetch: fetch });
}

async function getChats(webId) {
    var chats = getSolidDataset(webId.slice(0, -15) + "inbox", { fetch: fetch }).then(async function (myDataset) {
        const inbox = await getThingAll(myDataset);
        var resultToReturn = new Set();
        var names = new Set();
        for (var i = 1; i < inbox.length; i++) {
            const urlParam = asUrl(inbox[i]).split("/")[3];
            getSolidDataset(webId.slice(0, -15) + "inbox/" + urlParam, { fetch: fetch }).then(async function (myDataset) {
                const chat = await getThing(myDataset, webId.slice(0, -15) + "inbox/" + urlParam);
                const dc = await getDatetime(chat, DCTERMS.modified);
                const year = dc.getUTCFullYear();
                const split = dc.toLocaleDateString().split("/");
                const utcDay = dc.getUTCDate().toString();
                const month = split[1].length === 1 ? "0" + split[1] : split[1];
                const day = utcDay.length === 1 ? "0" + utcDay : utcDay;
                const date = year + "/" + month + "/" + day;

                getSolidDataset(webId.slice(0, -15) + "inbox/" + urlParam + "/" + date + "/chat.ttl", { fetch: fetch }).then(async function (myDataset) {
                    const chat = await getThing(myDataset, webId.slice(0, -15) + "inbox/" + urlParam + "/index.ttl#this");
                    const messages = await getUrlAll(chat, "http://www.w3.org/2005/01/wf/flow#message");
                    var result = new Set();
                    messages.forEach(async function (elem) {
                        const message = await getThing(myDataset, elem);
                        if (message !== null) {
                            const messageContent = await getStringNoLocale(message, "http://rdfs.org/sioc/ns#content")
                            const creator = await getUrl(message, FOAF.maker);
                            const date = await getDatetime(message, DCTERMS.created);
                            result.add({ content: messageContent, creator: creator, date: date });
                        }
                        if (!names.has(urlParam)) {
                            const finalResult = { maker: webId, chatName: urlParam, chats: result };
                            resultToReturn.add(finalResult);
                            names.add(urlParam);
                        }
                    });
                });
            });
        }
        return resultToReturn;
    });
    return chats;
}

async function getDateForChat(webId, urlParam) {
    var date = getSolidDataset(webId.slice(0, -15) + "inbox/" + urlParam, { fetch: fetch }).then(async function (myDataset) {
        const chat = await getThing(myDataset, webId.slice(0, -15) + "inbox/" + urlParam);
        const dc = await getDatetime(chat, DCTERMS.modified);
        const year = dc.getUTCFullYear();
        const split = dc.toLocaleDateString().split("/");
        const month = split[1].length === 1 ? "0" + split[1] : split[1];
        const day = split[0].length === 1 ? "0" + split[0] : split[0];
        const date = year + "/" + month + "/" + day;
        return date;
    });
    return date;
}

async function addChat(webId, text) {
    getSolidDataset(webId.slice(0, -15) + "inbox", { fetch: fetch }).then(async function (myDataset) {
        const inbox = await getThingAll(myDataset);

        for (var i = 1; i < inbox.length; i++) {
            const urlParam = asUrl(inbox[i]).split("/")[3];
            const date = await getDateForChat(webId, urlParam);
            getSolidDataset(webId.slice(0, -15) + "inbox/" + urlParam + "/index.ttl", { fetch: fetch }).then(async function (myDataset) {
                const index = await getThingAll(myDataset);
                const url = asUrl(index[index.length - 1]);
                const indexThis = await setThing(myDataset, url);
                const newParticipation = await createThing(myDataset);
                var now = new Date();
                let updatedParticipation = addDatetime(newParticipation, DCTERMS.created, now);
                updatedParticipation = addUrl(updatedParticipation, "http://www.w3.org/2005/01/wf/flow#participant", "https://test1234asw.inrupt.net/profile/card#me");
                updatedParticipation = addStringNoLocale(updatedParticipation, "http://www.w3.org/ns/ui#background", "#c9c8e6");
                const myChangedDataset = setThing(myDataset, updatedParticipation);
                await saveSolidDatasetAt(url, myChangedDataset, { fetch: fetch });

                let updatedParticipant = addUrl(indexThis, "http://www.w3.org/2005/01/wf/flow#participation", updatedParticipation);
                const myChangedDataset2 = setThing(myDataset, updatedParticipant);
                await saveSolidDatasetAt(url, myChangedDataset2, { fetch: fetch });
            });

            getSolidDataset(webId.slice(0, -15) + "inbox/" + urlParam + "/" + date + "/chat.ttl", { fetch: fetch }).then(async function (myDataset) {
                const index = await getThing(myDataset, webId.slice(0, -15) + "inbox/" + urlParam + "/index.ttl#this");
                const newMessage = await createThing(myDataset);
                var now = new Date();
                let updatedMessage = addDatetime(newMessage, DCTERMS.created, now);
                updatedMessage = addStringNoLocale(updatedMessage, "http://rdfs.org/sioc/ns#content", text);
                updatedMessage = addUrl(updatedMessage, FOAF.maker, webId);
                const myChangedDataset = setThing(myDataset, updatedMessage);
                await saveSolidDatasetAt(webId.slice(0, -15) + "inbox/" + urlParam + "/" + date + "/chat.ttl", myChangedDataset, { fetch: fetch });

                let updatedChat = addUrl(index, "http://www.w3.org/2005/01/wf/flow#message", updatedMessage);
                const myChangedDataset2 = setThing(myDataset, updatedChat);
                await saveSolidDatasetAt(webId.slice(0, -15) + "inbox/" + urlParam + "/" + date + "/chat.ttl", myChangedDataset2, { fetch: fetch });
            });
        }
    });
}

export { getName, addLocation, getLocations, deleteLocation, getFriends, addTagLocation, getTagLocations, deleteTagLocation, getChats, addChat };
