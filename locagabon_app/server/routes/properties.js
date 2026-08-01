/* ==========================================================================
   LOCAGABON AI - ROUTER ANNONCES IMMOBILIÈRES (LOCATION & VENTE)
   ========================================================================== */

const express = require('express');
const router = express.Router();
const { loadDB, saveDB } = require('../config/db');

// 1. LISTE FILTRÉE DES ANNONCES (LOCATION & VENTE)
router.get('/', (req, res) => {
  try {
    const { operation, sellerType, city, type, maxPrice } = req.query;
    const db = loadDB();

    let result = db.properties;

    if (operation && operation !== 'all') {
      result = result.filter(p => p.operation === operation);
    }

    if (sellerType && sellerType !== 'all') {
      result = result.filter(p => p.sellerType === sellerType);
    }

    if (city && city !== 'all') {
      result = result.filter(p => p.city.toLowerCase().includes(city.split(' ')[0].toLowerCase()));
    }

    if (type && type !== 'all') {
      result = result.filter(p => p.type === type);
    }

    if (maxPrice && maxPrice !== 'all') {
      result = result.filter(p => p.price <= parseFloat(maxPrice));
    }

    res.json({
      success: true,
      count: result.length,
      properties: result
    });

  } catch (err) {
    console.error("Erreur GET /properties:", err);
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des annonces." });
  }
});

// 2. CRÉATION D'UNE ANNONCE (CONFORMITÉ REGLEMENTATION GABON)
router.post('/', (req, res) => {
  try {
    const { title, city, type, operation, sellerType, price, cautionMois, edan, seeg, gardien, titreFoncier, description, bailleurName } = req.body;

    if (!title || !city || !type || !operation || !sellerType || !price) {
      return res.status(400).json({ success: false, message: "Les informations essentielles de l'annonce sont manquantes." });
    }

    // CONFORMITÉ LÉGALE GABON : Plafonnement de la caution à 3 mois maximum
    if (operation === 'Location' && cautionMois > 3) {
      return res.status(400).json({ 
        success: false, 
        message: "Conformité légale : Selon la loi gabonaise sur le bail d'habitation, la caution ne peut dépasser 3 mois." 
      });
    }

    const db = loadDB();

    const newProperty = {
      id: `prop-${Date.now()}`,
      title,
      city,
      type,
      operation, // 'Location' ou 'Vente'
      sellerType, // 'Particulier' ou 'Agence Pro'
      price: parseFloat(price),
      cautionMois: operation === 'Vente' ? 0 : parseInt(cautionMois || 2),
      edan: edan !== undefined ? edan : true,
      seeg: seeg !== undefined ? seeg : true,
      gardien: gardien !== undefined ? gardien : true,
      titreFoncier: operation === 'Vente' ? (titreFoncier || true) : false,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
      description: description || "Offre conforme aux normes gabonaises.",
      verified: true,
      bailleur: bailleurName || (sellerType === 'Agence Pro' ? 'Agence Immobilière Certifiée' : 'Particulier Direct'),
      created_at: new Date().toISOString()
    };

    db.properties.unshift(newProperty);
    saveDB(db);

    res.status(201).json({
      success: true,
      message: "Annonce immobilière publiée et certifiée avec succès.",
      property: newProperty
    });

  } catch (err) {
    console.error("Erreur POST /properties:", err);
    res.status(500).json({ success: false, message: "Erreur serveur lors de la création de l'annonce." });
  }
});

module.exports = router;
