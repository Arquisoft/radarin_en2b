import React from 'react'
import { render, getByText } from "@testing-library/react";
import AboutUs from "./AboutUs";

test('check that the we are in the home page', async () => {
    const { getByText } = render(<AboutUs/>);
    expect(getByText("Team members")).toBeInTheDocument();
  });