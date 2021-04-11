import { render, fireEvent } from "@testing-library/react";
import AdminManageUsers from "../components/AdminManageUsers";
import { getNormalUsers } from "../api/api.js";

test("check that we are in the manage users page", async () => {
    const { getByText } = render(<AdminManageUsers />);
    expect(getByText("UsersList")).toBeInTheDocument();
});

test("check that we can see all users with normal role", async () => {
    const { getByText } = render(<AdminManageUsers />);
    expect(getByText("UsersList")).toBeInTheDocument();
    getNormalUsers().then((value) => {
        for(var i = 0; i < value.length; i++){
            expect(getByText(value[i].webId)).toBeInTheDocument();
        }
    });
});

test("check that we can delete any users with normal role", async () => {    
    const { getByText, getByTestId, queryByText } = render(<AdminManageUsers />);
    expect(getByText("UsersList")).toBeInTheDocument();

    var count =-1;
    var usersWebIdList = [];
    getNormalUsers().then((value) => {
        for(var i = 0; i < value.length; i++){
            expect(getByText(value[i].webId)).toBeInTheDocument();
            usersWebIdList[i] = value[i].webId;
            count++;
        }
    });
    while(count >= 0){
        fireEvent.click(getByTestId(usersWebIdList[count]));
        var webId = queryByText(usersWebIdList[count]);
        expect(webId).toBeNull();
        count--;
    }
    expect(count).toBe(-1);
});