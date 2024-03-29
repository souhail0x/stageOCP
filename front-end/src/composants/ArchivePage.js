import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import '../styles/ArchivePage.css';

function ArchivePage() {
    const [archiveData, setArchiveData] = useState([]);

    useEffect(() => {
        // Fonction asynchrone pour récupérer les données de l'API
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/commandes');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setArchiveData(data); // Mettre à jour l'état avec les données de l'API
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Appel de la fonction pour récupérer les données au chargement initial
    }, []);

    const handleExportExcel = () => {
        const currentDate = new Date();
        const filename = `archive_${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}.xlsx`;

        const ws = XLSX.utils.json_to_sheet(archiveData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Archive');

        XLSX.writeFile(wb, filename);
    };

    return (
        <div className="archiveContainer">
            <div className="archive-header">
                <h2 className="archive-title">Archive</h2>
                <button className="export-btn" onClick={handleExportExcel}>Export to Excel</button>
            </div>
            <table className="archiveTable">
                <thead className='archiveThead'>
                    <tr>
                        <th>Date Excel</th>
                        <th>Panneau Tranche</th>
                        <th>Niveau</th>
                        <th>Mode de Tir</th>
                        <th>Foration</th>
                        <th>Nbr Trou</th>
                        <th>Nbr Range</th>
                        <th>Nb Tr Range</th>
                        <th>Decappage</th>
                        <th>Profondeur</th>
                        <th>Zone de Tir</th>
                    </tr>
                </thead>
                <tbody>
                    {archiveData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.panneau}</td>
                            <td>{item.niveau}</td>
                            <td>{item.mode_tir}</td>
                            <td>{item.foration}</td>
                            <td>{item.nombre_trous}</td>
                            <td>{item.nombre_ranges}</td>
                            <td>{item.trous_range}</td>
                            <td>{item.decappage}</td>
                            <td>{item.profondeur}</td>
                            <td>{item.zone_tir}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ArchivePage;
