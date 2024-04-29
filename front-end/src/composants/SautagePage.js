import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SautagePage.css";
import ConfirmationPopup from "./ConfirmationPopup";
import SuccessMessage from "./SuccessMessage";

const SautagePage = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEmptyPopupOpen, setIsEmptyPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [ItemId, setItemId] = useState(null);
  const [data, setData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  // Déclaration des états pour les champs du formulaire
  const [formData, setFormData] = useState({
    date: "",
    numero_execution: "",
    numero_commande: "",
    h_arrivee_camions: "",
    blf_artifices: "",
    effictif: "",
    blf_ammonix: "",
    bs_tovex_artifices: "",
    son: "",
    blf_tovex: "",
    type: "",
    frequence: "",
    heure_tir: "",
    bs_ammonix: "",
    vitesse: "",
    observation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/sautage");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchLastEnteredId(); 
  }, []);
  
  const handleClearForm = () => {
    setFormData({
      date: "",
      numero_execution: "",
      numero_commande: "",
      h_arrivee_camions: "",
      blf_artifices: "",
      effictif: "",
      blf_ammonix: "",
      bs_tovex_artifices: "",
      son: "",
      blf_tovex: "",
      type: "",
      frequence: "",
      heure_tir: "",
      bs_ammonix: "",
      vitesse: "",
      observation: "",
    });
  };

  // Fonction pour gérer l'envoi des données au backend
  const handleAddConfirm = async () => {
    setIsAddPopupOpen(false);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/sautage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData); // Afficher la réponse JSON du serveur
        // Réinitialiser les données du formulaire après l'ajout réussi
        setSuccessMessage("Données ajoutées avec succès !");
      } else {
        console.error("Erreur lors de l'ajout de données");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  const handleAddConfirmation = () => {
    const isFormFilled = Object.values(formData).every(value => value !== "");
    if (isFormFilled) {
      setIsAddPopupOpen(true);
    } else {
      setIsEmptyPopupOpen(true);
    }
  };

  const handleUpdateConfirmation = (id) => {
    setItemId(id);
    setIsEditPopupOpen(true);
  };

  const handleUpdateConfirm = () => {
    setIsEditPopupOpen(false);
    handleUpdate(ItemId);
  };

  const handleUpdate = async (id) => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.put(
        `http://127.0.0.1:8000/api/sautage/${id}`,
        formData
      );
      console.log(response.data);
      setSuccessMessage("Données mises à jour avec succès !");
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  
  const handleDeleteConfirmation = (id) => {
    setItemId(id);
    setIsDeletePopupOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeletePopupOpen(false);
    handleDelete(ItemId);
  };

  const handleDelete = async (id) => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/sautage/${id}`
      );
      console.log(response.data);
      setSuccessMessage("Données supprimées avec succès !");
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const fetchLastEnteredId = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/commandes");
      const data = response.data;
      
      if (data.length > 0) {
        const lastEntry = data[data.length - 1];

        setFormData({
          ...formData,
          numero_commande: lastEntry.Num_Commande.toString(), 
        });
        console.log(formData)
      } 
    } catch (error) {
      console.error("Error fetching last entered ID:", error);
    }
  };

  
  return (
    <div className="sautage">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1
          style={{
            textAlign: "left",
            color: "rgba(255, 255, 255, 0.95)",
            display: "block",
            fontSize: "1.4em",
            marginBlockStart: "1em",
            marginBlockEnd: "1em",
            marginInlineStart: "0px",
            marginInlineEnd: "0px",
            fontWeight: "bold",
            marginLeft: "20px",
          }}
        >
          APRES SAUTAGE
        </h1>
      </div>

      <div style={{ marginTop: "10px" }}>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        {/* Ajouter une marge pour éviter de masquer les champs de formulaire */}
          <table>
            <tr>
              <td colSpan={2}>
                <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="h_arrivee_camions">H.Arrivé Camions:</label>
                  <input
                    type="text"
                    name="h_arrivee_camions"
                    value={formData.h_arrivee_camions}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="blf_artifices">Blf Artifices:</label>
                  <input
                    type="text"
                    name="blf_artifices"
                    value={formData.blf_artifices}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="frequence">Fréquence (HZ):</label>
                  <input
                    type="number"
                    name="frequence"
                    value={formData.frequence}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-group">
                  <label htmlFor="numero_execution">Num d'exécution:</label>
                  <input
                    type="number"
                    name="numero_execution"
                    value={formData.numero_execution}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="numero_commande">Num Commande:</label>
                  <input
                    type="number"
                    name="numero_commande"
                    value={formData.numero_commande}
                    onChange={handleChange}
                    style={{ backgroundColor: "white" }}
                    disabled
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="effictif">Effictif:</label>
                  <input
                    type="text"
                    name="effictif"
                    value={formData.effictif}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="blf_ammonix">Blf Ammonix:</label>
                  <input
                    type="text"
                    name="blf_ammonix"
                    value={formData.blf_ammonix}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="vitesse">Vitesse (mm/s):</label>
                  <input
                    type="number"
                    name="vitesse"
                    value={formData.vitesse}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td>
                <div className="form-group">
                  <label htmlFor="bs_tovex_artifices">
                    Bs Tovex Artifices:
                  </label>
                  <input
                    type="text"
                    name="bs_tovex_artifices"
                    value={formData.bs_tovex_artifices}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="son">Son (db):</label>
                  <input
                    type="number"
                    name="son"
                    value={formData.son}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="blf_tovex">Blf Tovex:</label>
                  <input
                    type="text"
                    name="blf_tovex"
                    value={formData.blf_tovex}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td></td>
              <td></td>

              <td>
                <div className="form-group">
                  <label htmlFor="type">Type:</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="heure_tir">Heure de Tir:</label>
                  <input
                    type="text"
                    name="heure_tir"
                    value={formData.heure_tir}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="bs_ammonix">Bs Ammonix:</label>
                  <input
                    type="text"
                    name="bs_ammonix"
                    value={formData.bs_ammonix}
                    onChange={handleChange}
                    required
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td colSpan={3}>
                <div className="form-group">
                  <label htmlFor="observation">Observation:</label>
                  <textarea
                    name="observation"
                    value={formData.observation}
                    onChange={handleChange}
                    rows={5}
                    cols={150}
                  />
                </div>
              </td>
            </tr>
          </table>

          <div className="btn-container">
            <button
              style={{ backgroundColor: "#45a049", width: "220px" }}
              className="btn btn-ajouter"
              type="submit"
              onClick={handleAddConfirmation}
            >
              AJOUTER
            </button>
            <button
            style={{ backgroundColor: "#45a049", width: "220px" }}
            className="btn btn-edit"
            type="button"
            onClick={() => handleUpdateConfirmation(formData.numero_execution)}
          >
            MODIFIER
          </button>
          <button
            style={{ backgroundColor: "#45a049", width: "220px" }}
            className="btn btn-delete"
            type="button"
            onClick={() => handleDeleteConfirmation(formData.numero_execution)}
          >
            SUPPRIMER
          </button>
            <button
              className="btn btn-clear"
              style={{ backgroundColor: "grey", width: "220px" }}
              type="button"
              onClick={handleClearForm}
            >
              EFFACER
            </button>

            {isAddPopupOpen && (
              <ConfirmationPopup
                message="Êtes-vous sûr de vouloir ajouter les données sautage ?"
                onConfirm={handleAddConfirm}
                onClose={() => setIsAddPopupOpen(false)}
              />
            )}
            {isEmptyPopupOpen && (
              <ConfirmationPopup
                message="Veuillez remplir tous les champs du formulaire"
                onConfirm={() => setIsEmptyPopupOpen(false)}
                onClose={() => setIsEmptyPopupOpen(false)}
              />
            )}
            {isEditPopupOpen && (
              <ConfirmationPopup
                message="Êtes-vous sûr de vouloir modifier les données sautage ?"
                onConfirm={handleUpdateConfirm}
                onClose={() => setIsEditPopupOpen(false)}
              />
            )}
            {isDeletePopupOpen && (
              <ConfirmationPopup
                message="Êtes-vous déjà en train de supprimer les données sautage ?"
                onConfirm={handleDeleteConfirm}
                onClose={() => setIsDeletePopupOpen(false)} />
            )}
          </div>
      </div>
    </div>
  );
};

export default SautagePage;
