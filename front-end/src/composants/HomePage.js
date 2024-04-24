import React, { useState } from 'react';
import '../styles/HomePage.css'; 
import ammonix1Image1 from '../images/ammonix1.jpg';
import ammonix2Image2 from '../images/ammonix2.jpg';
import ammonix3Image3 from '../images/ammonix3.jpg';
import tov1Image1 from '../images/tov1.jpg';
import tov2Image2 from '../images/tov2.jpg';
import tov3Image3 from '../images/tov3.jpg';
import detos1Image1 from '../images/detos1.jpg';
import detos2Image2 from '../images/detos2.jpg';
import detos3Image3 from '../images/detos3.png';
import racc1Image1 from '../images/racc1.jpg';
import racc2Image2 from '../images/racc2.jpg';
import racc3Image3 from '../images/racc3.jpg';
import homeImage from '../images/home.jpg';

const HomePage = () => {
  const [currentDefinition, setCurrentDefinition] = useState(1);

  const handleClick = (definitionNumber) => {
    setCurrentDefinition(definitionNumber);
  };

  return (
    <div className="home-page">
    <div className="description">
    <h1 class="Title">Le stade de sautage</h1>
      <p>le stade sautage est le deuxième étapes de la chaine cinématique d'éxploitation de phosphate qui se base sur l'utilisation<br/> 
        des éxploisifs industrie pour la fragmentation du stéril afin d'être facile à enlever <br/>
        au stade suivant (décapage).
      
      </p>
    </div>
      <img src={homeImage} alt="home" className="banner-image" /> 
      <div className="nav-buttons">
        <button onClick={() => handleClick(1)} className={currentDefinition === 1 ? 'active' : ''}>1</button>
        <button onClick={() => handleClick(2)} className={currentDefinition === 2 ? 'active' : ''}>2</button>
        <button onClick={() => handleClick(3)} className={currentDefinition === 3 ? 'active' : ''}>3</button>
        <button onClick={() => handleClick(4)} className={currentDefinition === 4 ? 'active' : ''}>4</button>
      </div>
      <div className="definition-container">
        <div className="definition">
        <div className={currentDefinition === 1 ? '' : 'hidden'}>
            <div className="definition-content">
              <p className="definition-text">
                <h1 className="definition-title"> Ammonix :</h1>
             <b>Nom chimique :  </b>Nitrate d'ammonium<br/>
             <b>Formule chimique :</b> NH₄NO₃ <br/>
             <b>L'Ammonix </b>  est un sel blanc et inodore, soluble dans l'eau.  <br/>
              Il est largement utilisé comme engrais azoté dans l'agriculture pour fournir de l'azote aux plantes sous forme d'ions nitrate et ammonium.  <br/>
              Il est également utilisé dans l'industrie chimique comme matière première pour la synthèse de divers produits chimiques, et dans la production d'explosifs. <br/>
	           <b>Explosifs : </b>En raison de sa capacité à libérer rapidement de grandes quantités de gaz lorsqu'il est décomposé par une explosion, l'Ammonix est également utilisé comme composant principal dans la fabrication d'explosifs civils et militaires, tels que le dynamite et le mélanges à base de nitrate d'ammonium. <br/>
             <b>Sécurité : </b> En raison de son potentiel explosif, le stockage, <br/>
             la manipulation et l'utilisation de l'Ammonix nécessitent des précautions spéciales pour éviter les accidents. <br/>
             Des réglementations strictes sont en place dans de nombreux pays pour contrôler son utilisation et sa distribution afin de garantir la sécurité publique et environnementale.

              </p>
              <div className="image-container">
                <div className="small-images">
                  <img src={ammonix1Image1} alt="ammonix1" className="small-image" />
                  <img src={ammonix2Image2} alt="ammonix2" className="small-image" />
                  <img src={ammonix3Image3} alt="ammonix3" className="small-image" />
                </div>
              </div>
            </div>
          </div>
          <div className={currentDefinition === 2 ? '' : 'hidden'}>
            <div className="definition-content">
              <p className="definition-text">
                <h1 className="definition-title"> Tovex :</h1>
                <b>Tovex </b> est un explosif commercial utilisé principalement dans le domaine minier et de la démolition. <br/> 
            Le nom TOVEX est dérivé de "TOrpille à haut Vitesse d'EXplosion". <br/> 
            Il s'agit d'un explosif en émulsion, ce qui signifie qu'il est composé d'une émulsion d'eau dans de l'huile contenant un sensibilisateur et un agent de gonflement. <br/> 
            Cette composition lui donne une grande stabilité et une puissance explosive élevée. <br/> 
            <b>Les principales caractéristiques de TOVEX incluent : </b>
                sa facilité d'utilisation. <br/> 
                sa sécurité lors du stockage et de la manipulation. <br/> 
                sa flexibilité d'application dans différents environnements et conditions de terrain. <br/> 
              </p>
              <div className="image-container">
                <div className="small-images">
                  <img src={tov1Image1} alt="Tovex1" className="small-image" />
                  <img src={tov2Image2} alt="Tovex2" className="small-image" />
                  <img src={tov3Image3}alt="Tovex3" className="small-image" />
                </div>
              </div>
            </div>
          </div>
          <div className={currentDefinition === 3 ? '' : 'hidden'}>
            <div className="definition-content">
              <p className="definition-text">
                <h1 className="definition-title"> Détonateur :</h1 > 
                <b> Détonateur </b> est un dispositif utilisé dans les explosifs pour initier ou déclencher une réaction explosive contrôlée. <br/>
                Il existe plusieurs types de détonateurs, chacun ayant ses propres caractéristiques et applications.<br/>
                <b> Détonateur non-électrique (DNE) :</b>
                 Les détonateurs non-électriques utilisent des mécanismes non-électriques pour amorcer l'explosion.
              </p>
              <div className="image-container">
                <div className="small-images">
                  <img src={detos1Image1} alt="Détonateur1" className="small-image" />
                  <img src={detos2Image2} alt="Détonateur2" className="small-image" />
                  <img src={detos3Image3} alt="Détonateur3" className="small-image" />
                </div>
              </div>
            </div>
          </div>
          <div className={currentDefinition === 4 ? '' : 'hidden'}>
            <div className="definition-content">
              <p className="definition-text">
                <h1 className="definition-title"> Raccords :</h1 > 
                <b>Raccords</b> explosifs nonel sont des dispositifs utilisés dans le domaine de la démolition et de la construction pour relier les détonateurs aux charges explosives telles que le TNT, <br/>
            le dynamite ou d'autres explosifs. <br/> 
            <b> Types :</b> Il existe différents types de raccords explosifs nonel, notamment les simples, <br/>
            les doubles et les triples, qui permettent de connecter un ou plusieurs détonateurs à une ou plusieurs charges explosives. <br/>
            Les raccords peuvent également varier en longueur pour s'adapter aux besoins spécifiques de l'opération de démolition ou de fragmentation. <br/>
            <b> Sécurité :</b> Les raccords explosifs nonel sont conçus avec des normes de sécurité strictes pour éviter tout déclenchement accidentel <br/>
             et garantir la sécurité des opérateurs et du site. Ils sont souvent codés par couleur pour faciliter l'identification <br/>
             et le suivi lors de l'installation et de l'utilisation. <br/>
            <b> Utilisation :</b> Les raccords explosifs nonel sont largement utilisés dans diverses industries telles que la construction, <br/>
            les mines, les carrières et la démolition pour effectuer des opérations de détonation contrôlée. <br/>
            Leur flexibilité et leur fiabilité en font un choix populaire pour les professionnels de la démolition et de l'explosif.


              </p>
              <div className="image-container">
                <div className="small-images">
                  <img src={racc1Image1} alt="Raccord1" className="small-image" />
                  <img src={racc2Image2} alt="Raccord2" className="small-image" />
                  <img src={racc3Image3} alt="Raccord3" className="small-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
