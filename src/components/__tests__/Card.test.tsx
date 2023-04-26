import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Testing Card Component", () => {
  it("should render the component properly", () => {
    render(<Card />);
    const cardComponent = screen.getByTestId(/card-component/i);
    expect(cardComponent).toBeInTheDocument();// removed not
  });

  it("should render the loading component properly when loading", () => {
    render(<Card loading/>);
    
    const loadingComponent = screen.getByTestId('loading-component');
    expect(loadingComponent).toBeInTheDocument();
  });

  it("should render the children properly when finished loading", () => {
    render(
      <Card>
        <span>Children</span>
      </Card>
    );
    
    // add code
    const childrenText = screen.getByText(/Children/i);//added this line to find childrenText
    expect(childrenText).toBeInTheDocument();//changed false to childrenText
  });
});
