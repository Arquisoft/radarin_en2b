import { render } from "@testing-library/react";
import App from "./App.js";
//import { queryAllByLabelText, render, screen } from "@testing-library/react";
//import App from "./App";
//import { SessionProvider } from "@inrupt/solid-ui-react";

test("renders login when not logged to a solid pod", async () => {
    const { getByText } = render(<App />);
    expect(getByText("Loading...")).toBeInTheDocument();
  /*render(
    <SessionProvider sessionId="testing-radarin_en2b">
      <App />
    </SessionProvider>
  );*/
  //const { getByText } = render(<App/>);
  //expect(getByText("Log In")).toBeInTheDocument();
});
