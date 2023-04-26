import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import CustomParagraph from "components/CustomParagraph"
import ColorPicker from "components/ColorPicker"
import ThemeProvider from "contexts/ThemeContext"

describe("Tests if ColorPicker affects customParagraph accordingly", ()=>{
    
    const mockThemeState = {
        bgColor: "white",
        color: "black",
        theme: "light",
        paragraphColor: "gray",
    };
    
    const mockSetThemeState = jest.fn();

    it("should render the CustomParagraph and ColorPicker Components",()=>{
        
        render(
            <div>
                <ThemeProvider state={mockThemeState} setState={mockSetThemeState} handler={{}}>
                    <CustomParagraph/>
                    <ColorPicker/>
                </ThemeProvider>
            </div>
        );

        const customParagraph = screen.getByTestId("custom-paragraph")
        const colorPicker = screen.getByTestId('color-picker')

        expect(customParagraph).toBeInTheDocument();
        expect(colorPicker).toBeInTheDocument();
    })

    it("should display CustomParagraph with a default color on inital render", async ()=>{
        render(
            <ThemeProvider state={mockThemeState} setState={mockSetThemeState} handler={{}}>
                <CustomParagraph/>
            </ThemeProvider>
        );
        
        const customParagraph = screen.getByTestId("custom-paragraph");
        const text = customParagraph.querySelector("h2");

        if (text) {
            const textColor = window.getComputedStyle(text).color;
            const bgColor = window.getComputedStyle(customParagraph).backgroundColor;

            await waitFor(() => {
            // wait for the change in the DOM before running expect
                expect(textColor).toBe("gray");
                expect(bgColor).toBe("white");
            });
        } else {
            throw new Error("text not found");
        }
    })
    it("should change color accordingly when color buttons are clicked",()=>{
        render(
            <ThemeProvider state={mockThemeState} setState={mockSetThemeState} handler={{}}>
                <CustomParagraph/>
                <ColorPicker/>
            </ThemeProvider>
        );

        const redButton = screen.getByTestId("red-theme")
        const blueButton = screen.getByTestId("blue-theme")
        const greenButton = screen.getByTestId("green-theme")
        
        const customParagraph = screen.getByTestId("custom-paragraph");
        const text = customParagraph.querySelector("h2") as HTMLElement;

        const textColor = window.getComputedStyle(text).color;
        const bgColor = window.getComputedStyle(customParagraph).backgroundColor;

        if(redButton){
            fireEvent.click(redButton);
        }

        setTimeout(() => {
            expect(textColor).toBe("lightcoral");
            expect(bgColor).toBe("red");
        }, 1000);
        
        if(blueButton){
            fireEvent.click(blueButton);
       }

       setTimeout(() => {
            expect(textColor).toBe("black");
            expect(bgColor).toBe("blue");
       }, 1500);

       if(greenButton){
            fireEvent.click(greenButton);
       }

       setTimeout(() => {
            expect(textColor).toBe("white");
            expect(bgColor).toBe("green"); 
       }, 2000);
    })
    
    it("should be able to change color theme even after buttons are clicked in multiple succession",()=>{
        render(
            <ThemeProvider state={mockThemeState} setState={mockSetThemeState} handler={{}}>
                <CustomParagraph/>
                <ColorPicker/>
            </ThemeProvider>
        );
        const redButton = screen.getByTestId("red-theme")
        const blueButton = screen.getByTestId("blue-theme")
        
        const customParagraph = screen.getByTestId("custom-paragraph");
        const text = customParagraph.querySelector("h2") as HTMLElement;

        const textColor = window.getComputedStyle(text).color;
        const bgColor = window.getComputedStyle(customParagraph).backgroundColor;

        if(redButton){
            fireEvent.click(redButton);
        }

        setTimeout(() => {
            expect(textColor).toBe("lightcoral");
            expect(bgColor).toBe("red");
        }, 1000);
        
        if(blueButton){
            fireEvent.click(blueButton);
       }

       setTimeout(() => {
            expect(textColor).toBe("black");
            expect(bgColor).toBe("blue");
       }, 1500);

       fireEvent.click(redButton);

       setTimeout(() => {
            expect(textColor).toBe("lightcoral");
            expect(bgColor).toBe("red"); 
       }, 2000);
    })

    it("should change any color theme selected back to default color when reloading the page", ()=>{
        render(
            <ThemeProvider state={mockThemeState} setState={mockSetThemeState} handler={{}}>
                <CustomParagraph/>
                <ColorPicker/>
            </ThemeProvider>
        );

        const greenButton = screen.getByTestId("green-theme")
        
        const customParagraph = screen.getByTestId("custom-paragraph");
        const text = customParagraph.querySelector("h2") as HTMLElement;

        const textColor = window.getComputedStyle(text).color;
        const bgColor = window.getComputedStyle(customParagraph).backgroundColor;

        if(greenButton){
            fireEvent.click(greenButton);
        }

        setTimeout(() => {
            expect(textColor).toBe("white");
            expect(bgColor).toBe("green"); 
        }, 500);

        window.location.reload();//mock a page reload

        setTimeout(() => {
            expect(textColor).toBe("black");
            expect(bgColor).toBe("white"); 
        }, 1000);
    })
})