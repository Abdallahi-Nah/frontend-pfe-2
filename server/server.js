const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("./connection/db.connection");
// routes
const departement = require("./routes/departement.router");
const specialite = require("./routes/specialite.routes");
const modules = require("./routes/module.routes");
const matieres = require("./routes/matiere.routes");
const enseignants = require("./routes/enseignant.router");
const etudiants = require("./routes/etudiant.router");
const admins = require("./routes/admin.router");
const authEnseignantRouter = require("./routes/auth.routes");
const authAdminRouter = require("./routes/auth.admin.routes");
const authEtudiantRouter = require("./routes/auth.etudiant.routes");
const emplois = require("./routes/emplois.routes");
const notesMatieres = require("./routes/notesMatieres.routes");
const courseRouter = require("./routes/course.route.js");
const contratPedagogiqueRouter = require("./routes/contrat.pedagogique.routes.js");

const ApiErrors = require("./utils/ApiErrors.utils");
const globalErrors = require("./my_middlewares/globalErrors");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`The environment is : ${process.env.NODE_ENV}`);
}

// routers
app.use("/departement", departement);
app.use("/specialite", specialite);
app.use("/module", modules);
app.use("/matiere", matieres);
app.use("/enseignant", enseignants);
app.use("/etudiant", etudiants);
app.use("/admin", admins);
app.use("/auth", authEnseignantRouter);
app.use("/auth-admin", authAdminRouter);
app.use("/auth-etudiant", authEtudiantRouter);
app.use("/emplois", emplois);
app.use("/notes-matieres", notesMatieres);
app.use("/course", courseRouter);
app.use("/contrat", contratPedagogiqueRouter);

app.use("*", (req, res, next) => {
  next(new ApiErrors(`ce url : ${req.originalUrl} n'existe pas`, 400));
});

app.use(globalErrors);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is work successfully on port : ${PORT}`);
});
