import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  
  
`;

const GridContainer = styled.div`
  width: 50%; /* Adjust the percentage to make the table smaller */
  margin: auto;
  border: black solid 2px;
  padding: 10px 20px;
  transform: scale(0.8);
  box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.75);
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 200px; /* Adjust the percentage to make the table smaller */
  margin: auto;
  transform: scale(0.8);

  td,
  th {
    padding: 10px;
    text-align: center;
    position: relative;
  }

  /* Horizontal arrow styling for the first two rows */
  tr:nth-child(-n+2) td:after {
    content: "\2192"; /* Unicode arrow character -> */
    position: absolute;
    bottom: 0; /* Adjusted to position arrow at the bottom */
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px; /* Adjust size as needed */
    color: black; /* Change color as needed */
  }

  /* Vertical arrow styling */
  td:before {
    content: "\2193"; /* Unicode arrow character ↓ */
    position: absolute;
    top: calc(100% - 20px);
    left: 50%;
    transform: translateX(-50%) scale(1.1);
    font-size: 18px; /* Adjust size as needed */
    color: #ecbe32; /* Change color as needed */
  }

  /* Styling for first column */
  td:first-child:before,
  th:first-child:before {
    display: none; /* Hide arrow in first column */
  }

  /* Styling for first row */
  tr:first-child th {
    border-bottom: none; /* Remove the bottom border */
    color: rgb(0, 76, 255);
  }
`;


const Input = styled.input`
  margin-bottom: 20px;
`;

const Button = styled.a`
  margin: 10px;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width:25%;
  margin:auto;
  padding:20px 0px;
  border:black solid 1px;
`;

const LegendItem = styled.div`
  margin: 0 10px;
`;

const Image = styled.img`
  margin: 10px;
`;

const NumberGrid = React.forwardRef((props, ref) => {
  const [trou, setTrou] = useState(props.trous);
  const [lignes, setLignes] = useState(props.ranges);
  const [grid, setGrid] = useState('');
  const [tableData, settableData] = useState([]);


  const generateGrid = () => {
    const x = parseInt(trou);
    const y = parseInt(lignes);
    let n = 1;
    let s = 0;
    let l = 0;
    let resultat = '<tr>';
    let leftarrow = '→';
    let downarrow = '↓';

    for (let i = 0; i <= x; i++) {
      if (i === 0) {
        resultat += `<th>  </th>`;

      } else {
        resultat += `<th>${i}</th>`;

      }

    }
    resultat += '<tr>';

    while (n <= x * y) {
      if (n < x) {
        downarrow = '';
      }
      if (n === x) {
        leftarrow = '';

      }
      if (s === 0) {
        resultat += `<td style="position: relative; padding: 10px; text-align: center;"> L ` + (l + 1) + `</td>`;

      }
      resultat += `<td style="position: relative; padding: 10px; text-align: center;">` +
        `<span class="leftarrow" style="color: green; position: absolute; bottom: 0; top:20%; right:-40%; transform: translateX(-50%); font-size: 18px;">${leftarrow}</span>` +
        `<span class="downarrow" style="color: red; position: absolute; top: calc(100% - 20px); top:10%; right:-10%; transform: translateX(-50%) scale(1.1); font-size: 18px;">${downarrow}</span>` +
        s + `</td>`;

      if (n % x === 0 && n !== x * y) {
        resultat += '</tr><tr>';
      }


      s = s + 42;

      if (n % x === 0) {

        l += 1;
        resultat += `<td style="position: relative; padding: 10px; text-align: center;">L` + (l + 1) + `</td>`;

        s = 17 * l;
        leftarrow = '';
        downarrow = '↓';
      }


      n += 1;
    }

    resultat += '</tr>';
    setGrid(resultat);
  };
  function generateArrayOfArraysFromTable(tableId) {
    const table = document.getElementById(tableId);
    const arrayOfArrays = [];

    if (table) {
      console.log('Table found:', table);

      // Iterate over the rows of the table
      for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const rowData = [];

        console.log('Row:', row);

        // Check if the row has cells
        if (row.cells.length > 0) {
          // Iterate over the cells of the row
          for (let j = 0; j < row.cells.length; j++) {
            const cell = row.cells[j];
            // Log the cell content
            console.log('Cell content:', cell.textContent.trim());
            // Push the text content of each cell to the row data array
            rowData.push(cell.textContent.trim());
          }

          // Push the row data array to the main array of arrays
          arrayOfArrays.push(rowData);
        } else {
          console.log('Row without cells:', row);
        }
      }
      console.log('Array of Arrays:', arrayOfArrays);

      // Update the state with the array of arrays
      settableData(arrayOfArrays);
    } else {
      console.error(`Table with id '${tableId}' not found.`);
    }
  }






  // Example usage


  useEffect(() => {
    generateGrid();
    let data = generateArrayOfArraysFromTable('tableShema');
    console.log(data);

  }, []);






  return (
    <Container ref={ref}>
      <h3 style={{ textAlign: 'center', color: 'black', fontSize: '35px', fontWeight: '500' }}>Schema De Tir</h3> {/* Title */}
      <div style={{ display: 'flex', width: '100%', color: 'black', margin: '20px auto', justifyContent: 'space-between' }}>
        <p>Nombre des trous par ligne : {props.trous}</p>
        <p>Nombre des rangées : {props.ranges}</p>
        <p>Shema de Type : {'17ms-42ms'}</p>
      </div><br />
      <h3 style={{ textAlign: 'center', color: 'black', fontSize: '20px', fontWeight: '800' }}>La legende :</h3> {/* Title */}

      <LegendContainer>
        <LegendItem><span className="black-arrow">→</span> 17ms</LegendItem>
        <LegendItem><span className="green-arrow">→</span> 42ms</LegendItem>
      </LegendContainer>
      <Image src="image-removebg-preview.png" alt="" />
      <Image src="image-removebg-preview1.png" alt="" />
      <Table id='tableShema' dangerouslySetInnerHTML={{ __html: grid }}></Table>

    </Container>
  );
});

export default NumberGrid;
