import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../styles/ArchivePage.css";
import Loader from "./spinnerLoader";
import axios from "axios";

function ArchivePage() {
  const [archiveData, setArchiveData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
        const response = await axios.get("http://127.0.0.1:8000/api/archive");
        if (response.status === 200) {
          setArchiveData(response.data);
          setIsLoaded(false); // Set isLoaded to false when data is loaded
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoaded(false); // Set isLoaded to false in case of error
      }
    };

    fetchData();
  }, []);

  const handleExportExcel = () => {
    const currentDate = new Date();
    const filename = `archive_${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}.xlsx`;

    // Use filteredData instead of archiveData if search is performed
    const dataToExport = searchQuery ? filteredData : archiveData;

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Archive");

    XLSX.writeFile(wb, filename);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  
    if (Array.isArray(archiveData)) {
      const filtered = archiveData.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  };
  
  
  useEffect(() => {
    console.log('filteredData', filteredData);
  }, [filteredData]);

  return (
    <>
      {isLoaded ? (
        <Loader />
      ) : (
        <div className="archiveContainer">
          <div className="archive-header">
            <h2
              style={{
                textAlign: "left",
                color: "white",
                textTransform: "uppercase",
              }}
              className="archive-title"
            >
              Archive des sautages
            </h2>
            <input
              type="text"
              placeholder="Rechercher par mot-clé ..."
              className="search-input"
              style={{ width: "1200px", height: "40px", marginTop: "20px" }}
              value={searchQuery}
              onChange={handleSearch}
            />
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
                  <th>Nbr Trou</th>
                  <th>Nbr Rangés</th>
                  <th>Longueur</th>
                  <th>Dosage Prévu</th>
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
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.panneau}</td>
                    <td>{item.tranche}</td>
                    <td>{item.niveau}</td>
                    <td>{item.mode_tir}</td>
                    <td>{item.espacement}</td>
                    <td>{item.maille_banquette}</td>
                    <td>{item.nombre_trous}</td>
                    <td>{item.nombre_ranges}</td>
                    <td>{item.longueur}</td>
                    <td>{item.dosage_prevu}</td>
                    <td>{item.zone_tir}</td>
                    <td>{item.foration}</td>
                    <td>{item.decappage}</td>
                    <td>{item.schema_tir}</td>

                    <td>{item.blf_ammonix}</td>
                    <td>{item.blf_tovex}</td>
                    <td>{item.blf_artifices}</td>
                    <td>{item.h_arrivee_camions}</td>
                    <td>{item.heure_tir}</td>

                    <td>{item.ammonix}</td>
                    <td>{item.aei}</td>
                    <td>{item.raccord_17}</td>
                    <td>{item.raccord_25}</td>
                    <td>{item.raccord_42}</td>
                    <td>{item.raccord_65}</td>
                    <td>{item.raccord_100}</td>
                    <td>{item.detos_450ms}</td>
                    <td>{item.detos_500ms}</td>
                    <td>{item.tovex}</td>
                    <td>{item.lign}</td>
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
