import { render } from "@testing-library/react";
import MyLocations from "../components/MyLocations";

test("check that we are in the about us page", async () => {
    const { getByText } = render(<MyLocations />);
    expect(getByText("Locations")).toBeInTheDocument();
    expect(getByText("Date and time")).toBeInTheDocument();
    expect(getByText("Actions")).toBeInTheDocument();
});