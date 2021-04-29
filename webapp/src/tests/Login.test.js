import { render } from "@testing-library/react";
import LogIn from "../components/LogIn";

test("check that the login button renders properly", async () => {
    const { getByText } = render(<LogIn/>);
    expect(getByText("Identity Provider")).toBeInTheDocument();
    expect(getByText("Log In")).toBeInTheDocument();
    expect(getByText("Don't have a pod?")).toBeInTheDocument();
});