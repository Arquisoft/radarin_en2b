import { queryAllByLabelText, render, screen } from '@testing-library/react';
import App from './App';
import { SessionProvider } from '@inrupt/solid-ui-react';

test('renders login when not logged to a solid pod', () => {
    
const { getByText } = render(<App/>);
  expect(getByText("Log In")).toBeInTheDocument();
});
