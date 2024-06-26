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
      setTimeout(() => {
        setIsLoaded(true);
      }, 750);

      // Données du stock entrant 
      const response = await axios.get(
        "http://localhost:8000/api/couts"
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
    acc[key] = (initialStock[key] + sum[key]);
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
    acc[key] = (remainingStock[key] - sum2[key])/2 ;
    return acc;
  }, {});

  console.log("remainingStock", remainingStock);
  console.log("sum", sum);
  console.log("sum2", sum2);
  console.log("minusStock", minusStock);

  const chartData = Object.keys(sum)
  .filter(key => key !== "updated_at" && key !== "created_at" && key !== "raccord100" && key !== "raccord65" && key !== "raccord42" && key !== "raccord25" && key !== "raccord17" && key !== "detos450ms" && key !== "detos500ms" && key !== "etatCout" && key !== "dateCommande" && key !== "id_cout" && key !== "id" ) 
  .map((key) => ({
    category: key,
    initialStock: initialStock[key],
    sum2: sum2[key],
  }));

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
                <th>Detonateur</th>
                <th>Raccord</th>
                <th>Ligne</th>
                <th>AEI</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{new Date().toLocaleDateString()}</td>
                <td>-</td>
                <td>{remainingStock.ammonix - sum2.prix_ammonix}</td>
                <td>{remainingStock.tovex - sum2.prix_tovex}</td>
                <td>{remainingStock.detos_450ms + remainingStock.detos_500ms - sum2.prix_detonateur }</td>
                <td>{remainingStock.raccord - sum2.prix_raccord}</td>
                <td>{remainingStock.lign - sum2.ligneDeTir }</td>
                <td>{remainingStock.aei - sum2.prix_aei}</td>
                <td>Cout Actuel</td>
              </tr>
              {isLoaded ? (
                minusData
                  .slice(-1)
                  .reverse()
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.created_at.split("T")[0]}</td>
                      <td>{item.id}</td>
                      <td>{item.prix_ammonix}</td>
                      <td>{item.prix_tovex}</td>
                      <td>{item.prix_detonateur}</td>
                      <td>{item.prix_raccord}</td>
                      <td>{item.prix_lingeTir}</td>
                      <td>{item.prix_aei}</td>
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
                <label>Num_Cout :</label>
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
                dataKey="initialStock"
                fill="#FF6B6B"
                name="Cout Initial"
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
