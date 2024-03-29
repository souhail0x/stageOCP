import jsPDF from 'jspdf';

const generatePDF = (formData, submittedData) => {
  if (submittedData) {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFont("Calibri");

    // Ajouter les logos
    const logoHeight = 20;
    const logoY = 10;
    const logoLeft = require('../images/ocpDePdf.jpg'); 
    const logoRight = require('../images/cadex.jpg'); 

    doc.addImage(logoLeft, "JPG", 25, logoY, 15, logoHeight); // Ajouter le logo gauche
    doc.addImage(logoRight, "JPG", doc.internal.pageSize.width - 50, logoY, 30, logoHeight); // Ajouter le logo droit

    // Ajouter du texte sous le logo gauche avec marge
    const textLeftMargin = 5; // Marge à gauche du texte
    const textUnderLogoY = logoY + logoHeight + 5; // Déplacer le texte en dessous du logo
    doc.setFontSize(10);
    doc.text("Drection Exécutive Opérations industrielles ", textLeftMargin, textUnderLogoY);
    doc.text("Site Industrielles de Gntour", 15, 41);
    doc.setFontSize(15);

     // Ajouter la date moins un jour sous le logo central
    const currentDateX = doc.internal.pageSize.width / 2;
    const currentDateY = logoY + logoHeight + 30;
    const currentDate = new Date(formData.date);
    currentDate.setDate(currentDate.getDate() - 1);
    const formattedDate = currentDate.toLocaleDateString();
    doc.text("Ben guérir , le " + formattedDate, currentDateX, currentDateY, { align: 'center' });

    // Ajouter les paragraphes au-dessus du tableau
    const paragraphMargin = 15; // Marge entre les paragraphes
    const paragraphX = 19; // Marge à gauche
    const paragraphY = currentDateY + 30; // Déplacer les paragraphes en dessous de la date
    const paragraph1 = "Objet : Commande et des artifices de tir.";
    const paragraph2 = "Bonjour vous trouvez dans ce tableau le commande de ben guérir d'explosif et artifices de tir.";
    const paragraph3 = "Au responsable CADEX";
    doc.text(paragraph3, paragraphX + 180, paragraphY - 15);
    doc.text(paragraph1, paragraphX, paragraphY);
    doc.text(paragraph2, paragraphX, paragraphY + paragraphMargin);

    // Ajouter le tableau
    const tableData = [
      ["Date", "Ammonix", "Tovex", "Raccord 17ms", "Raccord 42ms", "Raccord 25ms", "Raccord 65ms", "Raccord 100ms", "AEI", "Detos 500ms","Detos 450ms",  "Ligne de tir", "Observation"],
      [
        formData.date,
        submittedData.ammonix.toFixed(2),
        submittedData.tovex.toFixed(2),
        submittedData.r17.toFixed(2),
        submittedData.r25.toFixed(2),
        submittedData.r42.toFixed(2),
        submittedData.r65.toFixed(2),
        submittedData.r100.toFixed(2),
        submittedData.aei.toFixed(2),
        submittedData.detonateur500.toFixed(2),
        submittedData.detonateur450.toFixed(2),
        submittedData.ligneDeTir,
        formData.zone_tir
      ]
    ];

    const tableY = paragraphY + 30; // Déplacer le tableau vers le bas après les paragraphes
        doc.autoTable({
      startY: tableY,
      head: [tableData[0]], // En-tête du tableau
      body: tableData.slice(1),
      theme: 'grid',
      styles: {
        fontSize: 10,
        fontStyle: 'normal',
        textColor: [0, 0, 0],
        cellPadding: 2,
        valign: 'middle',
        halign: 'center' // Centrer le texte horizontalement
      },
      headerStyles: {
        fillColor: [200, 200, 200], // Couleur de fond de l'en-tête du tableau
        textColor: [0, 0, 0], // Couleur du texte de l'en-tête du tableau
        fontStyle: 'bold' // Texte en gras pour l'en-tête du tableau
      }
    });
    // Ajouter du texte sous le tableau
    const textUnderTableMargin = 30; // Marge entre le tableau et le texte
    const textUnderTableY = doc.autoTable.previous.finalY + textUnderTableMargin; // Déplacer le texte sous le tableau
    doc.text("SUPERVISEUR OCP", paragraphX, textUnderTableY);
    doc.text("Chef de Projet Demandeur", doc.internal.pageSize.width / 2, textUnderTableY);

    doc.save("command_data.pdf");
  } else {
    alert("Veuillez d'abord calculer les résultats pour générer le PDF.");
  }
};

export default generatePDF;