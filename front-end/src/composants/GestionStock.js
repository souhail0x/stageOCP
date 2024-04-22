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

function GestionStock() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    date_commande: "",
    id: "",
    ammonix: "",
    tovex: "",
    detos_500ms: "",
    raccord_65: "",
    raccord_17: "",
    raccord_25: "",
    raccord_42: "",
    raccord_100: "",
    lign: "",
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
      const response = await axios.get("http://localhost:8000/api/gestion-stocks");
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
      axios.get('http://localhost:8000/sanctum/csrf-cookie')
      const response = await axios.post("http://localhost:8000/api/gestion-stocks", formData);
      setData([...data, response.data]);
      setFormData({
        date_commande: "",
        id: "",
        ammonix: "",
        tovex: "",
        detos_500ms: "",
        raccord_65: "",
        raccord_17: "",
        raccord_25: "",
        raccord_42: "",
        raccord_100: "",
        lign: "",
        aei: "",
        etat_stock: "",
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const response = await axios.put(`http://localhost:8000/api/gestion-stocks/${editItem.id}`, formData);
      setEditItem(null); // Clear editItem after updating
      setFormData({}); // Clear formData after updating
      fetchData(); // Fetch data after updating
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const response = await axios.delete(`http://localhost:8000/api/gestion-stocks/${id}`);
      fetchData(); // Fetch data after deleting
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };


  const handleEdit = (item) => {
    setEditItem(item); // Définir l'élément à éditer
    setFormData({
      date_commande: item.date_commande,
      id: item.id,
      ammonix: item.ammonix,
      tovex: item.tovex,
      detos_500ms: item.detos_500ms,
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
        }}
      >
        GESTION DE STOCK
      </h1>
      <div
        className="search-bar"
        style={{
          width: "100%",
          color: "black",
        }}>
      </div>
      <div className="container">
        <div className="tableContainer">
          <table className="table">
            <thead className="thead">
              <tr>
                <th>ID</th>
                <th>Date-com</th>
                <th>Ammonix</th>
                <th>Tovex</th>
                <th>Detos</th>
                <th>R17</th>
                <th>R25</th>
                <th>R42</th>
                <th>R65</th>
                <th>R100</th>
                <th>Lign</th>
                <th>AEI</th>
                <th>État</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                isLoaded?(
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.date_commande}</td>
                  <td>{item.ammonix}</td>
                  <td>{item.tovex}</td>
                  <td>{item.detos_500ms}</td>
                  <td>{item.raccord_17}</td>
                  <td>{item.raccord_25}</td>
                  <td>{item.raccord_42}</td>
                  <td>{item.raccord_65}</td>
                  <td>{item.raccord_100}</td>
                  <td>{item.lign}</td>
                  <td>{item.aei}</td>
                  <td>{item.etat_stock}</td>
                  <td>
                  <button style={{padding:"5px 0px",width:'100px'}} type="button" className="button" onClick={() => handleEdit(item)}>
                    Modifier
                  </button>
                    </td>
                    <td>
                    <button type="button" style={{padding:"5px 0px",width:'100px'}} className="button" onClick={() => handleDelete(item.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
              ):<Loader/>
            }
            </tbody>
          </table>
        </div>

        <div className="form-container">
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
                <label>id:</label>
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
                <label>Quantité Ammonix:</label>
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
                <label>Nbr Detos500ms:</label>
                <input
                  type="number"
                  name="detos_500ms"
                  value={formData.detos_500ms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Nbr R17ms:</label>
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
                <label>Nbr R25ms:</label>
                <input
                  type="number"
                  name="raccord_25"
                  value={formData.raccord_25}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formGroup">
                <label>Nbr R42ms:</label>
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
                <label>Nbr R65ms:</label>
                <input
                  type="number"
                  name="raccord_65"
                  value={formData.raccord_65}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formGroup">
                <label>Nbr R100ms:</label>
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
                <label> etat stock:</label>
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
              <button type="button" onClick={handleAdd} className="button">
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
      </div>

      <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[data[data.length - 1]]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ammonix" fill="#8884d8" />
              <Bar dataKey="tovex" fill="#82ca9d" />
              <Bar dataKey="detos_500ms" fill="#8884d8" />
              <Bar dataKey="raccord_17" fill="#82ca9d" />
              <Bar dataKey="raccord_25" fill="#8884d8" />
              <Bar dataKey="raccord_42" fill="#82ca9d" />
              <Bar dataKey="raccord_65" fill="#8884d8" />
              <Bar dataKey="raccord_100" fill="#82ca9d" />
              <Bar dataKey="lign" fill="#8884d8" />
              <Bar dataKey="aei" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer> 
        </div>
    </div>
  );
}

export default GestionStock;