import solidAuth from 'solid-auth-client';
import {foaf} from 'rdf-namespaces';

export async function display() {
	solidAuth.trackSession(async session => {
		
		if (!session)
			return;
		
		const person = session.webId;
		console.log(person);
		
		// Set up a local data store and associated data fetcher
		const store = $rdf.graph();
		const fetcher = new $rdf.Fetcher(store);
		const updater = new $rdf.UpdateManager(store);
	
		var s = $('#link').val();
		console.log(s);
		s = s.replace("[your WebID]", person);
		$('#link').val(s);
		
		// Load the person's data into the store
		await fetcher.load(person);
		// Display their details
		const fullName = store.any($rdf.sym(person), FOAF('name'));
		$('#fullName').text(fullName && fullName.value);
		
		// Display their note (added by taisukef)
		const note = store.any($rdf.sym(person), VCARD('note'));
		$('#note').text(note && note.value);
		
		// Display their friends
		const friends = store.each($rdf.sym(person), FOAF('knows'));
		$('#friends').empty();
		friends.forEach(async (friend) => {
			console.log(friend);
			if (friend.termType == "NamedNode") {
				await fetcher.load(friend);
				const fullName = store.any(friend, FOAF('name'));
				const s = "<a href=" + friend.uri + " target=_blank>" + friend.uri + "</a>";
				$('#friends').append(
					$('<li>').append("" + (fullName && (fullName.value || friend.value)) + " " + s));
			}
		});
	});
};