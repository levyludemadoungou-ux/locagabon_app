/* ==========================================================================
   LOCAGABON AI - CONNECTEUR DE BASE DE DONNÉES REST & SUPABASE
   ========================================================================== */

const fs = require('fs');
const path = require('path');

// Base de données persistance locale (Fichier JSON pour fallback dev)
const DB_FILE = path.join(__dirname, '../data_store.json');

// Structure initiale
const initialData = {
  users: [
    {
      id: "u-admin",
      full_name: "Fondateur LocaGabon",
      phone_gabonese: "+241077000000",
      email: "admin@locagabon.ga",
      password_hash: "$2a$10$X8m1Z9g/2.8h7qP.xO3jUOe6c2tG3e.0y1k23456789", // admin123
      role: "super_admin",
      kyc_verified: true
    },
    {
      id: "u-agence-1",
      full_name: "Immo Gabon Pro SA",
      phone_gabonese: "+241077112233",
      email: "contact@immogabonpro.ga",
      password_hash: "$2a$10$X8m1Z9g/2.8h7qP.xO3jUOe6c2tG3e.0y1k23456789",
      role: "agence",
      nif_rccm: "RCCM-2026-B-89192",
      kyc_verified: true
    }
  ],
  properties: [
    {
      id: "prop-1",
      title: "Appartement 3 Pièces Spacieux - Angondjé Château",
      city: "Akanda (Angondjé)",
      type: "Appartement",
      operation: "Location",
      sellerType: "Agence Pro",
      price: 250000,
      cautionMois: 2,
      edan: true,
      seeg: true,
      gardien: true,
      clim: true,
      titreFoncier: false,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      description: "Bel appartement géré par Agence Pro comprenant grand séjour, 2 chambres. Compteur EDAN individuel et eau SEEG sans coupure.",
      verified: true,
      bailleur: "Immo Gabon Pro SA (Agence Pro)"
    },
    {
      id: "prop-2",
      title: "Studio Moderne Haut Standing - Quartier Louis",
      city: "Libreville (Centre)",
      type: "Studio",
      operation: "Location",
      sellerType: "Particulier",
      price: 180000,
      cautionMois: 2,
      edan: true,
      seeg: true,
      gardien: true,
      clim: true,
      titreFoncier: false,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
      description: "Studio en direct propriétaire à Louis. Sécurité 24h/24, gardien, parking et surpresseur SEEG.",
      verified: true,
      bailleur: "Mme NTOUTOUME Carine (Particulier)"
    },
    {
      id: "prop-3",
      title: "Terrain 1 000 m² à Vendre avec Titre Foncier - Avorbam",
      city: "Akanda (Angondjé)",
      type: "Terrain",
      operation: "Vente",
      sellerType: "Agence Pro",
      price: 35000000,
      cautionMois: 0,
      edan: true,
      seeg: true,
      gardien: false,
      clim: false,
      titreFoncier: true,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      description: "Parcelle plate de 1 000 m² idéale pour construction de villa. Titre Foncier définitif vérifié.",
      verified: true,
      bailleur: "Agence Cabinet Foncier Gabon"
    }
  ],
  transactions: [],
  payouts: []
};

// Initialisation du fichier JSON local si inexistant
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

function loadDB() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return initialData;
  }
}

function saveDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Erreur de sauvegarde DB:", err);
  }
}

module.exports = {
  loadDB,
  saveDB
};
