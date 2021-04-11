import { render } from "@testing-library/react";
import Home from "../components/Home";

test("check that we are in the home page", async () => {
    const { getByText } = render(<Home />);
    expect(getByText("Welcome!")).toBeInTheDocument();
    expect(getByText("We are very pleasured to see you again")).toBeInTheDocument();
    expect(getByText("Have a nice day and experience :)")).toBeInTheDocument();
});