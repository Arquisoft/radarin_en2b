import { render, fireEvent } from "@testing-library/react";
import MyNavBar from "../components/MyNavBar";
//import LogIn from "../components/LogIn";

test("check that we are in the nav bar", async () => {
    const { getByText, getByAltText, getByTestId } = render(<MyNavBar />);
    expect(getByAltText("logo")).toBeInTheDocument();
    expect(getByText("Radarin")).toBeInTheDocument();
    expect(getByTestId("link-friend-list")).toBeInTheDocument();
    expect(getByTestId("link-map")).toBeInTheDocument();
    expect(getByTestId("link-my-locations")).toBeInTheDocument();
    expect(getByTestId("link-locations-map")).toBeInTheDocument();
    expect(getByTestId("link-my-tags")).toBeInTheDocument();
    expect(getByTestId("link-tags-map")).toBeInTheDocument();
    //expect(getByText("Manage users")).toBeInTheDocument();  not possible to be checked
    //expect(getByText("Prometheus")).toBeInTheDocument();
    //expect(getByText("Grafana")).toBeInTheDocument();
    expect(getByTestId("link-about-us")).toBeInTheDocument();
    expect(getByText("Logged in as")).toBeInTheDocument();
    expect(getByText("Log Out")).toBeInTheDocument();
});

test("check that we can move to notifications view", async () => {
    const { getByText, getByTestId } = render(<MyNavBar />);
    fireEvent.click(getByTestId("link-notifications"));
    expect(getByText("Each and every step described before is very important, if they are not completed, you will not be able to create chats by yourself, you will only be able to interact in those your friends have invited you to")).toBeInTheDocument();
    expect(getByText("After completing the steps, you are now able to create your own chats. Remember, Solid Pods are a new technology, and its not the fastest, so be patient if tour messages or chats take a while to appear. Enjoy!")).toBeInTheDocument();
    expect(getByText("Understood")).toBeInTheDocument();

});

test("check that we can move to friends view", async () => {
    const { getByText, getByTestId} = render(<MyNavBar />);
    fireEvent.click(getByTestId("link-friend-list"));
    expect(getByText("Nearby friends")).toBeInTheDocument();
    expect(getByText("All friends")).toBeInTheDocument();
});


test("check that we can move to map view", async () => {
    const { getByText, getByTestId } = render(<MyNavBar />);
    fireEvent.click(getByTestId("link-map"));
    expect(getByText("My current location and friends")).toBeInTheDocument();
});

test("check that we can move to my locations page", async () => {
    const { getByText, getByTestId } = render(<MyNavBar />);
    fireEvent.click(getByTestId("link-my-locations"));
    expect(getByText("Locations")).toBeInTheDocument();
    expect(getByText("Date and time")).toBeInTheDocument();
    expect(getByText("Actions")).toBeInTheDocument();
    expect(getByText("Delete All Locations")).toBeInTheDocument();
});

test("check that we can move to locations map page", async () => {
    const { getByText, getByTestId } = render(<MyNavBar />);
    fireEvent.click(getByTestId("link-locations-map"));
    expect(getByText("My locations")).toBeInTheDocument();
    expect(getByTestId("mainDiv")).toBeInTheDocument();
});

test("check that we can move to my tags page", async () => {
    const { getByText, getAllByText, getByTestId } = render(<MyNavBar />);
    fireEvent.click(getByTestId("link-my-tags"));
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
    const { getByTestId } = render(<MyNavBar />);
    fireEvent.click(getByTestId("link-tags-map"));
    expect(getByTestId("mainDiv")).toBeInTheDocument();
});

test("check that we can move to about us view", async () => {
    const { getByText, getByTestId } = render(<MyNavBar />);
    fireEvent.click(getByTestId("link-about-us"));
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
    expect(getByText("RadarinEn2b: students enrolling Sotware Architecture course in Computer Software Engineering, University of Oviedo")).toBeInTheDocument();
    expect(getByText("Learn more")).toBeInTheDocument();
});

test("check that we can move back to home view", async () => {
    const { getByText, getByAltText, getByTestId } = render(<MyNavBar />);
    fireEvent.click(getByText("Radarin"));
    expect(getByText("Welcome to Radarin!")).toBeInTheDocument();
    expect(getByText("But... what is Radarin? It is an app developed by third year Software Engineering from the University of Oviedo, coursing the Software Architecture subject. The main objetive of the Radarin is keeping you in touch with your friends, wherever and whenever you want. This React app supports the Solid project, created by Sir Tim Berners-Lee, and works through Inrupt.")).toBeInTheDocument();
    expect(getByText("Let's get started!")).toBeInTheDocument();
    expect(getByText("See where are your friends in real time")).toBeInTheDocument();
    expect(getByText("Contact with your friends")).toBeInTheDocument();
    expect(getByText("Go see how far your friends are in your friend list. You may be tempted to check this after Radarin sends you a notification telling you that a friend is less than one kilometer away. In the list, you will see the exact distance between both of you. In this section you also have the option to add and delete friends.")).toBeInTheDocument();
    expect(getByText("Interact with your friends")).toBeInTheDocument();
    expect(getByText("Are any of your friends near? Then go interact with them! In the notification section, you will have a list of your friends' last interactions: if they were near or maybe, they sent you a message! In Radarin you can get in touch with your friends, sending them a message that they will recieve as notification in real time.")).toBeInTheDocument();
    expect(getByText("Save your special spots")).toBeInTheDocument();
    expect(getByText("If you have found an special spot for you and you want to save it forever, Radarin makes easy for you. In the section My tags, you will find the possibility of creating a custom tag that will later appear in your own tags map, so that if you want to come back in another moment, the app will be there for you.")).toBeInTheDocument();


    fireEvent.click(getByTestId("link-about-us"));

    fireEvent.click(getByAltText("logo"));
    expect(getByText("Welcome to Radarin!")).toBeInTheDocument();
    expect(getByText("But... what is Radarin? It is an app developed by third year Software Engineering from the University of Oviedo, coursing the Software Architecture subject. The main objetive of the Radarin is keeping you in touch with your friends, wherever and whenever you want. This React app supports the Solid project, created by Sir Tim Berners-Lee, and works through Inrupt.")).toBeInTheDocument();
    expect(getByText("Let's get started!")).toBeInTheDocument();
    expect(getByText("See where are your friends in real time")).toBeInTheDocument();
    expect(getByText("Contact with your friends")).toBeInTheDocument();
    expect(getByText("Go see how far your friends are in your friend list. You may be tempted to check this after Radarin sends you a notification telling you that a friend is less than one kilometer away. In the list, you will see the exact distance between both of you. In this section you also have the option to add and delete friends.")).toBeInTheDocument();
    expect(getByText("Interact with your friends")).toBeInTheDocument();
    expect(getByText("Are any of your friends near? Then go interact with them! In the notification section, you will have a list of your friends' last interactions: if they were near or maybe, they sent you a message! In Radarin you can get in touch with your friends, sending them a message that they will recieve as notification in real time.")).toBeInTheDocument();
    expect(getByText("Save your special spots")).toBeInTheDocument();
    expect(getByText("If you have found an special spot for you and you want to save it forever, Radarin makes easy for you. In the section My tags, you will find the possibility of creating a custom tag that will later appear in your own tags map, so that if you want to come back in another moment, the app will be there for you.")).toBeInTheDocument();

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