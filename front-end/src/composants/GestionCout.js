import React, { useState, useEffect } from "react";
import axios from "axios"; // install axios --> npm install axios
import ReactApexChart from "react-apexcharts";
import '../styles/GestionCout.css';
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


function GestionCout() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    dateCommande: "",
    id_cout: "",
    ammonix: "",
    tovex: "",
    detos500ms: "",
    raccord17: "",
    raccord25: "",
    raccord42: "",
    raccord65: "",
    raccord100: "",
    lign: "",
    aei: "",
    etatCout: ""
  });


  const dataChart = [];


  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // Set isLoaded to true after 2000 milliseconds
      setTimeout(() => {
        setIsLoaded(true);
      }, 750);
  
      const response = await axios.get("http://127.0.0.1:8000/api/couts");
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
      const response = await axios.post("http://127.0.0.1:8000/api/couts", formData);
      setData([...data, response.data]);
      setFormData({
        dateCommande: "",
        id_cout: "",
        ammonix: "",
        tovex: "",
        detos500ms: "",
        raccord17: "",
        raccord25: "",
        raccord42: "",
        raccord65: "",
        raccord100: "",
        lign: "",
        aei: "",
        etatCout: ""
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const response = await axios.put(`http://127.0.0.1:8000/api/couts/${editItem.id}`, formData);
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
      const response = await axios.delete(`http://127.0.0.1:8000/api/couts/${id}`); // Utilisation des backticks
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
        GESTION DE COûT
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
                <th>État Coût</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              isLoaded?(
                
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id_cout}</td>
                  <td>{item.dateCommande}</td>
                  <td>{item.ammonix}</td>
                  <td>{item.tovex}</td>
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
                    <button style={{ padding: "5px" }} type="button" className="button" onClick={() => handleEdit(item)}>
                      Modifier
                    </button>

                  </td>
                  <td>
                    <button type="button" style={{ padding: "5px" }} className="button" onClick={() => handleDelete(item.id)} >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
           
              ):<Loading/>
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
                  name="dateCommande"
                  value={formData.dateCommande}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>id:</label>
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
                <label>Prix Ammonix:</label>
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
                <label>Prix Detos500ms:</label>
                <input
                  type="number"
                  name="detos500ms"
                  value={formData.detos500ms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label>Prix R17ms:</label>
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
                <label>Prix R25ms:</label>
                <input
                  type="number"
                  name="raccord25"
                  value={formData.raccord25}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formGroup">
                <label>Prix R42ms:</label>
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
                <label>Prix R65ms:</label>
                <input
                  type="number"
                  name="raccord65"
                  value={formData.raccord65}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formGroup">
                <label>Prix R100ms:</label>
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
                <label>Prix AEI:</label>
                <input
                  type="number"
                  name="aei"
                  value={formData.aei}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formGroup">
                <label>Prix Ligne:</label>
                <input
                  type="number"
                  name="lign"
                  value={formData.lign}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formGroup">
                <label> etat cout:</label>
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
            <Bar dataKey="detos500ms" fill="#8884d8" />
            <Bar dataKey="raccord17" fill="#82ca9d" />
            <Bar dataKey="raccord25" fill="#8884d8" />
            <Bar dataKey="raccord42" fill="#82ca9d" />
            <Bar dataKey="raccord65" fill="#8884d8" />
            <Bar dataKey="raccord100" fill="#82ca9d" />
            <Bar dataKey="lign" fill="#8884d8" />
            <Bar dataKey="aei" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GestionCout;