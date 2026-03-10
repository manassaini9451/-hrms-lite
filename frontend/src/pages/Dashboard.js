import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/api";
import { Card, CardContent, Typography } from "@mui/material";

function Dashboard() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getEmployees();
    setCount(res.data.length);
  };

  return (
    <div style={{ padding: 30 }}>

      <Card sx={{ width: 300 }}>

        <CardContent>

          <Typography variant="h6">
            Total Employees
          </Typography>

          <Typography variant="h4">
            {count}
          </Typography>

        </CardContent>

      </Card>

    </div>
  );
}

export default Dashboard;