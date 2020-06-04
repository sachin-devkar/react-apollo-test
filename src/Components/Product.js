import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

function Product() {
  const PRODUCT_DETAIL = gql`
    {
      ProductDistributionSearch(productId: 2858963) {
        items {
          productId
          distributeTo
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(PRODUCT_DETAIL);
  //const data = useQuery(PRODUCT_DETAIL);
  function graphqlData(data) {
    return data.ProductDistributionSearch.items.map((item) => (
      <div key={item.productId}>
        <p>
          Product ID{item.productId} : {" DistributeTo->"}
          {item.distributeTo}
        </p>
      </div>
    ));
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return (
    <div className="rightsectiongraphql">
      <b>--------------------Graphql Data------------------------------</b>
      {graphqlData(data)}
    </div>
  );
}
export default Product;
