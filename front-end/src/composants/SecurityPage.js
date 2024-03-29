import React, { useState } from "react";
import "../styles/SecurityPage.css";

function SecurityPage() {
  const [pdfFile, setPdfFile] = useState(null); // État pour stocker le fichier PDF importé

  // Fonction pour gérer le changement de fichier PDF importé
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  // Fonction pour afficher le PDF importé
  const displayPDF = () => {
    if (pdfFile) {
      return (
        <embed
          src={URL.createObjectURL(pdfFile)}
          type="application/pdf"
          className="pdf-viewer"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="security-container">
      <h2
        className="security-title"
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
        Security
      </h2>{" "}
      {/* Titre de la page */}
      <div className="pdf-upload">
        <input type="file" accept=".pdf" onChange={handleFileChange} />{" "}
        {/* Champ pour importer des fichiers PDF */}
      </div>
      <div className="pdf-display">
        {displayPDF()} {/* Affichage du PDF importé */}
      </div>
    </div>
  );
}

export default SecurityPage;
