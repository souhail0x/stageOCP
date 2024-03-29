import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'; // Import the entire module // Import de la bibliothèque XLSX pour gérer les fichiers Excel
import '../styles/ArchivePage.css'; // Import du fichier CSS pour les styles de la page

function ArchivePage() {
    const [archiveData, setArchiveData] = useState([]); // État pour stocker les données de l'archive

    useEffect(() => {
        // Exemple de données d'archive pour tester l'exportation Excel
        const exampleData = [
            { date_pdf: "2024-03-15", panneau_tranche: "Panneau 1", niveau: "Niveau A", mode_de_tir: "Mode 1", foration: "Foration 1", nbr_trou: 10, nbr_range: 5, nb_tr_range: 3, maille: "Maille 1", decappage: "Oui", profondeur: 100, zone_de_tir: "Zone 1" },
            { date_pdf: "2024-03-16", panneau_tranche: "Panneau 2", niveau: "Niveau B", mode_de_tir: "Mode 2", foration: "Foration 2", nbr_trou: 15, nbr_range: 7, nb_tr_range: 4, maille: "Maille 2", decappage: "Non", profondeur: 120, zone_de_tir: "Zone 2" },
            { date_pdf: "2024-03-17", panneau_tranche: "Panneau 3", niveau: "Niveau C", mode_de_tir: "Mode 3", foration: "Foration 3", nbr_trou: 20, nbr_range: 10, nb_tr_range: 5, maille: "Maille 3", decappage: "Oui", profondeur: 150, zone_de_tir: "Zone 3" }
        ];

        // Mettre les données d'exemple dans l'état
        setArchiveData(exampleData);
    }, []); // Utilisation de useEffect avec un tableau de dépendances vide pour s'exécuter une seule fois lors du chargement initial de la page

    // Fonction pour exporter les données vers un fichier Excel
    const handleExportExcel = () => {
        // Générer le nom de fichier basé sur la date d'accueil
        const currentDate = new Date();
        const filename = `archive_${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}.xlsx`;

        // Créer une feuille Excel à partir des données de l'archive
        const ws = XLSX.utils.json_to_sheet(archiveData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Archive');

        // Télécharger le fichier Excel
        XLSX.writeFile(wb, filename);
    };

    // Rendu de la composante ArchivePage
    return (
        <div className="archiveContainer">
            <div className="archive-header" >
                <h2 className="archive-title" style={{
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.95)",
                    display: "block",
                    fontSize: "1.17em",
                    marginBlockStart: "1em",
                    marginBlockEnd: "1em",
                    marginInlineStart: "0px",
                    marginInlineEnd: "0px",
                    fontWeight: "bold",
                }}>Archive</h2> 
                <button className="export-btn" onClick={handleExportExcel}>Export to Excel</button> {/* Bouton pour exporter vers Excel */}

            </div>
            <table className="archiveTable"> {/* Tableau des données de l'archive */}
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
                        <th>Maille</th>
                        <th>Decappage</th>
                        <th>Profondeur</th>
                        <th>Zone de Tir</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping des données de l'archive dans le tableau */}
                    {archiveData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date_pdf}</td>
                            <td>{item.panneau_tranche}</td>
                            <td>{item.niveau}</td>
                            <td>{item.mode_de_tir}</td>
                            <td>{item.foration}</td>
                            <td>{item.nbr_trou}</td>
                            <td>{item.nbr_range}</td>
                            <td>{item.nb_tr_range}</td>
                            <td>{item.maille}</td>
                            <td>{item.decappage}</td>
                            <td>{item.profondeur}</td>
                            <td>{item.zone_de_tir}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ArchivePage;