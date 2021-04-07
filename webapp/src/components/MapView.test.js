import React from 'react'
import { render, getByText } from "@testing-library/react";
import MapView from "./MapView";

test('check that the map renders properly', async () => {
    const { getByText } = render(<MapView/>);
    expect(getByText("Map")).toBeInTheDocument();
});