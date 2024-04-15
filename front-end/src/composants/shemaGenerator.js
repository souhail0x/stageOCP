import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import NumberGrid from './shemaDeTir';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ShemaThreeValues from './shemadetir2';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  z-index: 9998; /* Ensure the overlay is below the popup */
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  z-index: 9999; /* Ensure the popup appears on top of the overlay */
  max-width: 1400px; /* Set maximum width to 90% */
  max-height: 600px; /* Set maximum width to 90% */
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for WebKit */
  &::-webkit-scrollbar {
    display: none;
  }
`;



const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;


const Popup = ({ onClose, children, trous, ranges }) => {
  const numberGridRef = useRef(null);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const generatePDF = () => {
    if (numberGridRef.current) {
      html2canvas(numberGridRef.current).then(canvas => {

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        const logoHeight = 20;
        const logoY = 10;
        const logoLeft = require('../images/ocpDePdf.jpg');
        const logoRight = require('../images/cadex.jpg');
        pdf.addImage(logoLeft, "JPG", 25, logoY, 15, logoHeight); // Ajouter le logo gauche
        pdf.addImage(logoRight, "JPG", pdf.internal.pageSize.width - 50, logoY, 30, logoHeight); // Ajouter le logo droit

        const imgHeight = canvas.height * 208 / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, 208, imgHeight);
        pdf.save('schema_de_tir.pdf');
        setPdfGenerated(true);
      });
    }
  };

  return (
    <>
      <Overlay />
      <PopupContainer>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        {/* <NumberGrid ref={numberGridRef} trous={trous} ranges={ranges} /> */}
        <ShemaThreeValues/>
       
        
      </PopupContainer>
    </>
  );
};


export default Popup;
