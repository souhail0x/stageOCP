// HomePage.js

import React from 'react';
import '../styles/HomePage.css';
import sautageImage from '../images/sautage.jpg';
import sautageImage2 from '../images/sautage2.jpg';
import tirImage from '../images/tir.jpg';
import tirImage2 from '../images/tir2.jpg';
import logoOcp from '../images/ocp.png';

const HomePage = () => {
  return (
    <div className="page-container">
      <div className="homepage-container">
        <div className="homepage-header">
        <img src={logoOcp} alt="OCP Logo" className="logo" /> {/* Ajoutez le logo */}
          <h1>Section Tir et Sautage</h1>
          <p>Le sautage et le tir sont des processus essentiels dans l'industrie minière. Ils sont utilisés pour fragmenter la roche et faciliter l'extraction des minéraux.</p>
        </div>
        <div className="sautage-section">
          <h2>Sautage</h2>
          <div className="sautage-content">
            <p>
              Le sautage est un processus complexe qui comprend plusieurs étapes essentielles :
            </p>
            <ol>
              <li>Planification : Cela implique l'identification des zones où des explosifs seront utilisés pour le sautage. Cette étape prend en compte la sécurité, l'efficacité et les impacts environnementaux.</li>
              <li>Forage : Des trous sont percés dans la roche à l'aide de foreuses spéciales. La profondeur, l'espacement et l'angle des trous sont calculés en fonction de la géologie du site et de la taille désirée des fragments.</li>
              <li>Chargement : Les trous de forage sont remplis d'explosifs, souvent sous forme de bâtonnets ou de gel explosif. Les explosifs sont généralement insérés dans les trous de forage à l'aide de dispositifs de chargement sécurisés.</li>
              <li>Amorçage : Les détonateurs sont placés dans les explosifs et connectés à une ligne de détonation. Cette ligne relie tous les trous de forage et est utilisée pour synchroniser l'explosion.</li>
              <li>Sécurisation : Avant de déclencher l'explosion, la zone est sécurisée pour s'assurer qu'aucune personne ou aucun équipement ne se trouve à proximité qui pourrait être endommagé par le sautage.</li>
            </ol>
            <div className="image-container">
              <img src={sautageImage} alt="Sautage" className="sautage-image" />
              <img src={sautageImage2} alt="Sautage 2" className="sautage-image" />
            </div>
          </div>
        </div>
        <div className="tir-section">
          <h2>Tir</h2>
          <div className="tir-content">
            <p>
              Le tir est également un processus crucial avec les étapes suivantes :
            </p>
            <ol>
              <li>Vérification de sécurité : Avant de déclencher l'explosion, la zone est de nouveau inspectée pour s'assurer qu'elle est sécurisée et que toutes les personnes ont été éloignées de la zone de danger.</li>
              <li>Détonation : Les détonateurs sont activés, déclenchant ainsi l'explosion. La détonation se propage le long de la ligne de détonation, faisant exploser les charges explosives dans les trous de forage.</li>
              <li>Fragmentation : L'explosion fragmente la roche en morceaux plus petits, ce qui facilite son extraction ultérieure.</li>
              <li>Évaluation : Une fois l'explosion terminée, la zone est inspectée pour évaluer le succès du sautage et pour s'assurer qu'aucun problème de sécurité n'a été créé.</li>
              <li>Nettoyage : Tout débris est éliminé et la zone est préparée pour les étapes suivantes de l'exploitation minière ou du traitement du phosphate.</li>
            </ol>
            <div className="image-container">
              <img src={tirImage} alt="Tir" className="tir-image" />
              <img src={tirImage2} alt="Tir 2" className="tir-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
