import React, { useEffect, useState } from "react";

import { getEmployees, deleteEmployee } from "../services/api";
import { toast } from "react-toastify";

function EmployeeList({ refreshFlag }) {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadEmployees = async () => {

    try {

      setLoading(true);

      const res = await getEmployees();

      setEmployees(res.data);

    } catch (err) {

      setError("Failed to load employees");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    loadEmployees();

  }, [refreshFlag]);

  const remove = async (id) => {

    await deleteEmployee(id);
    toast.success("Employee deleted");

    loadEmployees();
  };

  if (loading) return <p>Loading employees...</p>;

  if (error) return <p>{error}</p>;

  if (employees.length === 0)
    return <p>No employees found</p>;

  return (

    <table border="1">

      <thead>

        <tr>

          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {employees.map((emp) => (

          <tr key={emp._id}>

            <td>{emp.employeeId}</td>

            <td>{emp.fullName}</td>

            <td>{emp.email}</td>

            <td>{emp.department}</td>

            <td>

              <button
                onClick={() => remove(emp._id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default EmployeeList;