import { render } from "@testing-library/react";
import AboutUs from "../components/AboutUs";

test("check that we are in the about us page", async () => {
    const { getByText } = render(<AboutUs />);
    expect(getByText("What is Radarin?")).toBeInTheDocument();
    expect(getByText("Team members")).toBeInTheDocument();
    expect(getByText("Andrea García Cernuda - uo270115")).toBeInTheDocument();
    expect(getByText("Marcos Fernández González - uo270803")).toBeInTheDocument();
    expect(getByText("Sara Rubín Estrada-Nora - uo270185")).toBeInTheDocument();
    expect(getByText("Luis Fernández Suárez - uo271405")).toBeInTheDocument();
    expect(getByText("Héctor Díaz Beltrán - uo269787")).toBeInTheDocument();
    expect(getByText("Company")).toBeInTheDocument();
    expect(getByText("RadarinEn2b: students enrolling Software Architecture course in Computer Software Engineering, University of Oviedo")).toBeInTheDocument();
});