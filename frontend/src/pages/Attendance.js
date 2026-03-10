import React from "react";

import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

function Attendance() {

  return (

    <div style={{ padding: 30 }}>

      <AttendanceForm />

      <AttendanceList />

    </div>

  );

}

export default Attendance;