import React, { useState } from "react";

import { markAttendance } from "../services/api";

import { toast } from "react-toastify";

function AttendanceForm() {

  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present"
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.employeeId || !form.date) {

      toast.error("Employee ID and date required");

      return;
    }

    try {

      await markAttendance(form);

      toast.success("Attendance marked");

      setForm({
        employeeId: "",
        date: "",
        status: "Present"
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error marking attendance"
      );

    }

  };

  return (

    <form onSubmit={handleSubmit}>

      <input
        placeholder="Employee ID"
        value={form.employeeId}
        onChange={(e) =>
          setForm({ ...form, employeeId: e.target.value })
        }
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >

        <option value="Present">Present</option>

        <option value="Absent">Absent</option>

      </select>

      <button type="submit">
        Mark Attendance
      </button>

    </form>

  );

}

export default AttendanceForm;