import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import axios from "axios";
import "../styles/DashboardPage.css";

function DashboardPage() {
  const [data, setData] = useState([
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]);
  const [pieChartData, setPieChartData] = useState([
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ]);

  const COLORS = ["#6ed18f"," #af98c5" ,"#2e7d32", "#9576eb"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/dashboard-data");
      console.log(response.data);
      setData(response.data);
      setPieChartData(response.data.map((item) => ({ name: item.name, value: item.value })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="main-cont">
      <div
        className="main-title"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Ammonix</h3>
            {/* <BsFillArchiveFill className='card_icon'/> */}
          </div>
          <h1>300</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Tovex</h3>
            {/* <BsFillGrid3X3GapFill className='card_icon'/> */}
          </div>
          <h1>12</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Detos</h3>
            {/* <BsPeopleFill className='card_icon'/> */}
          </div>
          <h1>33</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Raccord</h3>
            {/* <BsFillBellFill className='card_icon'/> */}
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={500}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie dataKey="value" data={pieChartData} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={161}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default DashboardPage;
