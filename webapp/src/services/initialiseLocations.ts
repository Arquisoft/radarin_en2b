import { fetchProfile } from './fetchProfile';
import { space, schema } from 'rdf-namespaces';
import { createDocument } from 'tripledoc';
import { fetchPublicTypeIndex } from './fetchPublicTypeIndex';
import { addToTypeIndex } from './addToTypeIndex';

export async function initialiseLocations () {
  const [profile, publicTypeIndex] = await Promise.all([fetchProfile(), fetchPublicTypeIndex()]);
  if (profile === null || publicTypeIndex === null) {
    return null;
  }

  const storage = profile.getRef(space.storage);
  if (typeof storage !== 'string') {
    return null;
  }

  // Note: There's an assumption here that `/public/` exists and is writable for this app.
  //       In the future, "Shapes" should hopefully allow us to get more guarantees about this:
  //       https://ruben.verborgh.org/blog/2019/06/17/shaping-linked-data-apps/#need-for-shapes
  const locationsListRef = storage + 'public/locations.ttl';
  const locationsList = createDocument(locationsListRef);
  const updatedLocations = await locationsList.save();
  await addToTypeIndex(publicTypeIndex, updatedLocations, schema.TextDigitalDocument);
  return updatedLocations;
}
