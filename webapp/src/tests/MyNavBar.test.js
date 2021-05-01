import { render, fireEvent } from "@testing-library/react";
import MyNavBar from "../components/MyNavBar";
//import LogIn from "../components/LogIn";

test("check that we are in the nav bar", async () => {
    const { getByText, getByAltText } = render(<MyNavBar />);
    expect(getByAltText("logo")).toBeInTheDocument();
    expect(getByText("Radarin")).toBeInTheDocument();
    expect(getByAltText("friends")).toBeInTheDocument();
    expect(getByAltText("map")).toBeInTheDocument();
    expect(getByText("My Locations")).toBeInTheDocument();
    expect(getByText("LocationsMap")).toBeInTheDocument();
    expect(getByText("My Tags")).toBeInTheDocument();
    expect(getByText("TagsMap")).toBeInTheDocument();
    //expect(getByText("Manage users")).toBeInTheDocument();  not possible to be checked
    //expect(getByText("Prometheus")).toBeInTheDocument();
    //expect(getByText("Grafana")).toBeInTheDocument();
    expect(getByText("About us")).toBeInTheDocument();
    expect(getByText("Logged in as")).toBeInTheDocument();
    expect(getByText("Log Out")).toBeInTheDocument();
});

test("check that we can move to notifications view", async () => {
    const { getByText, getByAltText } = render(<MyNavBar />);
    fireEvent.click(getByAltText("notifications"));
    //expect(getByText("?")).toBeInTheDocument();
});

test("check that we can move to friends view", async () => {
    const { getByText, getByAltText } = render(<MyNavBar />);
    fireEvent.click(getByAltText("friends"));
    expect(getByText("Nearby friends")).toBeInTheDocument();
    expect(getByText("All friends")).toBeInTheDocument();
});


test("check that we can move to map view", async () => {
    const { getByText, getByAltText } = render(<MyNavBar />);
    fireEvent.click(getByAltText("map"));
    expect(getByText("My current location and friends")).toBeInTheDocument();
});

test("check that we can move to my locations page", async () => {
    const { getByText } = render(<MyNavBar />);
    fireEvent.click(getByText("My Locations"));
    expect(getByText("Locations")).toBeInTheDocument();
    expect(getByText("Date and time")).toBeInTheDocument();
    expect(getByText("Actions")).toBeInTheDocument();
    expect(getByText("Delete All Locations")).toBeInTheDocument();
});

test("check that we can move to locations map page", async () => {
    const { getByText, getByTestId } = render(<MyNavBar />);
    fireEvent.click(getByText("LocationsMap"));
    expect(getByText("My locations")).toBeInTheDocument();
    expect(getByTestId("mainDiv")).toBeInTheDocument();
});

test("check that we can move to my tags page", async () => {
    const { getByText, getAllByText } = render(<MyNavBar />);
    fireEvent.click(getByText("My Tags"));
    expect(getByText("Create a tag location")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Description (optional)")).toBeInTheDocument();
    expect(getByText("Save tag location")).toBeInTheDocument();
    expect(getAllByText("Tag name and description")[0]).toBeInTheDocument();
    expect(getAllByText("Creation date and time")[0]).toBeInTheDocument();
    expect(getAllByText("Coordinates")[0]).toBeInTheDocument();
    expect(getByText("Actions")).toBeInTheDocument();
    expect(getByText("Search tags")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
    expect(getAllByText("Tag name and description")[1]).toBeInTheDocument();
    expect(getAllByText("Creation date and time")[1]).toBeInTheDocument();
    expect(getAllByText("Coordinates")[1]).toBeInTheDocument();
});

test("check that we can move to tags map page", async () => {
    const { getByText, getByTestId } = render(<MyNavBar />);
    fireEvent.click(getByText("TagsMap"));
    expect(getByTestId("mainDiv")).toBeInTheDocument();
});

test("check that we can move to about us view", async () => {
    const { getByText } = render(<MyNavBar />);
    fireEvent.click(getByText("About us"));
    expect(getByText("What is Radarin?")).toBeInTheDocument();
    expect(getByText("Radarin is a system to facilitate meetings between friends using new technologies.")).toBeInTheDocument();
    expect(getByText("To carry out the project’s aim, the application needs the mobile phone localization of the users who voluntarily activate it and allow the application to use it.")).toBeInTheDocument();
    expect(getByText("The users also need to allow their friends to know when they are near them. A notification will be sent in this situation so they can get in contact.")).toBeInTheDocument();
    expect(getByText("Team members")).toBeInTheDocument();
    expect(getByText("Andrea García Cernuda - uo270115")).toBeInTheDocument();
    expect(getByText("Marcos Fernández González - uo270803")).toBeInTheDocument();
    expect(getByText("Sara Rubín Estrada-Nora - uo270185")).toBeInTheDocument();
    expect(getByText("Luis Fernández Suárez - uo271405")).toBeInTheDocument();
    expect(getByText("Héctor Díaz Beltrán - uo269787")).toBeInTheDocument();
    expect(getByText("Company")).toBeInTheDocument();
    expect(getByText("RadarinEn2b: students enrolling Software Architecture course in Computer Software Engineering, University of Oviedo")).toBeInTheDocument();
});

test("check that we can move back to home view", async () => {
    const { getByText, getByAltText } = render(<MyNavBar />);
    fireEvent.click(getByText("Radarin"));
    expect(getByText("Welcome!")).toBeInTheDocument();
    expect(getByText("We are very pleasured to see you again")).toBeInTheDocument();
    expect(getByText("Have a nice day and experience :)")).toBeInTheDocument();

    fireEvent.click(getByAltText("notifications"));

    fireEvent.click(getByAltText("logo"));
    expect(getByText("Welcome!")).toBeInTheDocument();
    expect(getByText("We are very pleasured to see you again")).toBeInTheDocument();
    expect(getByText("Have a nice day and experience :)")).toBeInTheDocument();
});

// test -> check that we can move to manage users view, it is not possible
// test -> check that we can move to prometheus view, it is not possible
// test -> check that we can move to grafana view, it is not possible


test("check that we can logout", async () => {
    const { getByText } = render(<MyNavBar />);
    fireEvent.click(getByText("Log Out"));
    //expect(getByText("Identity Provider")).toBeInTheDocument();
    //expect(getByText("Log In")).toBeInTheDocument();
});