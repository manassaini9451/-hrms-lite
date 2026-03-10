import React, { useState } from "react";

import { getAttendance } from "../services/api";

function AttendanceList() {

  const [employeeId, setEmployeeId] = useState("");

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const load = async () => {

    if (!employeeId) {

      alert("Enter Employee ID");

      return;

    }

    try {

      setLoading(true);

      const res = await getAttendance(employeeId);

      setRecords(res.data);

      setError("");

    } catch (err) {

      setError("Attendance not found");

    } finally {

      setLoading(false);

    }

  };

  if (loading) return <p>Loading attendance...</p>;

  return (

    <div>

      <h3>Load Attendance</h3>

      <input
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) =>
          setEmployeeId(e.target.value)
        }
      />

      <button onClick={load}>
        Load Attendance
      </button>

      {error && <p>{error}</p>}

      {records.length === 0 && !error && (
        <p>No attendance records</p>
      )}

      {records.length > 0 && (

        <table border="1">

          <thead>

            <tr>

              <th>Date</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {records.map((rec) => (

              <tr key={rec._id}>

                <td>{rec.date}</td>

                <td>{rec.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}

export default AttendanceList;