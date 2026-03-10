import React, { useState } from "react";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

function Employees() {

  const [refresh, setRefresh] = useState(false);

  const reload = () => {
    setRefresh(!refresh);
  };

  return (

    <div style={{ padding: 30 }}>

      <EmployeeForm refresh={reload} />

      <EmployeeList refreshFlag={refresh} />

    </div>

  );
}

export default Employees;