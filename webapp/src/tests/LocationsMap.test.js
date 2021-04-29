import { render } from "@testing-library/react";
import LocationsMap from "../components/TagsMap";

test("check that the locations map renders properly with geolocation activated", async () => {
    const mockGeolocation = {
        getCurrentPosition: jest.fn()
          .mockImplementationOnce((success) => Promise.resolve(success({
            coords: {
              latitude: 43.4189602,
              longitude: -5.8881645
            }
        })))
    };
    global.navigator.geolocation = mockGeolocation;

    global.navigator.permissions = {
        query: jest
          .fn()
          .mockImplementationOnce(() => Promise.resolve({ state: "granted" })),
    };
    const { getByTestId } = render(<LocationsMap />);
    expect(getByTestId("mainDiv")).toBeInTheDocument();
});