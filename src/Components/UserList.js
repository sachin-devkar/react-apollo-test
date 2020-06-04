import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployee, deleteEmployee } from "../Redux/action";

class UserList extends Component {
  deleteEmployee = (id) => {
    if (window.confirm("Are you sure?")) {
      this.props.deleteEmployee(id);
    }
  };
  render() {
    if (this.props.employees.length <= 0) {
      return <div>No employees found</div>;
    } else {
      return (
        <div className="rightsection">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Depatment Name</th>
                <th>Action(s)</th>
              </tr>
            </thead>
            <tbody data-testid="tablebody">
              {this.props.employees &&
                this.props.employees.map((data, index) => {
                  return (
                    <tr key={index + 1} data-testid="row">
                      <td>{index + 1}</td>
                      <td data-testid="rowemployee">{data.employeeName}</td>
                      <td data-testid="rowdepartment">
                        {data.employeeDepartment}
                      </td>
                      <td>
                        <button onClick={() => this.deleteEmployee(data.id)}>
                          DELETE
                        </button>{" "}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  employees: state.employeeData.employees,
});
export default connect(mapStateToProps, {
  deleteEmployee,
  getEmployee,
})(UserList);
