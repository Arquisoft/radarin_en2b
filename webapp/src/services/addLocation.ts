import { TripleDocument } from 'tripledoc';
import { rdf, schema } from 'rdf-namespaces';

export async function addLocation(location: string, locations: TripleDocument): Promise<TripleDocument> {
  const newLocation = locations.addSubject();
  newLocation.addRef(rdf.type, schema.TextDigitalDocument);
  newLocation.addString(schema.text, location);
  newLocation.addDateTime(schema.dateCreated, new Date(Date.now()))

  return await locations.save([newLocation]);
}