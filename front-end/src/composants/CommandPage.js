import React, { useState, useEffect } from "react";
import "../styles/CommandPage.css";
import axios from "axios";
import "jspdf-autotable";
import generatePDF from "./pdfGenerator";
import Popup from "./shemaGenerator";
import ConfirmationPopup from "./ConfirmationPopup";
import SuccessMessage from "./SuccessMessage";

function CommandPage2() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResetPopupOpen, setIsResetPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isGeneratePDFPopupOpen, setIsGeneratePDFPopupOpen] = useState(false);
<<<<<<< HEAD

  const handleResetConfirmation = () => {
    setIsResetPopupOpen(true);
    handleCancel();
  };

  const handleAddConfirmation = () => {
    setIsAddPopupOpen(true);
  };

  const handleGeneratePDFConfirmation = () => {
    setIsGeneratePDFPopupOpen(true);
  };

  const handleResetConfirm = () => {
    // Logique pour réinitialiser le formulaire
    setIsResetPopupOpen(false);
  };

  const handleAddConfirm = () => {
    // Logique pour ajouter les données
    setIsAddPopupOpen(false);
    handleAdd();
  };

  const handleGeneratePDFConfirm = () => {
    // Logique pour générer le PDF
    setIsGeneratePDFPopupOpen(false);
    generatePDFHandler();
  };

=======
  const [commandId,setCommandId]=useState('')
  const [machine, setMachine] = useState([]);
>>>>>>> 3a14d8adcd23c7bb92250c7203a1c1516273cfa2
  const [formData, setFormData] = useState({
    date: "",
    Num_Commande: "",
    panneau: "",
    tranche: "",
    niveau: "",
    mode_tir: "",
    foration: "",
    nombre_trous: "",
    nombre_ranges: "",
    trous_range: "",
    maille_banquette: "",
    espacement: "",
    decappage: "",
    profondeur: "",
    zone_tir: "",
    mode_charge: "",
    dosage_prevu: "",
    schema_tir: "",
  });

  const [data, setData] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log(formData.nombre_ranges);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/commandes");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCancel = () => {
    setIsSubmitted(false);
    setFormData({
      date: "",
      Num_Commande: "",
      panneau: "",
      tranche: "",
      niveau: "",
      mode_tir: "",
      foration: "",
      nombre_trous: "",
      nombre_ranges: "",
      trous_range: "",
      maille_banquette: "",
      espacement: "",
      decappage: "",
      profondeur: "",
      zone_tir: "",
      mode_charge: "",
      dosage_prevu: "",
      schema_tir: "",
    });
  };

<<<<<<< HEAD
=======
  const handleAddConfirmation = () => {
    setIsAddPopupOpen(true);
  };

  const handleAddConfirm = () => {
    setIsAddPopupOpen(false);
    if ( handleAdd()) {
      addCalcules();
    }
    
  };
  const addCalcules = async () => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/commandes/resultats",
        {
          longeur: submittedData.longeur ,
          dosage:submittedData.dosage,
          largeur:submittedData.largeur ,
          surface:submittedData.surface ,
          volume:submittedData.volume ,
          ligneDeTir:submittedData.ligneDeTir ,
          ammonix:submittedData.ammonix ,
          tovex:submittedData.tovex ,
          aei:submittedData.aei,
          profondeur:formData.profondeur,
          repartition:submittedData.repartition ,
          chargeInstantanee:submittedData.chargeInstantanee ,
          r_prevu:submittedData.rendement ,
          m_f:submittedData.metrageFore ,
          detonateur:submittedData.detonateur500,
          r17:submittedData.r17,
          r25:submittedData.r25,
          r42:submittedData.r42,
          r65:submittedData.r65,
          r100:submittedData.r100 ,
          prix_aei:submittedData.prix_aei ,
          prix_detonateur:submittedData.prix_detonateur ,
          prix_raccord:submittedData.prix_raccord ,
          prix_ammonix:submittedData.prix_ammonix ,
          prix_lingeTir:submittedData.prix_lingeTir , // Corrected key name
          prix_tovex:submittedData.prix_tovex ,
      }
      );
      console.log(response.data);
      setSuccessMessage("Caclules ajoutées avec succès !");
      fetchData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
