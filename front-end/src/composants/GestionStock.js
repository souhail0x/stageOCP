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
  const [minusData, setMinusData] = useState([]);
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
      setTimeout(() => {
        setIsLoaded(true);
      }, 750);

      // Données du stock entrant 
      const response = await axios.get(
        "http://localhost:8000/api/gestion-stocks"
      );
      setData(response.data);

      // Données du stock sortant
      const res = await axios.get(
        "http://localhost:8000/api/commandes/resultat"
      );
      setMinusData(res.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("data", data);
  console.log("minusData", minusData);

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

  // Calculer la somme des valeurs dans les données initiales et réduites
  const sum = data.reduce((acc, item) => {
    for (const key in item) {
      if (key in acc) {
        // Vérifier si la clé existe dans le stock initial
        acc[key] += item[key]; // Ajouter la valeur de la clé à la somme
      } else {
        acc[key] = item[key]; // Ajouter la clé au stock initial si elle n'existe pas
      }
    }
    return acc;
  }, { ...initialStock }); // Passer le stock initial comme valeur initiale

  // Utiliser reduce pour effectuer la somme
  const remainingStock = Object.keys(sum).reduce((acc, key) => {
    acc[key] = initialStock[key] + sum[key];
    return acc;
  }, {});

  const sum2 = minusData.reduce((acc, item) => {
    for (const key in item) {
      if (key in acc) {
        // Vérifier si la clé existe dans le stock initial
        acc[key] += item[key]; // Ajouter la valeur de la clé à la somme
      } else {
        acc[key] = item[key]; // Ajouter la clé au stock initial si elle n'existe pas
      }
    }
    return acc;
  }, {});

  const minusStock = Object.keys(sum2).reduce((acc, key) => {
    acc[key] = remainingStock[key] - sum2[key];
    return acc;
  }, {});

  console.log("remainingStock", remainingStock);
  console.log("sum", sum);
  console.log("sum2", sum2);
  console.log("minusStock", minusStock);

  const chartData = Object.keys(sum)
  .filter(key => key !== "updated_at" && key !== "created_at" && key !== "raccord_100" && key !== "raccord_65" && key !== "raccord_42" && key !== "raccord_25" && key !== "raccord_17" && key !== "detos_450ms" && key !== "detos_500ms" && key !== "etat_stock" && key !== "date_commande" && key !== "id") 
  .map((key) => ({
    category: key,
    initialStock: remainingStock[key],
    sum2: sum2[key],
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
                <td>{minusStock.ammonix}</td>
                <td>{minusStock.tovex}</td>
                <td>{remainingStock.detos_450ms - sum2.detonateur/2}</td>
                <td>{remainingStock.detos_500ms  - sum2.detonateur/2}</td>
                <td>{remainingStock.raccord - sum2.r17 - sum2.r25 - sum2.r42 - sum2.r65 - sum2.r100}</td>
                <td>{remainingStock.lign - sum2.ligneDeTir}</td>
                <td>{minusStock.aei}</td>
                <td>Stock Actuel</td>
              </tr>
              {isLoaded ? (
                minusData
                  .slice(-1)
                  .reverse()
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.created_at.split("T")[0]}</td>
                      <td>{item.id}</td>
                      <td>{item.ammonix}</td>
                      <td>{item.tovex}</td>
                      <td>{item.detonateur}</td>
                      <td>{item.detonateur}</td>
                      <td>
                        {item.r17 +
                          item.r25 +
                          item.r42 +
                          item.r65 +
                          item.r100}
                      </td>
                      <td>{item.ligneDeTir}</td>
                      <td>{item.aei}</td>
                      <td>Consommation</td>
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
                dataKey="initialStock"
                fill="#FF6B6B"
                name="Stock Initial"
              />
              <Bar
                dataKey="sum2"
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
