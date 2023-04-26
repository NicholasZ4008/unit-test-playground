import { fireEvent, getByDisplayValue, getByTestId, render, screen } from "@testing-library/react";
import MyTodo from "components/MyTodo";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "store/rootReducer";
import { cleanup } from "@testing-library/react";
import { Todo } from "store/todos/actionTypes";
//import { setTimeout } from "timers/promises";

// const mockAddTodo = jest.fn();
// const mockEditTodo = jest.fn();
// const mockSaveTodo = jest.fn();
// const mockDeleteTodo = jest.fn();

// const mockTodos: Todo[] = [
//     { id: 1, text: "Mock todo 1", status: "view" },
//     { id: 2, text: "Mock todo 2", status: "view" },
//   ];

// Mock the store
const store = createStore(rootReducer);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
};


describe("testing my todo app", ()=>{
    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    it("should render the component", ()=>{
        const { getByText } = render(
            <Provider store={store}>
              <MyTodo />
            </Provider>
        );
        expect(getByText("To-Do App")).toBeInTheDocument();
    })

    it("should render all the elements of the component", ()=>{
        render(
            <Provider store={store}>
              <MyTodo/>
            </Provider>
        );

        const inputForm = screen.getByTestId("input-form")
        expect(inputForm).toBeInTheDocument();

        const addBtn = screen.getByTestId("add-btn");
        expect(addBtn).toBeInTheDocument();

        const editBtn = screen.getAllByTestId("edit-btn");
        expect(editBtn[0]).toBeInTheDocument();

        const delBtn = screen.getAllByTestId("del-btn");
        expect(delBtn[0]).toBeInTheDocument();
    })

    it("the input form should be able to be typed in", ()=>{
        render(
            <Provider store={store}>
              <MyTodo/>
            </Provider>
        );

        const inputForm = screen.getByPlaceholderText("enter a Todo") as HTMLInputElement

        fireEvent.change(inputForm, {target:{value:"test"}})

        expect(inputForm.value).toBe("test")
    })  

    it("should not submit on an empty form",()=>{
        
        render(
            <Provider store={store}>
              <MyTodo/>
            </Provider>
        );

        const addBtn = screen.getByTestId("add-btn");
        const todoText = screen.queryAllByTestId("todo-text");

        fireEvent.click(addBtn)

        expect(todoText[2]).toBeUndefined();
    })

    it("should add an element when input field is typed and the add button is click", ()=>{
        render(
            <Provider store={store}>
              <MyTodo/>
            </Provider>
        );

        const inputForm = screen.getByPlaceholderText("enter a Todo") as HTMLInputElement
        const addBtn = screen.getByTestId("add-btn");
        const todoText = screen.getAllByTestId("todo-text");

        fireEvent.change(inputForm, {target:{value:"test"}})

        setTimeout(() => {
            fireEvent.click(addBtn) 
        }, 500);
        
        setTimeout(() => {
            expect(todoText[2]).toBeInTheDocument()
        },550);
        
    })

    it("should activate edit mode when pressing the edit button", ()=>{
        render(
            <Provider store={store}>
              <MyTodo/>
            </Provider>
        );

        const editBtn = screen.getAllByTestId("edit-btn");
        fireEvent.click(editBtn[0]);


        setTimeout(() => {
            const todoEditInput = screen.getByTestId("todo-edit-input")
            expect(todoEditInput).toBeInTheDocument();
        }, 100);

    })

    it("should delete an element when pressing the delete button", ()=>{
        render(
            <Provider store={store}>
              <MyTodo/>
            </Provider>
        );

        const delButton = screen.getAllByTestId("del-btn")
        const todoText = screen.getAllByTestId("todo-text");

        fireEvent.click(delButton[0]);

        expect(todoText[0]).not.toBeInTheDocument();
    })

    it("should save any changes in edit mode", async ()=>{
        render(
            <Provider store={store}>
              <MyTodo/>
            </Provider>
        );
 
        const editBtn = screen.getAllByTestId("edit-btn");

        //1. click edit btn
        fireEvent.click(editBtn[0])

        const editInputForm = screen.getAllByTestId('todo-edit-input')

        setTimeout(() => {
            //2. change some input
            fireEvent.change(editInputForm[0], {target:{value:"test"}})
        },100);

        setTimeout(() => {
            //3. save that input
            const saveBtn = screen.getAllByTestId('save-btn')
            fireEvent.click(saveBtn[0]);
        }, 200);

        setTimeout(() => {
            //4. expect that the text changed to test.
            const todoText = screen.getAllByTestId("todo-text"); 
            expect(todoText).toBe("test");
        },300);
    })
})