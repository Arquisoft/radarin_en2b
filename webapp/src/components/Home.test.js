import React from 'react'
import { render, getByText } from "@testing-library/react";
import Home from "./Home";

test('check that the we are in the home page', async () => {
    const { getByText } = render(<Home/>);
    expect(getByText("Welcome!")).toBeInTheDocument();
  });