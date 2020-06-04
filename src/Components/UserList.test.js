import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { employeereducer } from "../Redux/reducer";
import { reducer as formReducer } from "redux-form";
import UserList from "./UserList";

afterEach(cleanup);

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(
      combineReducers({ employeeData: employeereducer }),
      initialState
    ),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

const { getByLabelText, getByTestId, debug, getAllByTestId } = renderWithRedux(
  <UserList />
);

it("should render current user list", () => {
  //check what's rendered in the row
  const rowValuesEmployee = getAllByTestId("rowemployee").map(
    (row) => row.textContent
  );
  const rowValuesDepartment = getAllByTestId("rowdepartment").map(
    (row) => row.textContent
  );

  expect(rowValuesEmployee).toEqual(["Employee 1", "Employee 2", "Employee 3"]);
  expect(rowValuesDepartment).toEqual([
    ".NET Team",
    "Mobile Team",
    "Design Team",
  ]);
});
