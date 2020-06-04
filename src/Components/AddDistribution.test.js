import React from "react";
import { fireEvent, act, wait, render } from "@testing-library/react";
//import { render } from "../../utils/test-utils";
import AddDistribution from "./AddDistribution";
import { UPDATE_DISTRIBUTE_TO_MUTATION } from "../graphql/mutation";
import { ApolloProvider } from "@apollo/react-hooks";
import { createMockClient } from "mock-apollo-client";

describe("login form", () => {
  // Initialize the mock client
  const mockClient = createMockClient();

  // Mock the result of the login mutation
  const mutationHandler = jest.fn().mockResolvedValue({
    data: {
      updateProductDistributionTo: {
        status: "success",
      },
    },
  });

  // Add the mocked mutation handler to the mock client
  mockClient.setRequestHandler(UPDATE_DISTRIBUTE_TO_MUTATION, mutationHandler);

  it("should call the login mutation with the data from the form", async () => {
    // Setup the data that will go into your login form
    const distributeTo = "USA";
    const productId = 2858963;

    await act(async () => {
      const { findByTestId } = render(
        <ApolloProvider client={mockClient}>
          <AddDistribution />
        </ApolloProvider>
      );

      // Fill in the email field
      fireEvent.change(await findByTestId("distributeto-input"), {
        target: {
          value: distributeTo,
        },
      });

      // Click the submit button
      await wait(async () => fireEvent.click(await findByTestId("add-input")));
    });

    // Asset that the data was called with our input
    expect(mutationHandler).toBeCalledWith({
        productId: productId,
        distributeTo: distributeTo,
    });
  });
});
