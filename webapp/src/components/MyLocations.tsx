import React from 'react';
import { addLocation } from '../services/addLocation';
import { getLocations, useLocationList } from '../hooks/useLocations';
import { TripleSubject, TripleDocument } from 'tripledoc';
import { schema } from 'rdf-namespaces';

export const MyLocations: React.FC = () => {
  const locationsList = useLocationList();
  const [formContent, setFormContent] = React.useState('');
  const [updatedLocationList, setUpdatedLocationList] = React.useState<TripleDocument>();

  if (!locationsList) {
    return null;
  }
  const locations = getLocations(updatedLocationList || locationsList);

  async function saveLocation(event: React.FormEvent) {
    event.preventDefault();
    if (!locationsList) {
      return;
    }
    const updatedDoc = await addLocation(formContent, locationsList);
    setUpdatedLocationList(updatedDoc);
    setFormContent('');
  }

  const locationElements = locations.sort(byDate).map((location) => (
    <article key={location.asRef()} className="card content">
      <pre>
        {location.getString(schema.text)}
      </pre>
    </article>
  ));

  return (
    <>
      <section className="section">
        <form onSubmit={saveLocation}>
          <div className="field">
            <div className="control">
              <textarea
                onChange={(e) => { e.preventDefault(); setFormContent(e.target.value); }}
                name="location"
                id="location"
                className="textarea"
                value={formContent}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">Add location</button>
            </div>
          </div>
        </form>
      </section>
      <section className="section">
        {locationElements}
      </section>
    </>
  );
};

function byDate(note1: TripleSubject, note2: TripleSubject): number {
  const date1 = note1.getDateTime(schema.dateCreated);
  const date2 = note2.getDateTime(schema.dateCreated);
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    return 0;
  }

  return date2.getTime() - date1.getTime();
}
