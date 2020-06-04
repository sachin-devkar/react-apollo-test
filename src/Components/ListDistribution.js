import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { PRODUCT_DETAIL_QUERY } from "../graphql/query";

export function ListDistribution() {
  const { loading, error, data } = useQuery(PRODUCT_DETAIL_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.ProductDistributionSearch.items.map((item) => (
    <div key={item.productId}>
      <p data-testid="distribution_details">
        Product ID{item.productId} : {" DistributeTo->"} {item.distributeTo}
      </p>
    </div>
  ));
}
//export default ListDistribution;
