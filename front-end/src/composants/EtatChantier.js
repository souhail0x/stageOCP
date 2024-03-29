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
  const dataChart = [];

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
      const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date)); // Tri des données par date croissante
      const firstCommand = sortedData.shift(); // Prendre la première commande
      const lastFiveCommands = sortedData.slice(-6); // Prendre les cinq dernières commandes
      setData([firstCommand, ...lastFiveCommands]); // Fusionner les données
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
      setData([newData, ...data.slice(0, 6)]); // Ajouter la nouvelle donnée au début du tableau existant
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


  const handleUpdate = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/etat-chantiers/${formData.id}`, formData);
      const updatedData = data.map(item => item.id === formData.id ? formData : item);
      setData(updatedData);
      resetForm();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
  };
  const resetForm = () => {
    setFormData({
      id: null,
      date: "",
      machine: "",
      avance_foration: "",
      avance_decapage: "",
    });
  };
  
  


  const handleDelete = async (index) => {
    const selectedItem = data[index]; // Obtenir l'élément sélectionné
    try {
      await axios.delete(`http://127.0.0.1:8000/api/etat-chantiers/${selectedItem.id}`);
      const updatedData = [...data];
      updatedData.splice(index, 1); // Supprimer l'élément de la liste de données
      setData(updatedData); // Mettre à jour la liste de données
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };


  const prepareChartData = () => {
    return data.map(item => ({
      name: item.machine,
      avance_foration: item.avance_foration,
      avance_decapage: item.avance_decapage,
    }));
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

      <button type="button" onClick={handleUpdate} className="button">Mise à jour</button>

      <div className="container">
        <div className="tableContainer">
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Date commande:</th>
                <th>Machine</th>
                <th>Avance Foration</th>
                <th>Avance Décapage</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.machine}</td>
                  <td>{item.avance_foration}</td>
                  <td>{item.avance_decapage}</td>
                  <td>
                    <button style={{ padding: "5px" }} onClick={() => handleEdit(item)} className="button">
                      Modifier
                    </button>

                  </td>
                  <td>
                    <button style={{ padding: "5px" }} onClick={() => handleDelete(index)} className="button">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={prepareChartData()} // Use prepared data for the chart
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avance_foration" fill="#8884d8" />
              <Bar dataKey="avance_decapage" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default EtatChantier;
