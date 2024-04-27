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
  const [data, setData] = useState([]);

  const COLORS = [
    "#388e3c",
    "#7e57c2",
    "#43a047",
    "#9c27b0",
    "#4caf50",
    "#9C27B0",
    "#94e05e",
    "#d975ea",
  ];

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
    if (!pieData2[index]) return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
    const y = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${pieData2[index].name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/gestion-stocks"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }; 

    fetchData();
  }, []);

  const calculateSum = () => {
    let sum = {
      ammonix: 0,
      tovex: 0,
      detos: 0,
      raccord_17: 0,
      raccord_25: 0,
      raccord_42: 0,
      raccord_65: 0,
      raccord_100: 0,
      detos_450ms: 0,
      detos_500ms: 0,
      lign: 0,
      raccord: 0,
      aei: 0,
    };

    data.forEach((item) => {
      sum.lign += parseFloat(item.lign);
      sum.ammonix += parseInt(item.ammonix);
      sum.tovex += parseInt(item.tovex);
      sum.detos +=
        parseInt(item.detos_450ms) +
        parseInt(item.detos_500ms);
      sum.raccord_17 += parseInt(item.raccord_17);
      sum.raccord_25 += parseInt(item.raccord_25);
      sum.raccord_42 += parseInt(item.raccord_42);
      sum.raccord_65 += parseInt(item.raccord_65);
      sum.raccord_100 += parseInt(item.raccord_100);
      sum.detos_450ms += parseInt(item.detos_450ms);
      sum.detos_500ms += parseInt(item.detos_500ms);
      sum.aei += parseInt(item.aei);
      sum.raccord +=
        parseInt(item.raccord_17) +
        parseInt(item.raccord_25) +
        parseInt(item.raccord_42) +
        parseInt(item.raccord_65) +
        parseInt(item.raccord_100);

    });

    return sum;
  };

  const sum = calculateSum();

  const pieData1 = [
    { name: "Ammonix", value: sum.ammonix },
    { name: "Tovex", value: sum.tovex },
  ];

  const pieData2 = [
    { name: "Raccord_17", value: sum.raccord_17 },
    { name: "Raccord_25", value: sum.raccord_25 },
    { name: "Raccord_42", value: sum.raccord_42 },
    { name: "Raccord_65", value: sum.raccord_65 },
    { name: "Raccord_100", value: sum.raccord_100 },
    { name: "Detonateur_450", value: sum.detos_450ms },
    { name: "Detonateur_500", value: sum.detos_500ms },
    { name: "Aei", value: sum.aei },
    { name: "Ligne_tir", value: sum.lign },
  ];

  return (
    <main className="main-cont">
      <div
        className="main-title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "19px",
        }}
      >
        <h2>DASHBOARD</h2>
        <h4></h4>
      </div>

      <div className="main-cards">

        <div className="card">
          <h2>Ammonix</h2>
          <div className="card-inner">
            <h3>Stock Initial</h3>
          </div>
          <h1>3282900 kg</h1>
          <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
          <div className="card-inner">
            <h3>Consommation</h3>
          </div>
          <h1>{sum.ammonix} kg</h1>
        </div>

        <div className="card">
          <h2>Tovex</h2>
          <div className="card-inner">
            <h3>Stock Initial</h3>
          </div>
          <h1>45500 kg</h1>
          <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
          <div className="card-inner">
            <h3>Consommation</h3>
          </div>
          <h1>{sum.tovex} kg</h1>
        </div>

        <div className="card">
          <h2>Detos</h2>
        <div className="card-inner">
            <h3>Stock Initial</h3>
          </div>
          <h1>87056 U</h1>
          <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
          <div className="card-inner">
            <h3>Consommation</h3>
          </div>
          <h1>{sum.detos} U</h1>
        </div>
        
        <div className="card">
          <h2>Raccord</h2>
          <div className="card-inner">
            <h3>Stock Initial</h3>
          </div>
          <h1>63608 U</h1>
          <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
          <div className="card-inner">
            <h3>Consommation</h3>
          </div>
          <h1>{sum.raccord} U</h1>          
        </div>

        <div className="card">
          <h2>Ligne de tir</h2>
          <div className="card-inner">
            <h3>Stock Initial</h3>
          </div>
          <h1>142000 m</h1>
          <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
          <div className="card-inner">
            <h3>Consommation</h3>
          </div>
          <h1>{sum.lign} m</h1>
        </div>

        <div className="card">
          <h2>Aei</h2>
          <div className="card-inner">
            <h3>Stock Initial</h3>
          </div>
          <h1>292</h1>
          <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
          <div className="card-inner">
            <h3>Consommation</h3>
          </div>
          <h1>{sum.aei} </h1>
        </div>
        
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height={300} className={"chart1"} >
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ammonix" name="Ammonix" fill="#8884d8" />
            <Bar dataKey="tovex" name="Tovex" fill="#82ca9d" />
            <Bar dataKey="detos_500ms" name="Detos" fill="#9c27b0" />
            <Bar dataKey="raccord_17" name="Raccord" fill="#43a047" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%" className={"chart1"} >
          <PieChart>
            <Pie dataKey="value" data={pieData1} fill="#8884d8" label>
              {pieData1.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#8884d8" : "#82ca9d"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300} className={"chart1"} >
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="tovex"
              dataKey="tovex"
              stroke="#6ED18F"
              activeDot={{ r: 8 }}
            />
            <Line type="detos" dataKey="detos_450ms" stroke="#AF98C5" />
            <Line type="detos" dataKey="detos_500ms" stroke="#56ffc6" />
            <Line type="raccord" dataKey="raccord_17" stroke="#9576EB" />
            <Line type="raccord" dataKey="raccord_25" stroke="#9C27B0" />
            <Line type="raccord" dataKey="raccord_42" stroke="#b7b5f4" />
            <Line type="raccord" dataKey="raccord_65" stroke="#94e05e" />
            <Line type="raccord" dataKey="raccord_100" stroke="#d975ea" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%" className={"chart1"} >
          <PieChart width={400} height={161}>
            <Pie
              data={pieData2}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData2.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [name, value]} />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </main>
  );
}

export default DashboardPage;
