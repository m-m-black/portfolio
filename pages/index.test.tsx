import { render, screen } from "@testing-library/react";
import Home from "./index.page";

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Morgan Black" })).toBeInTheDocument();
  });

  it("renders a link to GitHub", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /m-m-black/i });
    expect(link).toHaveAttribute("href", "https://github.com/m-m-black");
  });
});
