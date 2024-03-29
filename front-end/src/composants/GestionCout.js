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


function GestionCout() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    dateCommande : "" ,
    id_cout : "",
    ammonix : "" ,
    tovex : "" ,
    detos500ms : "" ,
    raccord17 : "" ,
    raccord25 : "" ,
    raccord42 : "" ,
    raccord65 : "" ,
    raccord100 : "" ,
    lign : "" ,
    aei : "" ,
    etatCout : ""
  });

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


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/couts"); // Remplacez 'url_de_votre_api' par API qui récupère les données
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
        dateCommande : "" ,
        id_cout : "",
        ammonix : "" ,
        tovex : "" ,
        detos500ms : "" ,
        raccord17 : "" ,
        raccord25 : "" ,
        raccord42 : "" ,
        raccord65 : "" ,
        raccord100 : "" ,
        lign : "" ,
        aei : "" ,
        etatCout : ""
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  
  const handleUpdate = async (item) => {
    try {
      axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const response = await axios.put(`http://127.0.0.1:8000/api/couts/${item.id}`, item);
      const updatedData = data.map(dataItem => (dataItem.id === item.id ? response.data : dataItem));
      setData(updatedData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  
  
  
  const handleDelete = async (id) => {

    try {
      axios.get('http://localhost:8000/sanctum/csrf-cookie')
      await axios.delete(`http://127.0.0.1:8000/api/couts/${id}`);
      const updatedData = data.filter(item => item.idCout !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
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
        }}
      >
        {/* Barre de recherche */}
        <input
          placeholder="recherche"
          className="searchInput"
          style={{ padding: "3px 10px",height:"30px"}}
        />
        <button
          style={{ padding: "3px 10px" }}
          type="button"
          onClick={handleAdd}
          className="button"
        >
          Recherche
        </button>
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
            {data.map((item, index) => (
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
                  <button style={{padding:"5px"}} type="button" className="button" onClick={() => handleUpdate(item)} >
                    Modifier
                  </button>
                    </td>
                    <td>
                    <button type="button" style={{padding:"5px"}} className="button" onClick={() => handleDelete(item.id)} >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
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
                <label> etat stock:</label>
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
            <BarChart
              width={100}
              height={100}
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
  );
}

export default GestionCout;