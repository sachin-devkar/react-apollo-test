import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <div className="ui secondary pointing menu">
      <a className="item">
        <i className="list layout icon"></i>
        <Link to="/">List Employee</Link>
      </a>
      <a className="item">
        <i className="add sign box icon"></i>{" "}
        <Link to="/addemployee">Add Employee</Link>
      </a>
      <a className="item">
        <i className="cloud icon"></i>{" "}
        <Link to="/addgraphql">GraphQl Distribution</Link>
      </a>
      <a className="item">
        <i className="cloud icon"></i>{" "}
        <Link to="/listgraphql">GraphQl List</Link>
      </a>
    </div>
  );
};
export default Headers;
