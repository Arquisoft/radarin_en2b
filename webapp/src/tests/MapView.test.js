import React from "react";
import { render } from "@testing-library/react";
import MapView from "../components/MapView";

test("check that the map renders properly", async () => {
    const { getByText } = render(<MapView />);
    expect(getByText("Map")).toBeInTheDocument();
});