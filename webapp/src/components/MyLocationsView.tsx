import React from 'react';
import { foaf } from 'rdf-namespaces';
import { useProfile } from '../hooks/useProfile';
import { MyLocations } from './MyLocations';

export const MyLocationsView: React.FC = () => {
  const profile = useProfile();

  const name = (profile) ? profile.getString(foaf.name) : null;
  const title = (name)
    ? `Public notes by ${name}`
    : 'Public notes';

  return <>
    <section className="section">
      <h1 className="title">
        {title}
      </h1>
    </section>
    <MyLocations/>
  </>;
};