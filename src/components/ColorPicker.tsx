import { useThemeContext } from "contexts/ThemeContext";
import { Button } from "antd";
import { CHANGE_THEME_COLOR } from "utils/constants";


export default function ColorPicker(){
    const { setState: setThemeState } = useThemeContext();
    
    return(
        <div className="bg-white rounded-md p-2 shadow-md dark:bg-gray-500 w-32 flex items-center mx-auto" data-testid="color-picker">
            <Button
                type="default"
                shape="circle"
                onClick={() => setThemeState({ 
                    type: CHANGE_THEME_COLOR,
                    paragraphPayload:{
                        paragraphColor:"lightcoral",
                        bgColor:"red",
                    }, 
                })}
                className="bg-red-500 text-red-500 dark:bg-red-500 dark:text-white"
                data-testid="red-theme"
                >
                R
            </Button>

            <Button
                type="default"
                shape="circle"
                onClick={() => setThemeState({ 
                    type: CHANGE_THEME_COLOR,
                    paragraphPayload:{
                        paragraphColor:"black",
                        bgColor:"blue",
                    }, 
                })}
                className="bg-blue-500 text-blue-500 dark:bg-blue-500 dark:text-white"
                data-testid="blue-theme"
                >
                B
            </Button>

            <Button
                type="default"
                shape="circle"
                onClick={() => setThemeState({ 
                    type: CHANGE_THEME_COLOR,
                    paragraphPayload:{
                        paragraphColor:"white",
                        bgColor:"green",
                    }, 
                })}
                className="bg-green-500 text-green-500 dark:bg-green-500 dark:text-white"
                data-testid="green-theme"
                >
                G
            </Button>
        </div>
    );
}