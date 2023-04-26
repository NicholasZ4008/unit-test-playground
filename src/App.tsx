import {
  Button,
  Divider,
  Form,
  Layout,
  message,
  PageHeader,
  Switch,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import ThemeButton from "components/ThemeButton";
import Timer from "components/Timer";
import ThemeProvider from "contexts/ThemeContext";
import { themeReducer } from "contexts/themeReducer";
import { ContactFormData } from "interfaces/forms";
import { useEffect, useReducer, useState } from "react";
import {
  DARK_THEME,
  LIGHT_THEME,
  SET_THEME_PRIMARY_COLOR,
  TOGGLE_THEME,
} from "utils/constants";
import { sleep } from "utils/helpers";
import "./App.css";
import Card from "./components/Card";
import { ContactForm } from "./components/Forms/ContactForm";
import MyTodo from "components/MyTodo";
import ColorPicker from "components/ColorPicker";
import CustomParagraph from "components/CustomParagraph";

const defaultTheme = {
  theme: localStorage.getItem("theme") ?? LIGHT_THEME,
  color: "#000000",
  bgColor: "#FFFFFF", 
  paragraphColor: "#000000"
};

function App() {
  const [themeState, setThemeState] = useReducer(themeReducer, defaultTheme);
  const { theme, color: themeColor} = themeState;
  const [contactForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitContactForm = async (values: ContactFormData) => {
    console.log(values);
    setSubmitting(true);
    await sleep(1000);
    message.success("Changes Saved");
    contactForm.resetFields();
    setSubmitting(false);
  };

  useEffect(() => {
    if (theme === LIGHT_THEME) {
      document.documentElement.classList.remove(DARK_THEME);
      localStorage.theme = LIGHT_THEME;
    }

    if (theme === DARK_THEME) {
      document.documentElement.classList.add(DARK_THEME);
      localStorage.theme = DARK_THEME;
    }
  }, [theme]);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === DARK_THEME ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add(DARK_THEME);
    } else {
      document.documentElement.classList.remove(DARK_THEME);
    }

    const fetchData = async () => {
      setLoading(true);
      await new Promise((res, rej) => {
        setTimeout(() => {
          console.log("fetch succeeded");
          res(true);
        }, 2000);
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider state={themeState} setState={setThemeState}>
      <div className="App ">

        <MyTodo/>

        <Layout className="dark:bg-gray-700">
          <div className="w-full bg-white dark:bg-black ">
            <div className="container mx-auto">
              <PageHeader
                className="md:px-0"
                title={
                  <span className="dark:text-gray-400">
                    Unit Test Playground
                  </span>
                }
                extra={[
                  <>
                    <Switch
                      checked={theme === DARK_THEME}
                      className={`${
                        theme !== DARK_THEME ? "bg-gray-500" : "bg-blue-500 "
                      }`}
                      onChange={() => setThemeState({ type: TOGGLE_THEME })}
                    />
                    <span className="dark:text-gray-300">Dark Mode</span>
                  </>,
                ]}
              ></PageHeader>
            </div>
          </div>
          <Content className="container mx-auto h-screen py-20">
            <Card>
              <ContactForm
                form={contactForm}
                editMode
                loading={loading || submitting}
                onSubmit={handleSubmitContactForm}
              />
            </Card>
            <Timer />
            <ThemeButton />
            <Button
              type="primary"
              className="ml-3 bg-blue-500 dark:bg-sky-700 dark:border-sky-700"
              onClick={() =>
                setThemeState({
                  type: SET_THEME_PRIMARY_COLOR,
                  payload: {
                    color: "blue",
                  },
                })
              }
            >
              SET BLUE THEME
            </Button>
            <Button
              type="primary"
              className="ml-3 bg-blue-500 dark:bg-sky-700 dark:border-sky-700"
              onClick={() =>
                setThemeState({
                  type: SET_THEME_PRIMARY_COLOR,
                  payload: {
                    color: "red",
                  },
                })
              }
            >
              SET RED THEME
            </Button>
            <Divider className="mt-5" />
            <Card>
              <p style={{ color: themeColor }} className="text-3xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
                quia provident nemo non, at ullam soluta repellat ipsam sapiente
                nihil dicta voluptate optio ut doloribus veritatis, laudantium
                maiores quis in.
              </p>
            </Card>
            
            <CustomParagraph/>
            <ColorPicker/>
          </Content>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
