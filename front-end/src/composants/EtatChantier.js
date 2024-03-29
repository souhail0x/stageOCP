import React, { useState, useEffect } from "react";
import axios from "axios";
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

import '../styles/EtatChantier.css'

function EtatChantier() {
  const dataChart = [
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
  ];

  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    date: "",
    machine: "",
    avance_foration: "",
    avance_decapage: "",
    
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/etat-chantiers");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/etat-chantiers", formData);
      const newData = response.data; // Assuming the API returns the newly added data
      setData([...data, newData]);
      setFormData({
        date: "",
        machine: "",
        avance_foration: "",
        avance_decapage: "",
        
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  

  const handleUpdate = (index) => {
    // Logique pour la mise à jour des données
  };

  const handleDelete = (index) => {
    // Logique pour la suppression des données
  };

  return (
    <div className="containerGetion">
      <h1 
      style={{
        textAlign: "left",
        color: "rgba(255, 255, 255, 0.95)",
        display: "block",
        fontSize: "1.17em",
        marginBlockStart: "1em",
        marginBlockEnd: "1em",
        marginInlineStart: "0px",
        marginInlineEnd: "0px",
        fontWeight: "bold",
      }}> 
      SUIVI ETAT DE CHANTIER
      </h1>

      <div className="formRow">
        <div className="formGroup">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="formGroup">
          <label>Machine:</label>
          <input
            type="text"
            name="machine"
            value={formData.machine}
            onChange={handleInputChange}
          />
        </div>
        <div className="formGroup">
          <label>Avances Foration:</label>
          <input
            type="text"
            name="avance_foration"
            value={formData.avance_foration}
            onChange={handleInputChange}
          />
        </div>
        <div className="formGroup">
          <label>Avances Sautage:</label>
          <input
            type="text"
            name="avance_decapage"
            value={formData.avance_decapage}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <button type="button" onClick={handleAdd} className="button">
        Ajouter
      </button>

      <div className="container">
        <div className="tableContainer">
          <table className="table">
            <thead className="thead">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Machine</th>
                <th>Avance Foration</th>
                <th>Avance Décapage</th>
                <th>État Coût</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.machine}</td>
                  <td>{item.avance_foration}</td>
                  <td>{item.avance_decapage}</td>
                  <td>{item.etat_cout}</td>
                  <td>
                    <button style={{padding:"5px"}} onClick={() => handleUpdate(index)} className="button">Modifier</button>
                    </td>
                    <td>
                    <button  style={{padding:"5px"}} onClick={() => handleDelete(index)} className="button">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={500}
              data={dataChart}
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
        </div>
      </div>
    </div>
  );
}

export default EtatChantier;
