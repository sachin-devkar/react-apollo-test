import React, { Component } from "react";
import PropTypes from "prop-types";
import { addDistributeTO } from "../Redux/action";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import logo from "../logo.svg";
import { UPDATE_DISTRIBUTE_TO_MUTATION } from "../graphql/mutation";

function AddDistribution() {
  let state = [
    {
      distributeTo: "",
    },
  ];
  const [updateDistribution, { loading, error, data }] = useMutation(
    UPDATE_DISTRIBUTE_TO_MUTATION
  );

  // const cd = useMutation(UPDATE_DISTRIBUTE_TO_MUTATION);
  //console.log(cd);
  const submitData = () => {
    //this.props.addEmployee(newEmployee);
    console.log("end value", state.distributeTo);
    const country = String(state.distributeTo);
    updateDistribution({
      variables: {
        productId: 2858963,
        distributeTo: country,
      },
    });
    //this.clearData();
  };

  const handleNameChange = (e) => {
    // this.setState({
    //   distributeTo: e.target.value,
    // });
    state = { ...state, distributeTo: e.target.value };
    console.log(typeof state.distributeTo);
  };

  return (
    <div>
      <p className="App-intro">
        <div className="leftsection">
          Distribute To :{" "}
          <input
            onChange={handleNameChange}
            value={state.employeeDepartment}
            type="text"
            placeholder="Distribute To"
            data-testid="distributeto-input"
          />
          <br />
          <button data-testid="add-input" onClick={submitData}>
            ADD
          </button>
        </div>
      </p>
    </div>
  );
}

export default AddDistribution;
