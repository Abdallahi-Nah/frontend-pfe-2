const mongoose = require('mongoose');

const departementSchema = new mongoose.Schema({
    nom: {
        type: String,
        require: [true, "svp entrer le nom du département"],
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    logo: String
}, {timestamps: true});

const departementModel = mongoose.model("Departement", departementSchema);
module.exports = departementModel;