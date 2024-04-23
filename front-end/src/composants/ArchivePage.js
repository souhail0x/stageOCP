import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../styles/ArchivePage.css";
import Loader from "./spinnerLoader";

function ArchivePage() {
  const [archiveData, setArchiveData] = useState([]);
  const [archiveData2, setArchiveData2] = useState([]);
  const [archiveData3, setArchiveData3] = useState([]);

  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const responses = await Promise.all([
            fetch("http://127.0.0.1:8000/api/commandes"),
            fetch("http://127.0.0.1:8000/api/sautages"),
            fetch("http://127.0.0.1:8000/api/gestion-stocks")
          ]);
      
          const jsonResponses = await Promise.all(responses.map(response => response.json()));
          const [data1, data2, data3] = jsonResponses;
      
          setArchiveData(data1);
          setArchiveData2(data2);
          setArchiveData3(data3);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };


    fetchData();

    const combinedArchiveData = [...archiveData, ...archiveData2, ...archiveData3];
    setArchiveData(combinedArchiveData);
    
  }, []);

  const handleExportExcel = () => {
    const currentDate = new Date();
    const filename = `archive_${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}.xlsx`;

    const ws = XLSX.utils.json_to_sheet(archiveData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Archive");

    XLSX.writeFile(wb, filename);
  };

  return (
    <>
      {isLoaded ? (
        <Loader />
      ) : (
        <div className="archiveContainer">
          <div className="archive-header">
            <h2 className="archive-title">Archive</h2>
            <input type="text" placeholder="Rechercher..." className="search-input" style={{width: "500px"}} />
            <button className="export-btn" onClick={handleExportExcel}>
              Export to Excel
            </button>
          </div>
          <div className="archiveDiv">
            <table className="archiveTable">
              <thead className="archiveThead">
                <tr>
                  <th>Date Excel</th>
                  <th>Panneau</th>
                  <th>Tranche</th>
                  <th>Niveau</th>
                  <th>Mode de tir</th>
                  <th>Maille E.</th>
                  <th>Maille B.</th>
                  <th>Métrage foré</th>
                  <th>Nbr Trou</th>
                  <th>Nbr Rangés</th>
                  <th>Longueur</th>
                  <th>Surface</th>
                  <th>Volume</th>
                  <th>Dosage Prévu</th>
                  <th>Dosage Réalisé</th>
                  <th>Zone de tir</th>
                  <th>Machine foration</th>
                  <th>Machine decappage</th>
                  <th>Schéma de tir</th>

                  <th>BLF Ammonix</th>
                  <th>BLF Tovex</th>
                  <th>BLF Artifices et Lignes</th>
                  <th>Heure arrivée</th>
                  <th>Heure tir</th>

                  <th>Ammonix</th>
                  <th>AEI</th>
                  <th>Raccord 17ms</th>
                  <th>Raccord 25ms</th>
                  <th>Raccord 42ms</th>
                  <th>Raccord 65ms</th>
                  <th>Raccord 100ms</th>
                  <th>Detonateur 450ms</th>
                  <th>Detonateur 500ms</th>
                  <th>Tovex</th>
                  <th>Ligne de tir</th>
                </tr>
              </thead>
              <tbody>
                {archiveData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.panneau}</td>
                    <td>{item.tranche}</td>
                    <td>{item.niveau}</td>
                    <td>{item.mode_tir}</td>
                    <td>{item.maille_E}</td>
                    <td>{item.maille_B}</td>
                    <td>{item.métrage_foré}</td>
                    <td>{item.nombre_trous}</td>
                    <td>{item.nombre_rangés}</td>
                    <td>{item.longueur}</td>
                    <td>{item.surface}</td>
                    <td>{item.volume}</td>
                    <td>{item.dosage_prévu}</td>
                    <td>{item.dosage_réalisé}</td>
                    <td>{item.zone_tir}</td>
                    <td>{item.machine_Foration}</td>
                    <td>{item.machine_Decappage}</td>
                    <td>{item.schema_tir}</td>
                    
                    <td>{item.BLF_Ammonix}</td>
                    <td>{item.BLF_Tovex}</td>
                    <td>{item.BLF_Artifices_Lignes}</td>
                    <td>{item.heure_arrivée_camions}</td>
                    <td>{item.heure_tir}</td>
                    
                    <td>{item.ammonix}</td>
                    <td>{item.aei}</td>
                    <td>{item.raccord_17}</td>
                    <td>{item.raccord_25}</td>
                    <td>{item.raccord_42}</td>
                    <td>{item.raccord_65}</td>
                    <td>{item.raccord_100}</td>
                    <td>{item.detonateur_450}</td>
                    <td>{item.detonateur_500}</td>
                    <td>{item.tovex}</td>
                    <td>{item.ligne_tir}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default ArchivePage;
