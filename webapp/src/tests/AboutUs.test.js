import { render } from "@testing-library/react";
import AboutUs from "../components/AboutUs";

test("check that we are in the about us page", async () => {
    const { getByText } = render(<AboutUs />);
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