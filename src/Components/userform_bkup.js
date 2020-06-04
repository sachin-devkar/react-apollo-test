import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from "../Redux/action";
import { connect } from "react-redux";
import UserList, { userList } from "./UserList";
import logo from "../logo.svg";
import Product from "./Product";
import AddDistribution from "./AddDistribution";
import { push } from "react-router-redux";
import { withRouter } from "react-router-dom";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      employeeName: "",
      employeeDepartment: "",
    };
  }

  // static propTypes = {
  //   employees: PropTypes.array.isRequired,
  //   getEmployee: PropTypes.func.isRequired,
  //   addEmployee: PropTypes.func.isRequired,
  //   editEmployee: PropTypes.func.isRequired,
  //   deleteEmployee: PropTypes.func.isRequired,
  // };

  componentDidMount() {
    //this.props.getEmployee();
  }
  
  const required = (value) => (value || typeof value === 'number' ? undefined : 'Required');
  

  submitData = () => {
    if (
      this.state.employeeName &&
      this.state.employeeDepartment &&
      !this.state.id
    ) {
      const newEmployee = {
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        employeeName: this.state.employeeName,
        employeeDepartment: this.state.employeeDepartment,
      };

      this.props.addEmployee(newEmployee);
      this.props.history.push("/");
    } else if (
      this.state.employeeName &&
      this.state.employeeDepartment &&
      this.state.id
    ) {
      const updatedDetails = {
        id: this.state.id,
        employeeName: this.state.employeeName,
        employeeDepartment: this.state.employeeDepartment,
      };

      this.props.editEmployee(updatedDetails);
    } else {
      alert("Enter Employee Details.");
    }

    this.clearData();
  };

  editDetails = (data) => {
    this.setState({
      id: data.id,
      employeeName: data.employeeName,
      employeeDepartment: data.employeeDepartment,
    });
  };

  deleteEmployee = (id) => {
    this.clearData();
    if (window.confirm("Are you sure?")) {
      this.props.deleteEmployee(id);
    }
  };

  handleNameChange = (e) => {
    this.setState({
      employeeName: e.target.value,
    });
  };

  handleDepartmentChange = (e) => {
    this.setState({
      employeeDepartment: e.target.value,
    });
  };

  clearData = () => {
    this.setState({
      id: 0,
      employeeName: "",
      employeeDepartment: "",
    });
  };
  render() {
    return (
      <div>
        <div className="App-intro">
          <div className="leftsection">
            Employee Name :{" "}
            <input
              onChange={this.handleNameChange}
              value={this.state.employeeName}
              type="text"
              placeholder="Employee Name"
            />{" "}
            <br />
            Employee Department :{" "}
            <input
              onChange={this.handleDepartmentChange}
              value={this.state.employeeDepartment}
              type="text"
              placeholder="Employee Department"
            />
            <br />
            {this.state.id ? (
              <button onClick={this.submitData}>UPDATE</button>
            ) : (
              <button onClick={this.submitData}>ADD</button>
            )}{" "}
            &nbsp;&nbsp;<button onClick={this.clearData}>CLEAR</button>
          </div>
          <div className="rightSection">
            <button>
              <Link to="/">ShowList</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employeeData.employees,
});

connect(mapStateToProps, {
  getEmployee,
  addEmployee,
  editEmployee,
})(withRouter(UserForm));

// UserForm = reduxForm({
//   // a unique name for the form
//   form: "addemployee",
// })(UserForm);
// export default UserForm;

UserForm = connect(mapStateToProps, {
  getEmployee,
  addEmployee,
  editEmployee,
})(withRouter(UserForm));

export default reduxForm({
  form: "addemployee", // a unique name for this form
})(UserForm);