>>>>>>> 3a14d8adcd23c7bb92250c7203a1c1516273cfa2
  const handleAdd = async () => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/commandes",
        formData
      );
      console.log(response.data);
      setSuccessMessage("Données ajoutées avec succès !");
      fetchData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

<<<<<<< HEAD
=======
  const handleUpdateConfirmation = (id) => {
    setUpdateItemId(id);
    setIsUpdatePopupOpen(true);
  };

  const handleUpdateConfirm = () => {
    setIsUpdatePopupOpen(false);
    handleUpdate(updateItemId);
  };

  const handleUpdate = async (id) => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.put(
        `http://127.0.0.1:8000/api/commandes/${id}`,
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
    setUpdateItemId(id);
    setIsDeletePopupOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeletePopupOpen(false);
    console.log(updateItemId);
    handleDelete(updateItemId);
  }

  const handleDelete = async (id) => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/commandes/${id}`
      );
      console.log(response.data);
      
      setSuccessMessage("Données supprimées avec succès !");
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

>>>>>>> 3a14d8adcd23c7bb92250c7203a1c1516273cfa2
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profondeur" ? parseFloat(value) : value, // Convertir la profondeur en nombre décimal
    });
  };
  const generatePDFHandler = () => {
    generatePDF(formData, submittedData); 
    setSuccessMessage("PDF genéré avec succès !");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const emptyFields = [];
    for (const key in formData) {
      if (formData[key] === "") {
        emptyFields.push(key);
      }
    }

    if (emptyFields.length === 0) {
      // Calculer les résultats
      const longeur =
        parseInt(formData.espacement) * parseInt(formData.trous_range);
      const largeur =
        parseInt(formData.nombre_ranges) * parseInt(formData.maille_banquette);
      const surface = longeur * largeur;
      const volume = surface * parseInt(formData.profondeur);
      const ligneDeTir = 500;

      let ammonix =
        parseFloat(formData.dosage_prevu) * volume * Math.pow(10, -3);
      let dosage = (ammonix / volume) * parseInt(1000);
      let tovex;
      if (formData.mode_charge === "unique") {
        tovex = parseInt(formData.nombre_trous) / parseInt(2);
      } else if (formData.mode_charge === "2_etage") {
        tovex = parseInt(formData.nombre_trous);
      } else {
        tovex = parseInt(formData.nombre_trous) * parseInt(3);
      }

      // Vérifier si les résultats ne sont pas multiples de 25
      if (ammonix % 25 !== 0) {
        ammonix = Math.ceil(ammonix / 25) * 25; // Arrondir à la prochaine valeur multiple de 25
      }
      if (tovex % 25 !== 0) {
        tovex = Math.ceil(tovex / 25) * 25; // Arrondir à la prochaine valeur multiple de 25
      }

      const aei = 1;
      const repartition = ammonix / parseInt(formData.nombre_trous) / 25;
      const chargeInstantanee = repartition * 25;
      const rendement = volume / 18;
      const prix_a_e_i = 8 * 1;
      let detonateur500 = parseInt(formData.nombre_trous) + parseInt(2);
      let detonateur450 = parseInt(formData.nombre_trous) + parseInt(2);
      let r17 = 0;
      let r25 = 0;
      let r42 = 0;
      let r65 = 0;
      let r100 = 0;

      if (formData.foration === "D500" || formData.foration === "D700") {
        r17 =
          parseInt(formData.nombre_trous) / parseInt(2) -
          parseInt(formData.trous_range) +
          parseInt(2);
      } else {
        if (formData.schema_tir === "17ms - 25 ms - 42 ms") {
          r17 =
            parseInt(formData.nombre_trous) -
            parseInt(formData.nombre_ranges) * parseInt(2) +
            parseInt(2);
        } else if (formData.schema_tir === "17ms - 25ms - 42ms - 65ms") {
          r17 =
            parseInt(formData.nombre_trous) -
            parseInt(formData.nombre_ranges) * parseInt(2) +
            parseInt(2);
        } else if (formData.schema_tir === "42ms - 17ms") {
          r17 =
            parseInt(formData.nombre_trous) -
            parseInt(formData.trous_range) +
            parseInt(2);
        } else if (formData.schema_tir === "100ms - 17ms") {
          r17 =
            parseInt(formData.nombre_trous) -
            parseInt(formData.trous_range) +
            parseInt(2);
        }
      }

      if (formData.schema_tir === "17ms - 25 ms - 42 ms") {
        r25 = parseInt(formData.nombre_ranges) + parseInt(2);
        r42 = parseInt(formData.nombre_ranges) + parseInt(2);
      } else if (formData.schema_tir === "17ms - 25ms - 42ms - 65ms") {
        r25 = parseInt(formData.nombre_ranges) + parseInt(2);
        r42 = parseInt(formData.nombre_ranges) + parseInt(2);
        r65 = parseInt(formData.nombre_ranges) + parseInt(2);
      } else if (formData.schema_tir === "42ms - 17ms") {
        r42 = parseInt(formData.trous_range) + parseInt(2);
      } else if (formData.schema_tir === "100ms - 17ms") {
        r100 = parseInt(formData.trous_range) + parseInt(2);
      }
      let prix_detonateur;
      if (formData.mode_charge === "unique") {
        prix_detonateur = parseFloat(detonateur500) * parseFloat(49.9);
      } else {
        prix_detonateur = parseFloat(detonateur500) * parseFloat(49.9) * 2;
      }

      const prix_raccord =
        parseFloat(34.9) * parseFloat(r17) +
        parseFloat(34.9) * parseFloat(r25) +
        parseFloat(34.9) * parseFloat(r42) +
        parseFloat(34.9) * parseFloat(r65) +
        parseFloat(34.9) * parseFloat(r100);
      const prix_ammonix = 7.64 * ammonix;
      const prix_ligne_de_tir = 4000;
      const prix_tovex = 18.45 * parseFloat(tovex);
      const metrageFore =
        parseInt(formData.nombre_trous) * parseFloat(formData.profondeur);

      if (formData.mode_charge === "unique") {
        detonateur450 = 0;
      }

      const calculatedResults = {
        longeur: longeur,
        dosage: dosage,
        largeur: largeur,
        surface: surface,
        volume: volume,
        ligneDeTir: ligneDeTir,
        ammonix: ammonix,
        tovex: tovex,
        aei: aei,
        repartition: repartition,
        chargeInstantanee: chargeInstantanee,
        rendement: rendement,
        metrageFore: metrageFore,
        detonateur500: detonateur500,
        detonateur450: detonateur450,
        r17: r17,
        r25: r25,
        r42: r42,
        r65: r65,
        r100: r100,
        prix_a_e_i: prix_a_e_i,
        prix_detonateur: prix_detonateur,
        prix_raccord: prix_raccord,
        prix_ammonix: prix_ammonix,
<<<<<<< HEAD
        prix_ligne_de_tir: prix_ligne_de_tir,
=======
        prix_lingeTir: prix_ligne_de_tir?parseFloat(prix_ligne_de_tir):0,
>>>>>>> 3a14d8adcd23c7bb92250c7203a1c1516273cfa2
        prix_tovex: prix_tovex,
      };
      setSubmittedData(calculatedResults);
    } else {
      const fieldNames = emptyFields.join(", ");
      alert(`Veuillez remplir les champs suivants : ${fieldNames}`);
    }
  };
<<<<<<< HEAD
=======
  
  const chooseMachine = async (e) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: value, // Update the form data with the selected value
    });
  
    try {
      // Use the updated value of machine directly from the state
      const response = await axios.get(`http://127.0.0.1:8000/api/commandes/machine/${value}`);
      
      console.log(commandId);
      setMachine(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    if (machine && machine.length > 0) {
      // Update the form data with the machine data
      setCommandId(machine[0].id)
      setFormData({
        ...formData,
        date: machine[0].date || "",
        Num_Commande: machine[0].Num_Commande || "",
        panneau: machine[0].panneau || "",
        tranche: machine[0].tranche || "",
        niveau: machine[0].niveau || "",
        mode_tir: machine[0].mode_tir || "",
        foration: machine[0].foration || "",
        nombre_trous: machine[0].nombre_trous || "",
        nombre_ranges: machine[0].nombre_ranges || "",
        trous_range: machine[0].trous_range || "",
        maille_banquette: machine[0].maille_banquette || "",
        decappage: machine[0].decappage || "",
        profondeur: machine[0].profondeur || "",
        zone_tir: machine[0].zone_tir || "",
        mode_charge: machine[0].mode_charge || "",
        dosage_prevu: machine[0].dosage_prevu || "",
        schema_tir: machine[0].schema_tir || "",
      });
    }else{
      setFormData({
        ...formData,
        date:  "",
        Num_Commande: "",
        panneau:  "",
        tranche:"",
        niveau:  "",
        mode_tir: "",
        foration: "",
        nombre_trous:"",
        nombre_ranges:  "",
        trous_range:  "",
        maille_banquette:"",
        decappage:  "",
        profondeur:  "",
        zone_tir: "",
        mode_charge:  "",
        dosage_prevu:  "",
        schema_tir:  "",
      })
    }
  }, [machine]);
  
