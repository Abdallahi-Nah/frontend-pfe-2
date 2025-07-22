// import React, { useState } from "react";
// import {
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Pagination,
//   Box,
//   Typography,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { Edit, Delete, Download } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import jsPDF from "jspdf";
// import "./Emplois.scss";

// const Emplois = () => {
//   const [filterSpecialite, setFilterSpecialite] = useState("all");
//   const [filterType, setFilterType] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [emplois] = useState([
//     {
//       id: 1,
//       jour: "Lundi",
//       heureDebut: "08:30",
//       heureFin: "10:30",
//       matiere: "Petit & Javascript",
//       enseignant: "Dr. Diakité",
//       lieu: "Salle A1",
//       type: "TP",
//       specialite: "Informatique",
//       code: "M4002",
//     },
//     {
//       id: 2,
//       jour: "Lundi",
//       heureDebut: "10:30",
//       heureFin: "12:30",
//       matiere: "Python",
//       enseignant: "Dr. Diakité",
//       lieu: "Salle B2",
//       type: "Cours",
//       specialite: "Informatique",
//       code: "M4002",
//     },
//     {
//       id: 3,
//       jour: "Mardi",
//       heureDebut: "10:30",
//       heureFin: "12:30",
//       matiere: "Python",
//       enseignant: "Dr. Farouq",
//       lieu: "Salle C3",
//       type: "Cours",
//       specialite: "Informatique",
//       code: "M4002",
//     },
//   ]);

//   const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
//   const heuresCreneaux = [
//     "08:30-10:30",
//     "10:30-12:30",
//     "14:00-16:00",
//     "16:00-18:00",
//   ];

//   const filteredEmplois = emplois.filter((emploi) => {
//     return (
//       (filterSpecialite === "all" || emploi.specialite === filterSpecialite) &&
//       (filterType === "all" || emploi.type === filterType)
//     );
//   });

//   const getEmploiForSlot = (jour, creneau) => {
//     return filteredEmplois.find((emploi) => {
//       const emploiCreneau = emploi.heureDebut + "-" + emploi.heureFin;
//       return emploi.jour === jour && emploiCreneau === creneau;
//     });
//   };

//   const handleDownload = () => {
//     const pdf = new jsPDF("landscape");

//     pdf.setFontSize(16);
//     pdf.text("Emploi du Temps", 20, 20);

//     pdf.setFontSize(10);
//     const filterText =
//       "Spécialité: " +
//       (filterSpecialite === "all" ? "Toutes" : filterSpecialite) +
//       " | Type: " +
//       (filterType === "all" ? "Tous" : filterType);
//     pdf.text(filterText, 20, 30);

//     const startY = 40;
//     const cellHeight = 25;
//     const dayColWidth = 40;

//     pdf.setFontSize(8);
//     pdf.text("Horaires", 20, startY + 5);

//     jours.forEach((jour, index) => {
//       pdf.text(jour, 50 + index * dayColWidth, startY + 5);
//     });

//     heuresCreneaux.forEach((creneau, rowIndex) => {
//       const y = startY + 10 + rowIndex * cellHeight;
//       pdf.text(creneau, 20, y + 5);

//       jours.forEach((jour, colIndex) => {
//         const emploi = getEmploiForSlot(jour, creneau);
//         const x = 50 + colIndex * dayColWidth;

//         if (emploi) {
//           pdf.setFontSize(6);
//           pdf.text(emploi.code, x, y + 3);
//           pdf.text(emploi.type, x, y + 8);
//           pdf.text(emploi.matiere.substring(0, 15), x, y + 13);
//           pdf.text(emploi.enseignant, x, y + 18);
//         }
//       });
//     });

//     const fileName =
//       "emploi-du-temps-" + new Date().toISOString().split("T")[0] + ".pdf";
//     pdf.save(fileName);
//   };

//   return (
//     <div className="emplois-container">
//       <Card className="emplois-card">
//         <CardContent>
//           <Typography
//             variant="h4"
//             component="h1"
//             className="page-title"
//             style={{ marginBottom: "20px" }}
//           >
//             Mes emplois du temps
//           </Typography>

//           <Box
//             className="actions-section"
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "20px",
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={handleDownload}
//               className="download-btn"
//               startIcon={<Download />}
//             >
//               Télécharger en PDF
//             </Button>
//           </Box>

