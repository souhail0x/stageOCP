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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Set isLoaded to true after 2000 milliseconds
      setTimeout(() => {
        setIsLoaded(true);
      }, 750);
      const response = await axios.get("http://localhost:8000/api/couts");
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
      setFormData({
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
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.put(
        `http://localhost:8000/api/couts/${editItem.id}`,
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
        `http://localhost:8000/api/couts/${id}`
      );
      fetchData(); // Fetch data after deleting
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
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
        GESTION DES COUTS
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
                      <td>{item.id_cout}</td>
                      <td>{item.dateCommande}</td>
                      <td>{item.ammonix}</td>
                      <td>{item.tovex}</td>
                      <td>{item.detos450ms}</td>
                      <td>{item.detos500ms}</td>
                      <td>{item.raccord17}</td>
                      <td>{item.raccord25}</td>
                      <td>{item.raccord42}</td>
                      <td>{item.raccord65}</td>
                      <td>{item.raccord100}</td>
                      <td>{item.lign}</td>
                      <td>{item.aei}</td>
                      <td>{item.etatCout}</td>
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
                <label> Etat cout:</label>
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
              <XAxis dataKey="id_cout" />
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
              <Bar type="detos" dataKey="detos450" fill="#AF98C5" />
              <Bar type="detos" dataKey="detos500" fill="#56ffc6" />
              <Bar type="raccord" dataKey="raccord17" fill="#9576EB" />
              <Bar type="raccord" dataKey="raccord25" fill="#9C27B0" />
              <Bar type="raccord" dataKey="raccord42" fill="#b7b5f4" />
              <Bar type="raccord" dataKey="raccord65" fill="#94e05e" />
              <Bar type="raccord" dataKey="raccord100" fill="#d975ea" />
              <Bar type="aei" dataKey="aei" fill="#FF5722" />
              <Bar type="lign" dataKey="lign" fill="#FFC107" />
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