>>>>>>> 3a14d8adcd23c7bb92250c7203a1c1516273cfa2

  return (
    <div className="page-commande">
      
      <h2
        style={{
          textAlign: "left",
          color: "rgba(255, 255, 255, 0.95)",
          display: "block",
          fontSize: "1.3em",
          marginLeft: "20px",
          fontWeight: "bold",
        }}
      >
        PARAMETRE DE SAUTAGE
      </h2>
      <div style={{ marginTop: "10px" }}>
        <form onSubmit={handleSubmit}>
          <table>
            <tr>
              <td colSpan={2}>
                <div className="form-group">
                  <label>Date :</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </td>

              <td>
                <div className="form-group">
                  <label htmlFor="niveau">Niveau :</label>
                  <select
                    id="niveau"
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleChange}
                  >
                    <option value="">select niveau</option>
                    <option value="R/C1">R/C1</option>
                    <option value="R/C2">R/C2</option>
                    <option value="R/C3">R/C3</option>
                    <option value="R/C4">R/C4</option>
                    <option value="R/C5">R/C5</option>
                    <option value="R/C6">R/C6</option>
                    <option value="R/SB">R/SB</option>
                    <option value="R/SA1">R/SA1</option>
                    <option value="R/SA2">R/SA2</option>
                    <option value="Int1/2">Int1/2</option>
                    <option value="Int2/3">Int2/3</option>
                    <option value="Int3/4">Int3/4</option>
                    <option value="Int4/5">Int4/5</option>
                    <option value="Int5/6">Int5/6</option>
                    <option value="Int3/5">Int3/5</option>
                  </select>
                </div>
              </td>

              <td>
                <div className="form-group">
                  <label htmlFor="panneau">Panneau :</label>
                  <select
                    id="panneau"
                    name="panneau"
                    value={formData.panneau}
                    onChange={handleChange}
                  >
                    <option value="">select panneau</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                    <option value="P3">P3</option>
                    <option value="P4">P4</option>
                    <option value="P5">P5</option>
                    <option value="P6">P6</option>
                    <option value="P7">P7</option>
                    <option value="P8">P8</option>
                  </select>
                </div>
              </td>

              <td>
                <div className="form-group">
                  <label htmlFor="tranche">Tranche :</label>
                  <input
                    type="text"
                    id="tranche"
                    name="tranche"
                    value={formData.tranche}
                    onChange={handleChange}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="form-group">
                  <label>Num Commande:</label>
                  <input
                    type="number"
                    id="Num_Commande"
                    name="Num_Commande"
                    value={formData.Num_Commande}
                    onChange={handleChange}
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="mode_tir">Mode de tir :</label>
                  <select
                    id="mode_tir"
                    name="mode_tir"
                    value={formData.mode_tir}
                    onChange={handleChange}
                  >
                    <option value="">select mode de tir </option>
                    <option value="Nonel">Nonel</option>
                    <option value="Électrique">Électrique</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="foration">Foration :</label>
                  <select
                    id="foration"
                    name="foration"
                    value={formData.foration}
                    onChange={handleChange}
                  >
                    <option value="">select Foration</option>
                    <option value="PV1">PV1</option>
                    <option value="DK6">DKS</option>
                    <option value="SKF1">SKF1</option>
                    <option value="SNF2">SNF2</option>
                    <option value="D500">D500</option>
                    <option value="D700">D700</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="nombre_trous">Nombre de trous :</label>
                  <input
                    type="number"
                    id="nombre_trous"
                    name="nombre_trous"
                    value={formData.nombre_trous}
                    onChange={handleChange}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                <div className="form-group">
                  <label htmlFor="trous_range">
                    Nombre de trous par rangé :
                  </label>
                  <input
                    type="number"
                    id="trous_range"
                    name="trous_range"
                    value={formData.trous_range}
                    onChange={handleChange}
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="espacement">Maille :</label>
                  <div
                    style={{
                      display: "flex",
                      // justifyContent:"space-between",
                      marginRight: "30px",
                    }}
                  >
                    <select
                      id="espacement"
                      name="espacement"
                      className="espacement"
                      value={formData.espacement}
                      onChange={handleChange}
                      style={{
                        width: "calc((100% - 22px));",
                        // margin:"1px"
                      }}
                    >
                      <option>espacement</option>
                      {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      id="maille_banquette"
                      name="maille_banquette"
                      className="maille_banquette"
                      value={formData.maille_banquette}
                      onChange={handleChange}
                      style={{
                        width: "calc((100% - 22px))",
                      }}
                    >
                      <option>banquette</option>
                      {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="decappage">Décapage :</label>
                  <select
                    id="decappage"
                    name="decappage"
                    value={formData.decappage}
                    onChange={handleChange}
                  >
                    <option value="">select decapage</option>
                    <option value="7500|1">7500|1</option>
                    <option value="7500|2">7500|2</option>
                    <option value="PH1">PH1</option>
                    <option value="PH2">PH2</option>
                    <option value="PROCANEQ">PROCANEQ</option>
                    <option value="TRANSWIN">TRANSWIN</option>
                    <option value="NGE">NGE</option>
                    <option value="EE">EE</option>

                  </select>
                </div>
              </td>
            </tr>

            <tr>
              <td></td>
              <td></td>

              <td>
                <div className="form-group">
                  <label htmlFor="profondeur">Profondeur :</label>
                  <input
                    type="number" // Changer le type en "number"
                    id="profondeur"
                    name="profondeur"
                    value={formData.profondeur}
                    onChange={handleChange}
                    step="0.01" // Spécifier la précision à deux chiffres après la virgule
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="zone_tir">Zone de tir :</label>
                  <select
                    id="zone_tir"
                    name="zone_tir"
                    value={formData.zone_tir}
                    onChange={handleChange}
                  >
                    <option value="">select zone de tir </option>
                    <option value="LBRAYKIYIN">LBRAYKIYIN</option>
                    <option value="LBRAHLA">LBRAHLA</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="mode_charge">Mode de charge :</label>
                  <select
                    id="mode_charge"
                    name="mode_charge"
                    value={formData.mode_charge}
                    onChange={handleChange}
                  >
                    <option value="">select le mode de tir</option>
                    <option value="unique">Unique</option>
                    <option value="2_etage">2 étage</option>
                    <option value="3_etage">3 étage</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                <div className="form-group">
                  <label htmlFor="dosage_prevu">Dosage prévu :</label>
                  <input
                    type="text"
                    id="dosage_prevu"
                    name="dosage_prevu"
                    value={formData.dosage_prevu}
                    onChange={handleChange}
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="schema_tir">Schéma de tir :</label>
                  <select
                    id="schema_tir"
                    name="schema_tir"
                    value={formData.schema_tir}
                    onChange={handleChange}
                  >
                    <option value="">select schéma</option>
                    <option value="17ms - 25 ms - 42 ms">
                      17ms - 25 ms - 42 ms
                    </option>
                    <option value="17ms - 25ms - 42ms - 65ms">
                      17ms - 25ms - 42ms - 65ms
                    </option>
                    <option value="42ms - 17ms">42ms - 17ms</option>
                    <option value="100ms - 25ms - 17ms">
                      100ms - 25ms - 17ms
                    </option>
                    <option value="100ms - 17ms">100ms - 17ms</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label htmlFor="nombre_ranges">Nombre de rangés :</label>
                  <input
                    type="number"
                    id="nombre_ranges"
                    name="nombre_ranges"
                    value={formData.nombre_ranges}
                    onChange={handleChange}
                  />
                </div>
              </td>
            </tr>
          </table>

          <div className="form-row">
            <button type="submit" onClick={handleAddConfirmation} className="button">
              Calculer
            </button>

            <button
              type="reset"
              className="button"
              onClick={handleResetConfirmation}
              disabled={isSubmitted}
            >
              Effacer
            </button>
            {isResetPopupOpen && (
              <ConfirmationPopup
                message="Êtes-vous sûr de vouloir effacer les données du formulaire ?"
                onConfirm={handleResetConfirm}
                onClose={() => setIsResetPopupOpen(false)}
              />
            )}
          </div>
        </form>

        <br />

        {submittedData && (
          <div>
            <center>
              <hr
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.95)",
                  width: "50%",
                }}
              />
            </center>
            <br />
            <h3
              style={{
                textAlign: "left",
                textTransform: "uppercase",
                color: "white",
                paddingLeft: "20px",
              }}
            >
              Résultats du dernier calcul :
            </h3>
            <form>
              <table>
                <tr>
                  <td>
                    <div className="form-group">
                      <label>longeur :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={parseFloat(submittedData.longeur).toFixed(2) + " m"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>

                  <td>
                    <div className="form-group">
                      <label htmlFor="largeur">largeur:</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.largeur.toFixed(2) + " m"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>

                  <td>
                    <div className="form-group">
                      <label htmlFor="surface">surface :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.surface.toFixed(2) + " m²"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>

                  <td>
                    <div className="form-group">
                      <label htmlFor="volume">volume :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.volume.toFixed(2) + " m³"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-group">
                      <label htmlFor="Ammonix">Ammonix :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.ammonix + " Kg"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="dosage réalisé">dosage réalisé :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.dosage.toFixed(2) + " g/m³"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="tovex">tovex :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.tovex + " Kg"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="metrageFore">M.F :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.metrageFore.toFixed(2) + " ml"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-group">
                      <label htmlFor="ligneDeTir">ligne De Tir :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.ligneDeTir + " m"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="A_E_I">A-E-I :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.aei + " U"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="charge_nstantanee">
                        charge instantanee :
                      </label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={
                          submittedData.chargeInstantanee.toFixed(2) + " Kg"
                        }
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="repartition">repartition :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={
                          submittedData.repartition.toFixed(2) + " Sac/trou"
                        }
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="form-group">
                      <label htmlFor="rendement">R.prevu :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.rendement.toFixed(2) + " m³/h"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>

                  <td>
                    <div className="form-group">
                      <label htmlFor="profondeur">profondeur :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={parseFloat(formData.profondeur).toFixed(2) + " m"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="detonateur">detonateur :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={
                          submittedData.detonateur500.toFixed(2) +
                          " (500ms)  /  " +
                          submittedData.detonateur450.toFixed(2) +
                          " (450ms)"
                        }
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="R17">R17 :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.r17 + " U"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-group">
                      <label htmlFor="R25">R25 :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.r25 + " U"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="R42">R42 :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.r42 + " U"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="R65">R65 :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.r65 + " U"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="R100">R100 :</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.r100 + " U"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                </tr>
                <h3
                  style={{
                    textAlign: "left",
                    textTransform: "uppercase",
                    color: "white",
                    paddingLeft: "20px",
                    padding: "20px",
                  }}
                >
                  {" "}
                  Prix Résultats :
                </h3>
                <tr>
                  <td>
                    <div className="form-group">
                      <label htmlFor="prix_a_e_i">AEI (8.00dh/Unité):</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.prix_a_e_i.toFixed(2) + " Dh"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>

                  <td>
                    <div className="form-group">
                      <label htmlFor="prix_detonateur">
                        Detonateur (49.90dh/Unité):
                      </label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.prix_detonateur.toFixed(2) + " Dh"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>

                  <td>
                    <div className="form-group">
                      <label htmlFor="prix_raccord">
                        Raccord (34.90dh/Unité):
                      </label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.prix_raccord.toFixed(2) + " Dh"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>

                  <td>
                    <div className="form-group">
                      <label htmlFor="prix_ammonix">Ammonix (7.00dh/Kg):</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.prix_ammonix.toFixed(2) + " Dh"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-group">
                      <label htmlFor="prix_ligne_de_tir">
                        Ligne de tir (1.25dh/m):
                      </label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={
<<<<<<< HEAD
                          submittedData.prix_ligne_de_tir.toFixed(2) + " Dh"
=======
                          parseFloat(submittedData.prix_prix_lingeTir).toFixed(2) + " Dh"
>>>>>>> 3a14d8adcd23c7bb92250c7203a1c1516273cfa2
                        }
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="prix_tovex">Tovex (18.45dh/Kg):</label>
                      <input
                        type="TEXT"
                        id=""
                        name=""
                        value={submittedData.prix_tovex.toFixed(2) + " Dh"}
                        readOnly // Rendre le champ en lecture seule
                      />
                    </div>
                  </td>
                </tr>
              </table>
            </form>
            { successMessage && <SuccessMessage>{successMessage}</SuccessMessage> }

            <br />
            <div className="form-row">

              <button
                className="button"
                type="submit"
                onClick={handleAddConfirmation}
              >
                Ajouter
              </button>
<<<<<<< HEAD
              {isAddPopupOpen && (
                <ConfirmationPopup
                  message="Êtes-vous sûr de vouloir ajouter les données ?"
                  onConfirm={handleAddConfirm}
                  onClose={() => setIsAddPopupOpen(false)}
                />
              )}
=======
              <button
                className="button"
                type="submit"
                style={{ marginBottom: "10px" }}
                onClick={() => handleUpdateConfirmation(formData.Num_Commande)}
              >
                Modifier
              </button>
              <button
                className="button"
                type="submit"
                style={{ marginBottom: "10px" }}
                onClick={() => handleDeleteConfirmation(formData.Num_Commande)}
              >
                Supprimer
              </button>

              <br />
>>>>>>> 3a14d8adcd23c7bb92250c7203a1c1516273cfa2
              <button
                className="button"
                onClick={handleGeneratePDFConfirmation}
              >
                Générer PDF
              </button>
              {isGeneratePDFPopupOpen && (
                <ConfirmationPopup
                  message="Êtes-vous sûr de vouloir générer le PDF ?"
                  onConfirm={handleGeneratePDFConfirm}
                  onClose={() => setIsGeneratePDFPopupOpen(false)}
                />
              )}
              <button className="button" onClick={togglePopup}>
                Générer Schéma Tir
              </button>
            </div>
            {isOpen && (
              <Popup
                onClose={togglePopup}
                trous={formData.trous_range}
                ranges={formData.nombre_ranges}
                selectedSchema={formData.schema_tir}
              >
                <h2>This is a Popup!</h2>
                <p>Popup content goes here.</p>
              </Popup>
            )}

            <br />
            <br />
          </div>
        )}
      </div>
      {isAddPopupOpen && (
                <ConfirmationPopup
                  message="Êtes-vous sûr de vouloir calculer la commande ?"
                  onConfirm={handleSubmit}
                  onClose={() => setIsAddPopupOpen(false)}
                />
              )}
    </div>
  );
}

export default CommandPage2;
