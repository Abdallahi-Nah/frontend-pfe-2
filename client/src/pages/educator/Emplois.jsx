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
