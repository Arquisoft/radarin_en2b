import React from "react";
import { render } from "@testing-library/react";
import Notifications from "../components/Notifications";

test("check that notifications renders properly", async () => {
    const { getByText } = render(<Notifications/>);
    expect(getByText("Right now you are in")).toBeInTheDocument();
});