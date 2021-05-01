import { render } from "@testing-library/react";
import Prometheus from "../components/Prometheus";

test("check that the prometheus view renders correctly", async () => {
    const { getByTestId } = render(<Prometheus />);
    expect(getByTestId("div-embed")).toBeInTheDocument();
    expect(getByTestId("iframe-prometheus")).toBeInTheDocument();
});