import { render } from "@testing-library/react";
import Home from "../components/Home";

test("check that we are in the home page", async () => {
    const { getByText } = render(<Home />);
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