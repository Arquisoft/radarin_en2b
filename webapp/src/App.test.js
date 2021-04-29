import { render } from "@testing-library/react";
import App from "./App";

test("renders login when not logged to a solid pod", () => {
  const { getByText } = render(<App />);
  expect(getByText("Loading...")).toBeInTheDocument();
});
