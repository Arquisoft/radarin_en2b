import solidAuth from 'solid-auth-client';
import { useSession } from '@inrupt/solid-ui-react';
import { fetchDocument } from 'tripledoc';

export async function fetchProfile () {
  const {session} = useSession();
  if (!session) {
    return null;
  }

  const webIdDoc = await fetchDocument(session.info.webId!);
  const profile = webIdDoc.getSubject(session.info.webId!);
  return profile;
}
