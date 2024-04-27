import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import SuccessMessage from "./SuccessMessage";
import "../styles/EtatChantier.css";
import ConfirmationPopup from "./ConfirmationPopup";

function EtatChantier() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    machine: "",
    avance_foration: "",
    avance_decapage: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/etat-chantiers"
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const firstCommand = sortedData.shift();
      const lastFiveCommands = sortedData.slice(-6);
      setData([firstCommand, ...lastFiveCommands]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddConfirm = async () => {
    setIsAddPopupOpen(false);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/etat-chantiers",
        formData
      );
      const newData = response.data;
      setData([newData, ...data.slice(0, 6)]);
      setSuccessMessage("Données ajoutées avec succès !");
      resetForm();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleAddConfirmation = () => {
    setIsAddPopupOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/etat-chantiers/${formData.id}`,
        formData
      );
      const updatedData = data.map((item) =>
        item.id === formData.id ? formData : item
      );
      setData(updatedData);
      setSuccessMessage("Données modifiées avec succès !");
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
      date: "",
      machine: "",
      avance_foration: "",
      avance_decapage: "",
    });
  };

  const handleDeleteConfirmation = async () => {
    setIsDeletePopupOpen(false);
    if (selectedIndex !== null) {
      const selectedItem = data[selectedIndex];
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/etat-chantiers/${selectedItem.machine}`
        );
        const updatedData = [...data];
        updatedData.splice(selectedIndex, 1);
        setSuccessMessage("Données supprimées avec succès !");
        setData(updatedData);
        setSelectedIndex(null);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const handleDeleteConfirmationOpen = (index) => {
    setSelectedIndex(index);
    setIsDeletePopupOpen(true);
  };

  const prepareChartData = () => {
    return data
      .filter(
        (item) =>
          item &&
          item.machine &&
          item.avance_foration !== undefined &&
          item.avance_decapage !== undefined
      )
      .map((item) => ({
        name: item.machine,
        avance_foration: item.avance_foration,
        avance_decapage: item.avance_decapage,
      }));
  };

  return (
    <div className="containerGetion">
      <h1 style={{ color: "white", marginBottom: "30px" }}>
        SUIVI DE L'ETAT DU CHANTIER
      </h1>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <br />
      <div className="formRow ">
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
          <select
            name="machine"
            style={{ height: "35px" }}
            value={formData.machine}
            onChange={handleInputChange}
          >
            <option value="">select machine</option>
            <option value="7500|1">7500|1</option>
            <option value="7500|2">7500|2</option>
            <option value="PH1">PH1</option>
            <option value="PH2">PH2</option>
            <option value="ZD11">ZD11</option>
            <option value="Procaneq">Procaneq</option>
            <option value="TechnoZaim">TechnoZaim</option>
            <option value="Transmine">Transwine</option>
            <option value="GNE">GNE</option>
            <option value="EE">EE.</option>
          </select>
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
      <button type="button" onClick={handleAddConfirmation} className="button">
        Ajouter
      </button>
      <button type="button" onClick={handleUpdate} className="button">
        Mise à jour
      </button>
      <div className="">
        <div className="tableContainer">
          <table className="table table-etat">
            <thead className="thead">
              <tr>
                <th>Date</th>
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
                  <td>{item?.date || ""}</td>
                  <td>{item?.machine || ""}</td>
                  <td>{item?.avance_foration || ""}</td>
                  <td>{item?.avance_decapage || ""}</td>
                  <td>
                    <button
                      style={{ padding: "5px" }}
                      onClick={() => handleEdit(item)}
                      className="button"
                    >
                      Modifier
                    </button>
                  </td>
                  <td>
                    <button
                      style={{ padding: "5px" }}
                      onClick={() => handleDeleteConfirmationOpen(index)}
                      className="button"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="chart-container chart-wrapper ">
          <ResponsiveContainer
            width="50%"
            height={500}
            className="chart1"
            style={{ marginRight: "10px" }}
          >
            <BarChart
              data={prepareChartData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 0 }}
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
          <ResponsiveContainer
            width="50%"
            height={500}
            className="chart1"
            style={{ marginLeft: "10px" }}
          >
            <LineChart
              data={prepareChartData()} // Assuming the same data for line chart
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avance_foration"
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="avance_decapage"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {isAddPopupOpen && (
        <ConfirmationPopup
          message="Êtes-vous sûr de vouloir ajouter les données ?"
          onConfirm={handleAddConfirm}
          onClose={() => setIsAddPopupOpen(false)}
        />
      )}
      {isDeletePopupOpen && (
        <ConfirmationPopup
          message="Êtes-vous sûr de vouloir supprimer ces données ?"
          onConfirm={handleDeleteConfirmation}
          onClose={() => setIsDeletePopupOpen(false)}
        />
      )}
    </div>
  );
}

export default EtatChantier;
