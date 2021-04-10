import React from 'react';
import { fetchDocument, TripleDocument, TripleSubject } from 'tripledoc';
import { solid, schema } from 'rdf-namespaces';
import { usePublicTypeIndex } from './usePublicTypeIndex';
import { initialiseLocations } from '../services/initialiseLocations';

export function useLocationList() {
  const publicTypeIndex = usePublicTypeIndex();
  const [locationsList, setLocationsList] = React.useState<TripleDocument>();

  React.useEffect(() => {
    if (!publicTypeIndex) {
      return;
    }

    (async () => {
      const locationsListIndex = publicTypeIndex.findSubject(solid.forClass, schema.TextDigitalDocument);
      if (!locationsListIndex) {
        // If no notes document is listed in the public type index, create one:
        const locationsList = await initialiseLocations()
        if (locationsList === null) {
          return;
        }
        setLocationsList(locationsList);
        return;
      } else {
        // If the public type index does list a notes document, fetch it:
        const locationsListUrl = locationsListIndex.getRef(solid.instance);
        if (typeof locationsListUrl !== 'string') {
          return;
        }
        const document = await fetchDocument(locationsListUrl);
        setLocationsList(document);
      }
    })();

  }, [publicTypeIndex]);

  return locationsList;
}

export function getLocations(locationsList: TripleDocument): TripleSubject[] {
  return locationsList.getSubjectsOfType(schema.TextDigitalDocument);
}