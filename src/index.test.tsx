import { render, screen } from "@testing-library/react";
import App from "App";
import { Provider } from "react-redux";
import store from "store/root";
import React from "react";


window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
};

describe("react testing for index.test.tsx",()=>{
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the application without crashing",()=>{
        render(
            <React.StrictMode>
                <Provider store={store}>
                    <App></App>
                </Provider>
            </React.StrictMode>
        );
        
        const headerText = screen.getByText("To-Do App");
        expect(headerText).toBeInTheDocument();
    })
})