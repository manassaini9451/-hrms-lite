import React, { useState } from "react";

import { addEmployee } from "../services/api";

import { toast } from "react-toastify";

function EmployeeForm({ refresh }) {

  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.employeeId || !form.fullName || !form.email) {

      toast.error("All fields required");

      return;
    }

    try {

      await addEmployee(form);

      toast.success("Employee added");

      refresh();

      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: ""
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Error adding employee"
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
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) =>
          setForm({ ...form, fullName: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        placeholder="Department"
        value={form.department}
        onChange={(e) =>
          setForm({ ...form, department: e.target.value })
        }
      />

      <button>Add Employee</button>

    </form>

  );
}

export default EmployeeForm;