//           <Box className="filters-section">
//             <FormControl className="filter-select">
//               <InputLabel>Filtrer par type</InputLabel>
//               <Select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 label="Filtrer par type"
//               >
//                 <MenuItem value="all">Tous les types</MenuItem>
//                 <MenuItem value="Cours">Cours</MenuItem>
//                 <MenuItem value="TP">TP</MenuItem>
//                 <MenuItem value="TD">TD</MenuItem>
//                 <MenuItem value="DEVOIR">DEVOIR</MenuItem>
//                 <MenuItem value="EXAMEN">EXAMEN</MenuItem>
//                 <MenuItem value="RATTRAPAGE">RATTRAPAGE</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           <div className="table-section">
//             <TableContainer component={Paper} className="table-container">
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell className="time-header">Horaires</TableCell>
//                     {jours.map((jour) => (
//                       <TableCell key={jour} className="day-header">
//                         {jour}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {heuresCreneaux.map((creneau) => (
//                     <TableRow key={creneau}>
//                       <TableCell className="time-cell">{creneau}</TableCell>
//                       {jours.map((jour) => {
//                         const emploi = getEmploiForSlot(jour, creneau);
//                         return (
//                           <TableCell
//                             key={jour + "-" + creneau}
//                             className="slot-cell"
//                           >
//                             {emploi && (
//                               <div className="emploi-slot">
//                                 <div className="emploi-code">{emploi.code}</div>
//                                 <div className="emploi-type">{emploi.type}</div>
//                                 <div className="emploi-matiere">
//                                   {emploi.matiere}
//                                 </div>
//                                 <div className="emploi-enseignant">
//                                   {emploi.enseignant}
//                                 </div>
//                               </div>
//                             )}
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>

//           <Box className="pagination-section">
//             <Pagination
//               count={100}
//               page={currentPage}
//               onChange={(event, value) => setCurrentPage(value)}
//               color="primary"
//             />
//           </Box>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Emplois;

"use client";
import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Emplois.scss";
import { AppContext } from "../../context/AppContext.jsx";
import axios from "axios";

const Emplois = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const emploisParPage = 1;
  const { backendUrl, emplois, fetchEmplois } = useContext(AppContext);
  const tableRef = useRef();

  useEffect(() => {
    fetchEmplois();
  }, []);

  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  const heuresCreneaux = [
    "08h:30-10h:30",
    "10h:30-12h:30",
    "14h:00-16h:00",
    "16h:00-18h:00",
  ];

  const normalizeHeure = (heure) => heure.replace("h:", ":");

  const emploisParSpecialite = emplois.reduce((acc, emploi) => {
    const specialiteId = emploi.specialite?._id;
    if (!acc[specialiteId])
      acc[specialiteId] = { nom: emploi.specialite?.nom, emplois: [] };
    acc[specialiteId].emplois.push(emploi);
    return acc;
  }, {});

  const specialites = Object.entries(emploisParSpecialite);
  const totalPages = Math.ceil(specialites.length / emploisParPage);
  const specialitesToDisplay = specialites.slice(
    (currentPage - 1) * emploisParPage,
    currentPage * emploisParPage
  );

  const getEmploiForSlot = (jour, creneau, emploisList) => {
    let [start, end] = creneau.split("-");
    start = normalizeHeure(start);
    end = normalizeHeure(end);
    return emploisList.find(
      (e) => e.jour === jour && e.heureDebut === start && e.heureFin === end
    );
  };

  const handleDownloadPDF = () => {
    const input = document.querySelector(".emplois-card");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("emploi-du-temps.pdf");
    });
  };

  return (
    <div className="emplois-container">
      <Card className="emplois-card">
        <CardContent>
          <Box
            className="actions-section"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleDownloadPDF}
              className="download-btn"
              startIcon={<Download />}
            >
              Télécharger en PDF
            </Button>
          </Box>

          {specialitesToDisplay.map(([id, { nom, emplois: emploisList }]) => (
            <Box key={id} style={{ marginBottom: 40 }}>
              <Typography variant="h6" style={{ marginBottom: 10 }}>
                Spécialité : {nom}
              </Typography>
              <TableContainer component={Paper} className="table-container">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="time-header">Horaires</TableCell>
                      {jours.map((jour) => (
                        <TableCell key={jour} className="day-header">
                          {jour}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {heuresCreneaux.map((creneau, index) => (
                      <TableRow key={index}>
                        <TableCell className="time-cell">{creneau}</TableCell>
                        {jours.map((jour) => {
                          const emploi = getEmploiForSlot(
                            jour,
                            creneau,
                            emploisList
                          );
                          return (
                            <TableCell
                              key={jour + "-" + index}
                              className="slot-cell"
                            >
                              {emploi && (
                                <div className="emploi-slot">
                                  <div
                                    className="emploi-type"
                                    style={{ textAlign: "center" }}
                                  >
                                    {emploi.type || "—"}
                                  </div>
                                  <div className="emploi-matiere">
                                    {emploi.matiere?.nom ||
                                      emploi.matiere ||
                                      "—"}
                                  </div>
                                  <div className="emploi-enseignant">
                                    <b>Prof : </b>
                                    {emploi.enseignant?.nom ||
                                      emploi.enseignant ||
                                      "—"}
                                  </div>
                                  <div className="emploi-lieu">
                                    {emploi.lieu || "—"}
                                  </div>
                                  <div className="emploi-semestre">
                                    {emploi.semestre || "—"}
                                  </div>
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}

          <Box className="pagination-section" style={{ marginTop: 30 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Emplois;
