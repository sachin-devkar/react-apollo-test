import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { getEmployee, addEmployee, editEmployee } from "../Redux/action";
import { connect } from "react-redux";
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

  submitData = (formValues) => {
    console.log(formValues);
    const newEmployee = {
      id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      employeeName: formValues.name,
      employeeDepartment: formValues.department,
    };

    this.props.addEmployee(newEmployee);

    //this.props.history.push("/");
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

  renderInput({ input, label, meta, data_testid }) {
    return (
      <div className="field">
        <label>{label}</label>
        <div class="ui left labeled icon input">
          <input {...input} data-testid={data_testid} />
          <i class="user icon"></i>
          <div class="ui corner label">
            <i class="icon asterisk"></i>
          </div>
        </div>
        <div>{meta.error}</div>
      </div>
    );
  }
  render() {
    return (
      <div class="ui form segment">
        <form
          onSubmit={this.props.handleSubmit(this.submitData)}
          className="ui form"
          data-testid="form-display"
        >
          <Field
            name="name"
            component={this.renderInput}
            label="Employee Name"
            data_testid="name"
          />
          <Field
            name="department"
            component={this.renderInput}
            label="Department"
            data_testid="department"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employeeData.employees,
  forms: state.form,
});

// connect(mapStateToProps, {
//   getEmployee,
//   addEmployee,
//   editEmployee,
// })(withRouter(UserForm));

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "please enter name";
  }

  if (!formValues.department) {
    errors.department = "please enter deparment";
  }

  return errors;
};

const afterSubmit = (result, dispatch) => {
  dispatch(reset("addemployee"));
  alert("user Added");
};

UserForm = connect(mapStateToProps, {
  getEmployee,
  addEmployee,
  editEmployee,
})(UserForm);

export default reduxForm({
  form: "addemployee", // a unique name for this form
  validate: validate,
  onSubmitSuccess: afterSubmit,
})(UserForm);
