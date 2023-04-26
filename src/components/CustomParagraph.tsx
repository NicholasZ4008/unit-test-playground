import { useThemeContext} from "contexts/ThemeContext";

export default function CustomParagraph(){

    const {state: paragraphThemeState} = useThemeContext(); //setting themeState.state = themeState
    
    const {paragraphColor: themeColor, bgColor:themeBG} = paragraphThemeState;

    return(
        <div style={{backgroundColor: themeBG}} className="mt-4 text-4xl bg-white rounded-md w-full p-10 shadow-md dark:bg-gray-500" data-testid="custom-paragraph">
            <h2 style ={{color:themeColor}} data-testid="custom-paragraph-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex repellat officiis autem modi eos, labore ut rerum. Repudiandae reiciendis consequatur esse similique a laboriosam distinctio. Inventore culpa ad dolores esse.
            </h2>
        </div>
    );
}