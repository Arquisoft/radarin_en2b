import { render } from "@testing-library/react";
import FriendList from "../components/FriendList";

test("check that we are in the friend list", async () => {
    const { getByText, getByAltText } = render(<FriendList />);
    expect(getByAltText("userLogo")).toBeInTheDocument();
    expect(getByText("Nearby friends")).toBeInTheDocument();
    expect(getByText("All friends")).toBeInTheDocument();
});