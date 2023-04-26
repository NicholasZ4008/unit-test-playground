import {
  DARK_THEME,
  LIGHT_THEME,
  SET_THEME_DARK,
  SET_THEME_LIGHT,
  TOGGLE_THEME,
  CHANGE_THEME_COLOR,
  SET_THEME_PRIMARY_COLOR,
} from "utils/constants";

import { ThemeStateProps } from "./ThemeContext";

export const themeReducer = (state: ThemeStateProps , action: any) => {
  switch (action.type) {
    case TOGGLE_THEME: {
      const theme = state.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      localStorage.setItem("theme", theme);
      return { ...state, theme };
    }
    case SET_THEME_DARK: {
      localStorage.setItem("theme", DARK_THEME);
      return { ...state, theme: DARK_THEME };
    }
    case SET_THEME_LIGHT: {
      localStorage.setItem("theme", LIGHT_THEME);
      return { ...state, theme: LIGHT_THEME };
    }
    case SET_THEME_PRIMARY_COLOR: {
      return { ...state, color: action.payload.color };
    }
    case CHANGE_THEME_COLOR: {
      return{...state, paragraphColor: action.paragraphPayload.paragraphColor, bgColor: action.paragraphPayload.bgColor}
    }
    default:
      return state;
  }
};
