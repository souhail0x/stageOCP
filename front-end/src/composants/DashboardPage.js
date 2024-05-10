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
  const [res, setRes] = useState([]);

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

        const res = await axios.get(
          "http://127.0.0.1:8000/api/commandes/resultat"
        );
        setRes(res.data)
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
      lign: 0,
      raccord: 0,
      aei: 0,
    };

    res.forEach((item) => {
      sum.lign += parseFloat(item.ligneDeTir);
      sum.ammonix += parseInt(item.ammonix);
      sum.tovex += parseInt(item.tovex);
      sum.detos += parseInt(item.detonateur);
      sum.raccord_17 += parseInt(item.r17);
      sum.raccord_25 += parseInt(item.r25);
      sum.raccord_42 += parseInt(item.r42);
      sum.raccord_65 += parseInt(item.r65);
      sum.raccord_100 += parseInt(item.r100);
      sum.aei += parseInt(item.aei);
      sum.raccord +=
        parseInt(item.r17) +
        parseInt(item.r25) +
        parseInt(item.r42) +
        parseInt(item.r65) +
        parseInt(item.r100);
    });

    return sum;
  };

  const sum = calculateSum();

  const calculateSum2 = () => {
    let sum2 = {
      ammonix: 0,
      tovex: 0,
      detos_450s: 0,
      detos_500s: 0,
      detos: 0,
      raccord_17: 0,
      raccord_25: 0,
      raccord_42: 0,
      raccord_65: 0,
      raccord_100: 0,
      lign: 0,
      raccord: 0,
      aei: 0,
    };

    data.forEach((item) => {
      sum2.lign += parseFloat(item.lign);
      sum2.ammonix += parseInt(item.ammonix);
      sum2.tovex += parseInt(item.tovex);
      sum2.detos_450s += parseInt(item.detos_450ms);
      sum2.detos_500s += parseInt(item.detos_500ms);
      sum2.detos += parseInt(item.detos_450ms)+ parseInt(item.detos_500ms);
      sum2.raccord_17 += parseInt(item.raccord_17);
      sum2.raccord_25 += parseInt(item.raccord_25);
      sum2.raccord_42 += parseInt(item.raccord_42);
      sum2.raccord_65 += parseInt(item.raccord_65);
      sum2.raccord_100 += parseInt(item.raccord_100);
      sum2.aei += parseInt(item.aei);
      sum2.raccord +=
        parseInt(item.raccord_17) +
        parseInt(item.raccord_25) +
        parseInt(item.raccord_42) +
        parseInt(item.raccord_65) +
        parseInt(item.raccord_100);
    });

    return sum2;
  };

  const sum2 = calculateSum2();

  const initData = {
    ammonix: 3282900,
    tovex: 45500,
    detos: 87056,
    raccord: 63608,
    lign: 142000,
    aei: 292,
  };

  console.log("init :",sum2);
  const pieData1 = [
    { name: "Consommation Tovex (kg)", value: sum.tovex },
    { name: "Consommation Ammonix (kg)", value: sum.ammonix },
    { name: "Ligne de tir (m)", value: sum.lign },
  ];

  const pieData2 = [
    { name: "Raccord 17", value: sum.raccord_17 },
    { name: "Raccord 25", value: sum.raccord_25 },
    { name: "Raccord 42", value: sum.raccord_42 },
    { name: "Raccord 65", value: sum.raccord_65 },
    { name: "Raccord 100", value: sum.raccord_100 },
    { name: "Detonateurs", value: sum.detos },
    { name: "Aei", value: sum.aei },
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
          <h1>{ 3282900 + sum2.ammonix } kg</h1>
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
          <h1>{ sum2.tovex + 45500} kg</h1>
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
          <h1>{87056+ sum2.detos} U</h1>
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
          <h1>{63608+ sum2.raccord} U</h1>
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
          <h1>{142000+ sum2.lign} m</h1>
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
          <h1>{292+ sum2.aei}</h1>
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
            data={[initData , sum]} 
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
            <Bar dataKey="ammonix" name="Ammonix" fill="#8884d8" />
            <Bar dataKey="tovex" name="Tovex" fill="#82ca9d" />
            <Bar dataKey="detos" name="Detos" fill="#9c27b0" />
            <Bar dataKey="raccord" name="Raccord" fill="#43a047" />
            <Bar datakey="lign" name="Ligne de tir" fill="#ffc107" />
            <Bar dataKey="aei" name="Aei" fill="#f44336" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%" className={"chart1"} >
          <PieChart>
            <Pie dataKey="value" data={pieData1} fill="#8884d8" label>
              {pieData1.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300} className={"chart1"} >
          <LineChart
            data={[initData, sum]} 
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
            <Line type="ammonix" dataKey="ammonix" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="tovex" dataKey="tovex" stroke="#6ED18F" />
            <Line type="detos" dataKey="detos" stroke="#AF98C5" />
            <Line type="raccord" dataKey="raccord" stroke="#9576EB" />
            <Line type="lign" dataKey="lign" stroke="#FF6B6B" />
            <Line type="aei" dataKey="aei" stroke="#FFC107" />
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
