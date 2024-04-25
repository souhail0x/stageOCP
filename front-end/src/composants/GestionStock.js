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
import Loading from "./loaderSpinner";
import Loader from "./spinnerLoader";
import "../styles/GestionStock.css";
import ConfirmationPopup from "./ConfirmationPopup";

function GestionStock() {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    date_commande: "",
    Num_Stock: "111",
    ammonix: "",
    tovex: "",
    detonateur_500: "",
    detonateur_450: "",
    raccord_65: "",
    raccord_17: "",
    raccord_25: "",
    raccord_42: "",
    raccord_100: "",
    ligne_tir: "",
    aei: "",
    etat_stock: "",
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

  const handleAdd = async (e) => {
    
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.post(
        "http://localhost:8000/api/gestion-stocks",
        formData
      );
      setData([...data, response.data]);
      setFormData({
        date_commande: "",
        Num_Stock: "",
        ammonix: "",
        tovex: "",
        detonateur_500: "",
        detonateur_450: "",
        raccord_65: "",
        raccord_17: "",
        raccord_25: "",
        raccord_42: "",
        raccord_100: "",
        ligne_tir: "",
        aei: "",
        etat_stock: "",
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.put(
        `http://localhost:8000/api/gestion-stocks/${editItem.id}`,
        formData
      );
      setEditItem(null); // Clear editItem after updating
      setFormData({}); // Clear formData after updating
      fetchData(); // Fetch data after updating
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
      fetchData(); // Fetch data after deleting
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item); // Définir l'élément à éditer
    setFormData({
      date_commande: item.date_commande,
      Num_Stock: item.Num_Stock,
      ammonix: item.ammonix,
      tovex: item.tovex,
      detonateur_500: item.detonateur_500,
      detonateur_450: item.detonateur_450,
      raccord_17: item.raccord_17,
      raccord_25: item.raccord_25,
      raccord_42: item.raccord_42,
      raccord_65: item.raccord_65,
      raccord_100: item.raccord_100,
      ligne_tir: item.ligne_tir,
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
      <div className="container">
        <div className="tableContainer">
          <table className="table">
            <thead className="thead">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Ammonix</th>
                <th>Tovex</th>
                <th>D450</th>
                <th>D500</th>
                <th>R17</th>
                <th>R25</th>
                <th>R42</th>
                <th>R65</th>
                <th>R100</th>
                <th>Ligne</th>
                <th>AEI</th>
                <th>État</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {isLoaded ? (
                data
                  .slice(-3)
                  .reverse()
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.Num_Stock}</td>
                      <td>{item.date_commande}</td>
                      <td>{item.ammonix}</td>
                      <td>{item.tovex}</td>
                      <td>{item.detonateur_450}</td>
                      <td>{item.detonateur_500}</td>
                      <td>{item.raccord_17}</td>
                      <td>{item.raccord_25}</td>
                      <td>{item.raccord_42}</td>
                      <td>{item.raccord_65}</td>
                      <td>{item.raccord_100}</td>
                      <td>{item.ligne_tir}</td>
                      <td>{item.aei}</td>
                      <td>{item.etat_stock}</td>
                      <td>
                        <button
                          style={{ padding: "0px 0px", width: "60px" }}
                          type="button"
                          className="button"
                          onClick={() => handleEdit(item)}
                        >
                          Modifier
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          style={{ padding: "5px 0px", width: "80px" }}
                          className="button"
                          onClick={() => handleDelete(item.id)}
                        >
                          Supprimer
                        </button>
                      </td>
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
                  name="Num_Stock"
                  value={formData.Num_Stock}
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
                  name="detonateur_450"
                  value={formData.detonateur_450}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Detos 500ms:</label>
                <input
                  type="number"
                  name="detonateur_500"
                  value={formData.detonateur_500}
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
                  name="ligne_tir"
                  value={formData.ligne_tir}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label> Etat stock:</label>
                <input
                  type="text"
                  name="etat_stock"
                  value={formData.etat_cout}
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
              {editItem && (
                <button type="button" onClick={handleUpdate} className="button">
                  Mettre à jour
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={550} className={"chart1"}>
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
              <XAxis dataKey="Num_Stock" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                type="ammonix"
                dataKey="ammonix"
                fill="#6ED18F"
                activeDot={{ r: 8 }}
              />
              <Bar type="tovex" dataKey="tovex" fill="#E91E63" />
              <Bar type="detos" dataKey="detonateur_450" fill="#AF98C5" />
              <Bar type="detos" dataKey="detonateur_500" fill="#56ffc6" />
              <Bar type="raccord" dataKey="raccord_17" fill="#9576EB" />
              <Bar type="raccord" dataKey="raccord_25" fill="#9C27B0" />
              <Bar type="raccord" dataKey="raccord_42" fill="#b7b5f4" />
              <Bar type="aei" dataKey="aei" fill="#FF5722" />
              <Bar type="ligne" dataKey="ligne_tir" fill="#FFC107" />
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
    </div>
  );
}

export default GestionStock;
