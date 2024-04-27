import React, { useState } from "react";
import "../styles/SautagePage.css";
import ConfirmationPopup from "./ConfirmationPopup";
import SuccessMessage from "./SuccessMessage";

const SautagePage = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
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
        handleClearForm();
      } else {
        console.error("Erreur lors de l'ajout de données");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  const handleAddConfirmation = () => {
    setIsAddPopupOpen(true);
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
                    required
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
              style={{ backgroundColor: "#45a049", width: "420px" }}
              className="btn btn-ajouter"
              type="submit"
              onClick={handleAddConfirmation}
            >
              AJOUTER
            </button>
            <button
              className="btn btn-clear"
              style={{ backgroundColor: "grey", width: "420px" }}
              type="button"
              onClick={handleClearForm}
            >
              EFFACER
            </button>

            {isAddPopupOpen && (
              <ConfirmationPopup
                message="Êtes-vous sûr de vouloir ajouter les données ?"
                onConfirm={handleAddConfirm}
                onClose={() => setIsAddPopupOpen(false)}
              />
            )}
          </div>
      </div>
    </div>
  );
};

export default SautagePage;
