import React from "reac";
import { render, fireEvent, getByText } from "@testing-library/react";
import UserList from "../components/FriendList";

test('check that the list of users renders propertly', async () => {
    //antiguo test de UserList.test.js
    //const userList = [{name: 'Pablo', email: 'gonzalezgpablo@uniovi.es' }];
    //const {getByText} = render(<UserList users={userList}/>);
    //expect(getByText(userList[0].name +' ('+userList[0].email+')')).toBeInTheDocument();
});