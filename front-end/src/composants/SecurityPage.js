import React, { useState } from "react";
import "../styles/SecurityPage.css";
import attention from "../images/attention.png";
import img1Image1 from "../images/img1.jpg";
import img2Image2 from "../images/img2.jpg";
import img3Image3 from "../images/img3.jpg";
import img4Image4 from "../images/img4.jpg";
import img5Image5 from "../images/img5.jpg";
import img6Image6 from "../images/img6.jpg";
import img7Image7 from "../images/img7.jpg";

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
    <div>
      <div className="security-container">
        <h2
          className="security-title"
          style={{
            textAlign: "left",
            color: "rgba(255, 255, 255, 0.95)",
            display: "block",
            textTransform: "uppercase",
            fontSize: "1.3em",
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
        <div className="image-slider-container">
          <div className="h2">
            
          <img src={attention} alt="Image " className="imge" />
            <h1> LA SENSIBILISATION EST NOTRE PREMIER ENGAGEMENT </h1>
          </div>
          <div className="image-slider">
            <div className="card_s">
              <img src={img1Image1} alt="Image 1" className="img" />
            </div>
            <div className="card_s">
              <img src={img2Image2} alt="Image 2" className="img" />
            </div>
            <div className="card_s">
              <img src={img3Image3} alt="Image 3" className="img" />
            </div>
            <div className="card_s">
              <img src={img4Image4} alt="Image 4" className="img" />
            </div>
            <div className="card_s">
              <img src={img5Image5} alt="Image 5" className="img" />
            </div>
            <div className="card_s">
              <img src={img6Image6} alt="Image 6" className="img" />
            </div>
            <div className="card_s">
              <img src={img7Image7} alt="Image 7" className="img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityPage;
