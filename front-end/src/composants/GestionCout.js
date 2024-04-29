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
    dateCommande: "",
    id_cout: "",
    ammonix: "",
    tovex: "",
    detos500ms: "",
    detos450ms: "",
    raccord17: "",
    raccord25: "",
    raccord42: "",
    raccord65: "",
    raccord100: "",
    lign: "",
    aei: "",
    etatCout: "",
  });
  const [initialStock, setInitialStock] = useState({
      ammonix: 22980300, // Initial cout for ammonix
      tovex: 839475, // Initial stock for tovex
      detos_450ms: 326146.4, // Initial cout for detos 450ms
      detos_500ms: 4017948, // Initial cout for detos 500ms
      raccord: 8879676.8, // Initial cout for raccord
      aei: 9344, // Initial cout for aei
      lign: 4544000, // Initial cout for lign
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
        "http://localhost:8000/api/couts"
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
        "http://localhost:8000/api/couts",
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
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.put(
        `http://localhost:8000/api/couts/${id}`
      );
      setSuccessMessage("Données modifiées avec succès !");
      fetchData(); // Fetch data after deleting
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.delete(
        `http://localhost:8000/api/couts/${id}`
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
      dateCommande: item.dateCommande,
      id_cout: item.id_cout,
      ammonix: item.ammonix,
      tovex: item.tovex,
      detos500ms: item.detos500ms,
      detos450ms: item.detos450ms,
      raccord17: item.raccord17,
      raccord25: item.raccord25,
      raccord42: item.raccord42,
      raccord65: item.raccord65,
      raccord100: item.raccord100,
      lign: item.lign,
      aei: item.aei,
      etatCout: item.etatCout,
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
      if (key !== "dateCommande" && key !== "id" && key !== "etatCout") {
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
  .filter(key => key !== "updated_at" && key !== "created_at" && key !== "raccord100" && key !== "raccord65" && key !== "raccord42" && key !== "raccord25" && key !== "raccord17" ) 
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
        GESTION DE COUT
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
                <td>Cout Actuel</td>
              </tr>
              {isLoaded ? (
                data
                  .slice(-1)
                  .reverse()
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.dateCommande}</td>
                      <td>{item.id}</td>
                      <td>{item.ammonix}</td>
                      <td>{item.tovex}</td>
                      <td>{item.detos450ms}</td>
                      <td>{item.detos500ms}</td>
                      <td>
                        {item.raccord17 +
                          item.raccord25 +
                          item.raccord42 +
                          item.raccord65 +
                          item.raccord100}
                      </td>
                      <td>{item.lign}</td>
                      <td>{item.aei}</td>
                      <td>{item.etatCout}</td>
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
            <h5 style={{ color: "rgba(255, 255, 255, 0.95)" }}>Formulaire de Gestion Couts</h5>
            <div className="formRow">
              <div className="formGroup">
                <label>Date:</label>
                <input
                  type="date"
                  name="dateCommande"
                  value={formData.dateCommande}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Num_Stock :</label>
                <input
                  type="number"
                  name="id_cout"
                  value={formData.id_cout}
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
                  name="detos450ms"
                  value={formData.detos450ms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Detos 500ms:</label>
                <input
                  type="number"
                  name="detos500ms"
                  value={formData.detos500ms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>R. 17ms:</label>
                <input
                  type="number"
                  name="raccord17"
                  value={formData.raccord17}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="formRow">
              <div className="formGroup">
                <label>R. 25ms:</label>
                <input
                  type="number"
                  name="raccord25"
                  value={formData.raccord25}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formGroup">
                <label>R. 42ms:</label>
                <input
                  type="number"
                  name="raccord42"
                  value={formData.raccord42}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="formRow">
              <div className="formGroup">
                <label>R. 65ms:</label>
                <input
                  type="number"
                  name="raccord65"
                  value={formData.raccord65}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formGroup">
                <label>R. 100ms:</label>
                <input
                  type="number"
                  name="raccord100"
                  value={formData.raccord100}
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
                  name="etatCout"
                  value={formData.etatCout}
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
                onClick={() => handleUpdate(formData.id_cout)}
              >
                Modifier
              </button>
              <button
                type="button"
                className="button"
                onClick={() => handleDeleteConfirmation(formData.id_cout)}
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
                name="Cout Actuel"
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
