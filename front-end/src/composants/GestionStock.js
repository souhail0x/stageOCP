import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "./loaderSpinner";
import Loader from "./spinnerLoader";
import "../styles/GestionStock.css";
import ConfirmationPopup from "./ConfirmationPopup";
import SuccessMessage from "./SuccessMessage";

function GestionStock() {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    date_commande: "",
    id: "",
    ammonix: "",
    tovex: "",
    detos_500ms: "",
    detos_450ms: "",
    raccord_17: "",
    raccord_25: "",
    raccord_42: "",
    raccord_65: "",
    raccord_100: "",
    lign: "",
    aei: "",
    etat_stock: "",
  });
  const [initialStock, setInitialStock] = useState({
    ammonix: 3282900, // Initial stock for ammonix
    tovex: 45500, // Initial stock for tovex
    detos_450ms: 17056, // Initial stock for detos 450ms
    detos_500ms: 70000, // Initial stock for detos 500ms
    raccord: 63608, // Initial stock for raccord
    aei: 292, // Initial stock for aei
    lign: 142000, // Initial stock for lign
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Set isLoaded to true after 2000 milliseconds
      setTimeout(() => {
        setIsLoaded(true);
      }, 750);
      const response = await axios.get(
        "http://localhost:8000/api/gestion-stocks"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [editItem, setEditItem] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.post(
        "http://localhost:8000/api/gestion-stocks",
        formData
      );
      setData([...data, response.data]);
      setSuccessMessage("Données ajoutées avec succès !");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      if (editItem) {
        // Check if editItem is set
        await axios.get("http://localhost:8000/sanctum/csrf-cookie"); // Add await here
        const response = await axios.put(
          `http://localhost:8000/api/gestion-stocks/${editItem.id}`,
          formData
        );
        setEditItem(null); // Clear editItem after updating
        setSuccessMessage("Données mis à jour avec succès !");
        fetchData(); // Fetch data after updating
      } else {
        console.error("No item selected for update");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.delete(
        `http://localhost:8000/api/gestion-stocks/${id}`
      );
      setSuccessMessage("Données supprimées avec succès !");
      fetchData(); // Fetch data after deleting
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setSelectedIndex(id);
    setIsDeletePopupOpen(true);
  };

  const handleEdit = (item) => {
    setEditItem(item); // Définir l'élément à éditer
    setFormData({
      date_commande: item.date_commande,
      id: item.id,
      ammonix: item.ammonix,
      tovex: item.tovex,
      detos_500ms: item.detos_500ms,
      detos_450ms: item.detos_450ms,
      raccord_17: item.raccord_17,
      raccord_25: item.raccord_25,
      raccord_42: item.raccord_42,
      raccord_65: item.raccord_65,
      raccord_100: item.raccord_100,
      lign: item.lign,
      aei: item.aei,
      etat_stock: item.etat_stock,
    });
  };

  const handleAddConfirmation = () => {
    setIsAddPopupOpen(true);
  };

  const handleAddConfirm = () => {
    setIsAddPopupOpen(false);
    handleAdd();
  };

  const cumulativeSum = data.reduce((acc, curr) => {
    Object.keys(curr).forEach((key) => {
      if (key !== "date_commande" && key !== "id" && key !== "etat_stock") {
        acc[key] = (acc[key] || 0) + parseInt(curr[key]);
      }
    });
    return acc;
  }, {});

  const remainingStock = Object.keys(initialStock).reduce((acc, key) => {
    acc[key] = initialStock[key] - (cumulativeSum[key] || 0);
    return acc;
  }, {});

  const chartData = Object.keys(cumulativeSum)
  .filter(key => key !== "updated_at" && key !== "created_at" && key !== "raccord_100" && key !== "raccord_65" && key !== "raccord_42" && key !== "raccord_25" && key !== "raccord_17") 
  .map((key) => ({
    category: key,
    cumulativeSum: cumulativeSum[key],
    remainingStock: remainingStock[key],
  }));

  console.log(chartData);
  return (
    <div className="containerGetion">
      <h1
        style={{
          textAlign: "left",
          color: "rgba(255, 255, 255, 0.95)",
          display: "block",
          fontSize: "1.3em",
          marginBlockStart: "1em",
          marginBlockEnd: "1em",
          marginInlineStart: "0px",
          marginInlineEnd: "0px",
          fontWeight: "bold",
        }}
      >
        GESTION DE STOCK
      </h1>
      <div
        className="search-bar"
        style={{
          width: "100%",
          color: "black",
        }}
      ></div>
      <div className="">
        <div className="tableContainer">
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

          <table className="table">
            <thead className="thead">
              <tr>
                <th>Date</th>
                <th>ID</th>
                <th>Ammonix</th>
                <th>Tovex</th>
                <th>Detonateur 450</th>
                <th>Detonateur 500</th>
                <th>Raccord</th>
                <th>Ligne</th>
                <th>AEI</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{new Date().toLocaleDateString()}</td>
                <td></td>
                <td>{remainingStock.ammonix}</td>
                <td>{remainingStock.tovex}</td>
                <td>{remainingStock.detos_450ms}</td>
                <td>{remainingStock.detos_500ms}</td>
                <td>{remainingStock.raccord}</td>
                <td>{remainingStock.lign}</td>
                <td>{remainingStock.aei}</td>
                <td>Stock Actuel</td>
              </tr>
              {isLoaded ? (
                data
                  .slice(-1)
                  .reverse()
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.date_commande}</td>
                      <td>{item.id}</td>
                      <td>{item.ammonix}</td>
                      <td>{item.tovex}</td>
                      <td>{item.detos_450ms}</td>
                      <td>{item.detos_500ms}</td>
                      <td>
                        {item.raccord_17 +
                          item.raccord_25 +
                          item.raccord_42 +
                          item.raccord_65 +
                          item.raccord_100}
                      </td>
                      <td>{item.lign}</td>
                      <td>{item.aei}</td>
                      <td>{item.etat_stock}</td>
                    </tr>
                  ))
              ) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="charts-wrapper">
        <div className="form-container chart1">
          {/* Partie 2: Formulaire */}

          <form>
          <h5 style={{ color: "rgba(255, 255, 255, 0.95)" }}>Formulaire de Gestion Stock</h5>

            <div className="formRow">
              <div className="formGroup">
                <label>Date:</label>
                <input
                  type="date"
                  name="date_commande"
                  value={formData.date_commande}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Num_Stock :</label>
                <input
                  type="number"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="formRow">
              <div className="formGroup">
                <label>Ammonix:</label>
                <input
                  type="number"
                  name="ammonix"
                  value={formData.ammonix}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Tovex:</label>
                <input
                  type="number"
                  name="tovex"
                  value={formData.tovex}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="formRow">
              <div className="formGroup">
                <label>Detos 450ms:</label>
                <input
                  type="number"
                  name="detos_450ms"
                  value={formData.detos_450ms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Detos 500ms:</label>
                <input
                  type="number"
                  name="detos_500ms"
                  value={formData.detos_500ms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>R. 17ms:</label>
                <input
                  type="number"
                  name="raccord_17"
                  value={formData.raccord_17}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label>R. 25ms:</label>
                <input
                  type="number"
                  name="raccord_25"
                  value={formData.raccord_25}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formGroup">
                <label>R. 42ms:</label>
                <input
                  type="number"
                  name="raccord_42"
                  value={formData.raccord_42}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="formRow">
              <div className="formGroup">
                <label>R. 65ms:</label>
                <input
                  type="number"
                  name="raccord_65"
                  value={formData.raccord_65}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formGroup">
                <label>R. 100ms:</label>
                <input
                  type="number"
                  name="raccord_100"
                  value={formData.raccord_100}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label> AEI:</label>
                <input
                  type="number"
                  name="aei"
                  value={formData.aei}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formGroup">
                <label> Ligne:</label>
                <input
                  type="number"
                  name="lign"
                  value={formData.lign}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label> Etat stock:</label>
                <input
                  type="text"
                  name="etat_stock"
                  value={formData.etat_stock}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="button-container-bottom">
              {/* Boutons */}
              <button
                type="button"
                onClick={handleAddConfirmation}
                className="button"
              >
                Ajouter
              </button>
              <button
                type="button"
                className="button"
                onClick={() => handleUpdate(formData.id)}
              >
                Modifier
              </button>
              <button
                type="button"
                className="button"
                onClick={() => handleDeleteConfirmation(formData.id)}
              >
                Supprimer
              </button>
            </div>
          </form>
        </div>
        <div className="chart-container chart1">
          <ResponsiveContainer width="100%" height={550}>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="remainingStock"
                fill="#FF6B6B"
                name="Stock Actuel"
              />
              <Bar
                dataKey="cumulativeSum"
                fill="#6ED18F"
                name="Consommation"
              />
              
            </BarChart>
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
          message="Êtes-vous sûr de vouloir supprimer les données ?"
          onConfirm={() => {
            handleDelete(selectedIndex);
            setIsDeletePopupOpen(false);
          }}
          onClose={() => setIsDeletePopupOpen(false)}
        />
      )}
    </div>
  );
}

export default GestionStock;
