import React, { useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styled from "styled-components";

const StyledApp = styled.div`
  font-family: Arial, sans-serif;
  padding:0;
  margin:0;
  
  .button-container{
    margin:40px auto 10px;

  }
  #matrix{
    padding-bottom:10px;
    padding-top:10px;
    padding-left:10px;
    padding-right:10px;
    
  }

  form {
    margin:0;
    margin-bottom: 20px;
  }

  label {
    margin-right: 10px;
  }

  input[type="number"] {
    width: 50px;
    margin-right: 10px;
  }

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }

  table {
    border: none;
    margin: 20px auto;
    border-collapse: collapse;
    width: 100%;
    padding-bottom: 50px ;
  }

  th,
  td {
    padding: 8px;
    text-align: center;
    position: relative;
  }

  th {
    color: #007bff;
    text-decoration: underline;
  }

  /* Adjustments for arrows */
  .yellow,
  .green {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: scale(2) translateX(-30%);
    font-weight: bold;
  }
  h3{
    margin:0px auto 20px;
    padding:10px 20px;
    background-color: #93E9BE;
    font-weight:500;
    width:700px;
    text-align:center;
    color:black;
    border: 1.5px black solid;

  }

  .red-down-left {
    position: absolute;
    top: 0;
    left: 50%;
    transform: scale(2) translateX(-180%);
    font-weight: bold;
    color: red;
  }
  td{
    color:black;
  }

  .red-down-right {
    position: absolute;
    top: 0;
    left: 50%;
    transform: scale(2) translateX(90%);
    font-weight: bold;
    color: red;
  }

  .yellow {
    color: yellow;
  }

  .green {
    color: green;
  }
`;
const LegendContainer = styled.div`
  margin:20px 10px 10px;
  border: 1.5px black solid;
  right: 10px;
  color:black;
  width:200px;
  padding:10px 30px;
`;



function ShemaThreeValues() {
    const [rows, setRows] = useState("");
    const [columns, setColumns] = useState("");
    const [matrix, setMatrix] = useState([]);
    const [imageData, setImageData] = useState("");
    const [imageDataLegend, setImageDataLegend] = useState("");

    const midCol = Math.floor(columns / 2) - 2;

    function generateSchema(rows, columns) {
        const table = [];
        const midCol = Math.floor(columns / 2) - 2;
        const increment = 17;
        const increment2 = 25;
        const increment3 = 42;

        for (let i = 0; i < rows; i++) {
            table.push(new Array(columns).fill(0));
        }

        for (let i = midCol - 1; i >= 0; i--) {
            table[0][i] = table[0][i + 1] + increment;
        }
        table[0][midCol + 1] = table[0][midCol] + increment2;
        for (let i = midCol + 2; i < columns; i++) {
            table[0][i] = table[0][i - 1] + increment;
        }

        for (let row = 1; row < rows; row++) {
            if (row % 2 === 0) {
                table[row][midCol] = table[row - 1][midCol] + increment3;
                table[row][midCol + 1] = table[row][midCol] + increment2;
                for (let i = midCol + 2; i < columns; i++) {
                    table[row][i] = table[row][i - 1] + increment;
                }
                for (let i = midCol - 1; i >= 0; i--) {
                    table[row][i] = table[row][i + 1] + increment;
                }
            } else {
                table[row][midCol + 1] = table[row - 1][midCol + 1] + increment3;
                table[row][midCol] = table[row][midCol + 1] + increment2;
                for (let i = midCol + 2; i < columns; i++) {
                    table[row][i] = table[row][i - 1] + increment;
                }
                for (let i = midCol - 1; i >= 0; i--) {
                    table[row][i] = table[row][i + 1] + increment;
                }
            }
        }

        return table;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const rowsValue = parseInt(rows);
        const columnsValue = parseInt(columns);
        const schema = generateSchema(rowsValue, columnsValue);
        console.log("Matrix Schema:", schema); // Log the generated schema
        setMatrix(schema);
    }


    function convertToImage() {
        const table = document.getElementById("matrix");
        const legende = document.getElementById("legend");

        html2canvas(table, { scale: 0.7 }).then(function (canvas) {
            const dataURL = canvas.toDataURL("image/png");
            setImageData(dataURL);
        });

    }

    function generatePDF() {
        if (imageData) {
            const doc = new jsPDF("l", "mm", "a4");
            doc.setFont("Calibri");

            // Add logos
            const logoHeight = 20;
            const logoY = 10;
            const logoLeft = require("../images/ocpDePdf.jpg");
            const logoRight = require("../images/cadex.jpg");

            doc.addImage(logoLeft, "JPG", 25, logoY, 15, logoHeight); // Add left logo
            doc.addImage(
                logoRight,
                "JPG",
                doc.internal.pageSize.width - 50,
                logoY,
                30,
                logoHeight
            ); // Add right logo

            // Add text below left logo with margin
            const textLeftMargin = 5;
            const textUnderLogoY = logoY + logoHeight + 5;
            doc.setFontSize(10);
            doc.text(
                "Drection Exécutive Opérations industrielles ",
                textLeftMargin,
                textUnderLogoY
            );
            doc.text("Site Industrielles de Gntour", 15, 41);
            doc.setFontSize(15);

            // Add date below central logo
            const currentDateX = doc.internal.pageSize.width / 2;
            const currentDateY = logoY + logoHeight + 30;
            const formattedDate = new Date().toLocaleDateString();
            doc.text("Ben guérir , le " + formattedDate, currentDateX, currentDateY, {
                align: "center",
            });

            // Add image
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;

            // Get the dimensions of the image
            const imageWidth = 110 + (rows * 2); // Width of the image
            const imageHeight = 70 + (columns * 2.5); // Height of the image

            // Calculate the coordinates to center the image horizontally and vertically
            const centerX = (pageWidth - imageWidth) / 2;
            const centerY = ((pageHeight - imageHeight) / 2);
            // Draw a border around the image
            const borderWidth = 0.8; // Width of the border
            doc.setDrawColor(0); // Set the color for the border (black)
            doc.setLineWidth(borderWidth); // Set the width for the border
            doc.rect(centerX, centerY, imageWidth, imageHeight); // Draw the rectangle border

            doc.addImage(imageData, "PNG", centerX, centerY, imageWidth, imageHeight);
            doc.text('VISA INGENIEUR RESPONSABLE', doc.internal.pageSize.width - 85, doc.internal.pageSize.height - 32 ,{ fontSize: 10 })



            // Add text below image
            // const textUnderImageMargin = 30;
            // const textUnderImageY = 220;
            // doc.text("SUPERVISEUR OCP", 40, textUnderImageY);
            // doc.text("Chef de Projet Demandeur", 120, textUnderImageY);

            doc.save("matrix.pdf");
        } else {
            alert("Veuillez d'abord générer l'image pour créer le PDF.");
        }
    }

    return (
        <StyledApp>

            <form>
                <label htmlFor="rows">Nombre de lignes:</label>
                <input
                    type="number"
                    id="rows"
                    name="rows"
                    value={rows}
                    onChange={(e) => setRows(e.target.value)}
                    required
                />
                <label htmlFor="columns">Nombre de colonnes:</label>
                <input
                    type="number"
                    id="columns"
                    name="columns"
                    value={columns}
                    onChange={(e) => setColumns(e.target.value)}
                    required
                />
                <button onClick={handleSubmit} type="button">Générer</button>
            </form>

            <div id="matrix">
                <h3>{`Shema De Tir NONEL : BenGuerir(Foration Cadex) - 21/04/2003`}</h3>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {Array.from({ length: columns }, (_, i) => (
                                <th key={i}>{i + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {matrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <th>{`L${rowIndex + 1}`}</th>
                                {row.map((cell, cellIndex) => {
                                    let arrowSymbol = "";
                                    if (rowIndex === 0) {
                                        arrowSymbol =
                                            cellIndex === midCol + 1 ? (
                                                <span className="yellow">→</span>
                                            ) : cellIndex <= midCol ? (
                                                <span className="green">←</span>
                                            ) : (
                                                <span className="green">→</span>
                                            );
                                    } else if (rowIndex % 2 === 0) {
                                        arrowSymbol =
                                            cellIndex === midCol + 1 ? (
                                                <>
                                                    <span className="red-down-left">↓</span>
                                                    <span className="yellow">→</span>
                                                </>
                                            ) : cellIndex <= midCol ? (
                                                <span className="green">←</span>
                                            ) : (
                                                <span className="green">→</span>
                                            );
                                    } else {
                                        arrowSymbol =
                                            cellIndex === midCol + 1 ? (
                                                <>
                                                    <span className="red-down-right">↓</span>
                                                    <span className="yellow">←</span>
                                                </>
                                            ) : cellIndex <= midCol ? (
                                                <span className="green">←</span>
                                            ) : (
                                                <span className="green">→</span>
                                            );
                                    }

                                    return (
                                        <td key={cellIndex}>
                                            {cell}
                                            {arrowSymbol}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <LegendContainer id="legend">
                    64ms : <span style={{ color: "red" }}>→</span> <br />
                    25ms : <span style={{ color: "green" }}>→</span> <br />
                    17ms : <span style={{ color: "yellow" }}>→</span> <br />
                </LegendContainer>
            </div>

            <div className="button-container">
                <a className="button" onClick={convertToImage}>Convertir en image</a>
                <a className="button" onClick={generatePDF}>Générer PDF</a>
            </div>

        </StyledApp>
    );
}

export default ShemaThreeValues;
