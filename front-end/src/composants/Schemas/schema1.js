import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../styles/schema1.css";

function Schema1({ trous, ranges }) {
  const [rows, setRows] = useState(parseInt(ranges));
  const [columns, setColumns] = useState(parseInt(trous));
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

  function convertAndGenerate() {
    convertToImage();
    generatePDF();
  }

  useEffect(() => {
    const schema = generateSchema(rows, columns);
    setMatrix(schema);
    console.log(matrix);
  }, []);

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
      const logoLeft = require("../../images/ocpDePdf.jpg");
      const logoRight = require("../../images/cadex.jpg");

      const scaleFactor = 1.3; // 30% increase

      doc.addImage(
        logoLeft,
        "JPG",
        25,
        logoY,
        15 * scaleFactor,
        logoHeight * scaleFactor
      ); // Add left logo
      doc.addImage(
        logoRight,
        "JPG",
        doc.internal.pageSize.width - 50,
        logoY,
        30 * scaleFactor,
        logoHeight * scaleFactor
      ); // Add right logo

      // Add image
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Get the dimensions of the image
      const imageWidth = 150 + rows * 2; // Width of the image
      const imageHeight = 85 + columns * 2.5; // Height of the image

      // Calculate the coordinates to center the image horizontally and vertically
      const centerX = (pageWidth - imageWidth) / 2;
      const centerY = (pageHeight - imageHeight) / 2;
      // Draw a border around the image
      const borderWidth = 0.8; // Width of the border
      doc.setDrawColor(0); // Set the color for the border (black)
      doc.setLineWidth(borderWidth); // Set the width for the border
      doc.rect(centerX, centerY, imageWidth, imageHeight); // Draw the rectangle border

      doc.addImage(imageData, "PNG", centerX, centerY, imageWidth, imageHeight);
      doc.text(
        "VISA INGENIEUR RESPONSABLE",
        doc.internal.pageSize.width - 85,
        doc.internal.pageSize.height - 32,
        { fontSize: 7, align: "center", underline: true }
      );

      doc.save(`SchemaDeTir_${getCurrentDate()}.pdf`);
    }
  }

  const getCurrentDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    return currentDate.toLocaleDateString();
  };

  const getCurrentDatePlusOne = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.toLocaleDateString();
  };

  return (
    <>
      <div id="matrix">
        <h3>{`Schéma de Tir NONEL : Benguerir(Foration Cadex) - ${getCurrentDatePlusOne()}`}</h3>

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
        <div id="legend">
          42ms : <span style={{ color: "red" }}>→</span> <br />
          25ms : <span style={{ color: "green" }}>→</span> <br />
          17ms : <span style={{ color: "rgb(252, 215, 2)" }}>→</span> <br />
        </div>
      </div>

      <div className="button-container">
        <a className="button" onClick={convertAndGenerate}>
          Générer PDF
        </a>
      </div>
    </>
  );
}

export default Schema1;
