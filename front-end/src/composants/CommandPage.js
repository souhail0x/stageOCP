import React, { useState, useEffect } from "react";
import "../styles/CommandPage.css";
import axios from "axios";
import "jspdf-autotable";
import generatePDF from "./pdfGenerator";
import Popup from "./shemaGenerator";

function CommandPage2() {
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

  const handleAdd = async () => {
    try {
      axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/commandes",
        formData
      );
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profondeur" ? parseFloat(value) : value, // Convertir la profondeur en nombre décimal
    });
  };
  const generatePDFHandler = () => {
    generatePDF(formData, submittedData); // Appeler la fonction de génération de PDF avec les données nécessaires
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        prix_ligne_de_tir: prix_ligne_de_tir,
        prix_tovex: prix_tovex,
      };
      setSubmittedData(calculatedResults);
    } else {
      const fieldNames = emptyFields.join(", ");
      alert(`Veuillez remplir les champs suivants : ${fieldNames}`);
    }
  };

  return (
    <div className="App">
      <h2
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
        PARAMETRE DE SAUTAGE
      </h2>
      <div style={{ marginTop: "10px" }}>
        {/* Ajouter une marge pour éviter de masquer les champs de formulaire */}
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
                    <option value="R+C1">R+C1</option>
                    <option value="R+C2">R+C2</option>
                    <option value="R+C3">R+C3</option>
                    <option value="R+C4">R+C4</option>
                    <option value="R+C5">R+C5</option>
                    <option value="R+C6">R+C6</option>
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
                    <option value="LBHIRA">LBHIRA</option>
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
                    <option value="100ms - 25ms - 17ms">100ms - 25ms - 17ms</option>
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
            <button type="submit" onClick={handleSubmit} className="button">
              Calculer
            </button>
            {/* onClick={handleSubmit} */}
            <button type="reset" className="button">
              Effacer
            </button>
          </div>
        </form>

        {submittedData && (
          <div>
            <h3>Résultats du dernier calcul :</h3>
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
                        value={submittedData.longeur.toFixed(2) + " m"}
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
                      <label htmlFor="dosage">dosage :</label>
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
                        value={formData.profondeur.toFixed(2) + " m"}
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
                <h3> Prix Résultats :</h3>
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
                          submittedData.prix_ligne_de_tir.toFixed(2) + " Dh"
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
            <br />
            <button className="button" type="submit" onClick={handleAdd}>
              AJOUTER
            </button>
            <button className="button" onClick={generatePDFHandler}>
              Générer PDF
            </button>
            <button className="button" onClick={togglePopup}>
              Générer le Schema de Tir
            </button>
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
    </div>
  );
}

export default CommandPage2;
