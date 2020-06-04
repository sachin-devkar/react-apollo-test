import { MockedProvider } from "@apollo/react-testing";
import { render } from "@testing-library/react";
import wait from "waait";
import { ListDistribution } from "./ListDistribution.js";
import { PRODUCT_DETAIL_QUERY } from "../graphql/query";
import React from "react";

const queryMock = {
  request: {
    query: PRODUCT_DETAIL_QUERY,
  },
  result: {
    data: {
      ProductDistributionSearch: {
        items: [
          {
            productId: 1,
            distributeTo: "JP",
            __typename: "ProductDistributionSearch",
          },
          {
            productId: 2,
            distributeTo: "IN",
            __typename: "ProductDistributionSearch",
          },
        ],
      },
      __typename: "ProductDistributionSearch",
    },
  },
};

it("should render the list distribution", async () => {
  const { getAllByTestId } = render(
    <MockedProvider mocks={[queryMock]} addTypename={false}>
      <ListDistribution />
    </MockedProvider>
  );

  await wait(1);
  const rowDistributionValues = getAllByTestId("distribution_details").map(
    (row) => row.textContent
  );
  expect(rowDistributionValues).toEqual([
    "Product ID1 :  DistributeTo-> JP",
    "Product ID2 :  DistributeTo-> IN",
  ]);
});
