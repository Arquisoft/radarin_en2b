import React, { useState } from "react";
import { LoggedIn, LoggedOut, AuthButton, Value, List, withWebId } from "@solid/react";
import { useSession } from "@inrupt/solid-ui-react";

const Amigos = () => {
    const{ session } = useSession();
    const [activeProfile] = useState(session.info.webId);

    return (
        <div>
            <h1>Profile viewer</h1>
            {activeProfile &&
                <dl>
                    <dt>Full name</dt>
                    <dd><Value src={`[${activeProfile}].name`} /></dd>
                    <dt>Friends</dt>
                    <dd>
                        <List src={`[${activeProfile}].friends`}>{friend =>
                            <li key={friend}>
                                    <Value src={`[${friend}].name`}>{`${friend}`}</Value>
                            </li>}
                        </List>
                    </dd>
                </dl>}
        </div>
    );
}

export default withWebId(Amigos);