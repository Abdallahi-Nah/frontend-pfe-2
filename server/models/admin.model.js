const mongoose = require('mongoose');
const Utilisateur = require('./user.model'); // Importer le schéma de base

// Schéma pour Administrateur
const administrateurSchema = new mongoose.Schema({
    dateEmbauche: { type: Date, required: true }
});

// Héritage du schéma Utilisateur
administrateurSchema.add(Utilisateur.schema);

// Modèle Administrateur
const Administrateur = mongoose.model('Administrateur', administrateurSchema);

module.exports = Administrateur;