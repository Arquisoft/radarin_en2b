import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MyNavBar from "../components/MyNavBar";
//import LogIn from "../components/LogIn";

test("check that we are in the nav bar", async () => {
    const { getByText, getByAltText } = render(<MyNavBar />);
    expect(getByAltText("logo")).toBeInTheDocument();
    expect(getByText("Radarin")).toBeInTheDocument();
    expect(getByAltText("notifications")).toBeInTheDocument();
    expect(getByAltText("friends")).toBeInTheDocument();
    expect(getByAltText("map")).toBeInTheDocument();
    //expect(getByText("Manage users")).toBeInTheDocument();  not possible to be checked
    expect(getByText("About us")).toBeInTheDocument();
    expect(getByText("Logged in as")).toBeInTheDocument();
    expect(getByText("Log Out")).toBeInTheDocument();
});

test("check that we can move to friends view", async () => {
    const { getByText, getByAltText } = render(<MyNavBar />);
    fireEvent.click(getByAltText("friends"));
    expect(getByText("Amigos")).toBeInTheDocument();
});

test("check that we can move to notifications view", async () => {
    const { getByText, getByAltText } = render(<MyNavBar />);
    fireEvent.click(getByAltText("notifications"));
    expect(getByText("Right now you are in")).toBeInTheDocument();
    expect(getByText("All friends")).toBeInTheDocument();
});

test("check that we can move to map view ", async () => {
    const { getByText, getByAltText } = render(<MyNavBar />);
    fireEvent.click(getByAltText("map"));
    expect(getByText("Map")).toBeInTheDocument();
});

// test -> check that we can move to manage users view, it is not possible

test("check that we can move to about us view", async () => {
    const { getByText } = render(<MyNavBar />);
    fireEvent.click(getByText("About us"));
    expect(getByText("What is Radarin?")).toBeInTheDocument();
    expect(getByText("Team members")).toBeInTheDocument();
    expect(getByText("Andrea García Cernuda - uo270115")).toBeInTheDocument();
    expect(getByText("Marcos Fernández González - uo270803")).toBeInTheDocument();
    expect(getByText("Sara Rubín Estrada-Nora - uo270185")).toBeInTheDocument();
    expect(getByText("Luis Fernández Suárez - uo271405")).toBeInTheDocument();
    expect(getByText("Héctor Díaz Beltrán - uo269787")).toBeInTheDocument();
    expect(getByText("Company")).toBeInTheDocument();
    expect(getByText("RadarinEn2b: students enrolling Sotware Architecture course in Computer Software Engineering,University of Oviedo")).toBeInTheDocument();
});

test("check that we can move back to home view", async () => {
    const { getByText, getByAltText } = render(<MyNavBar />);
    fireEvent.click(getByText("Radarin"));
    expect(getByText("Welcome!")).toBeInTheDocument();

    fireEvent.click(getByAltText("notifications"));

    fireEvent.click(getByAltText("logo"));
    expect(getByText("Welcome!")).toBeInTheDocument();
    expect(getByText("We are very pleasured to see you again")).toBeInTheDocument();
    expect(getByText("Have a nice day and expirience :)")).toBeInTheDocument();
});

/*
test("check that we can logout", async () => {
    const { getByText } = render(<MyNavBar />);
    fireEvent.click(getByText("Log Out"));
    expect(getByText("Identity Provider")).toBeInTheDocument();
    expect(getByText("Log In")).toBeInTheDocument();
});*/