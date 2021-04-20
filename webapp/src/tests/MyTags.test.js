import { render } from "@testing-library/react";
import MyTags from "../components/MyTags";

test("check that we are in the my tags page", async () => {
    const { getByText, getAllByText } = render(<MyTags />);
    expect(getByText("Create a tag location")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Description (optional)")).toBeInTheDocument();
    expect(getByText("Tag locations list")).toBeInTheDocument();
    expect(getAllByText("Tag name and description")[0]).toBeInTheDocument();
    expect(getAllByText("Creation date and time")[0]).toBeInTheDocument();
    expect(getAllByText("Coordinates")[0]).toBeInTheDocument();
    expect(getByText("Actions")).toBeInTheDocument();
    expect(getByText("Search tags")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
    expect(getAllByText("Tag name and description")[1]).toBeInTheDocument();
    expect(getAllByText("Creation date and time")[1]).toBeInTheDocument();
    expect(getAllByText("Coordinates")[1]).toBeInTheDocument();
});