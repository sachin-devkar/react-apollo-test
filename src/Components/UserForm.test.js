import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { employeereducer } from "../Redux/reducer";
import { reducer as formReducer } from "redux-form";
import UserForm from "./UserForm";

afterEach(cleanup);

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(
      combineReducers({ employeeData: employeereducer, form: formReducer }),
      initialState
    ),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

it("should fill up User form", () => {
  const { getByLabelText, getByTestId, debug } = renderWithRedux(<UserForm />);

  const formData = {
    name: "Don",
    department: "IT",
  };
  debug();

  fireEvent.change(getByTestId("name"), {
    target: { value: formData.name },
  });

  fireEvent.change(getByTestId("department"), {
    target: { value: formData.department },
  });

  expect(getByTestId("form-display")).toHaveFormValues(formData);

  debug();
});
