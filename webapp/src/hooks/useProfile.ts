import React from 'react';
import { TripleSubject } from 'tripledoc';
import { fetchProfile } from '../services/fetchProfile';
import { useSession } from '@inrupt/solid-ui-react';
import { fetchDocument } from 'tripledoc';

export function useProfile() {
  const [activeprofile, setProfile] = React.useState<TripleSubject>();

  const {session} = useSession();
  if (!session) {
    return null;
  }

  const webIdDoc = await fetchDocument(session.info.webId!);
  const profile = webIdDoc.getSubject(session.info.webId!);

  React.useEffect(() => {
    fetchProfile().then((fetchedProfile) => {
      if (fetchedProfile === null) {
        return;
      }
      setProfile(fetchedProfile);
    });
  }, []);

  return profile;
}