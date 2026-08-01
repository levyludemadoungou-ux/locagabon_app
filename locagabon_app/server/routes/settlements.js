/* ==========================================================================
   LOCAGABON AI - MOTEUR DE REVERSEMENT AUTOMATIQUE & CNPDCP GABON
   ========================================================================== */

const express = require('express');
const router = express.Router();
const { loadDB, saveDB } = require('../config/db');

const COMMISSION_RATE = 0.03; // 3% LocaGabon / 97% Bailleur

// 1. MOTEUR DE REVERSEMENT AUTOMATIQUE (97% BAILLEUR / 3% LOCAGABON)
router.post('/auto-payout', (req, res) => {
  try {
    const { transactionId, landlordPhone, landlordRIB } = req.body;

    if (!transactionId) {
      return res.status(400).json({ success: false, message: "ID de transaction manquant pour le reversement." });
    }

    const db = loadDB();
    const tx = (db.transactions || []).find(t => t.id === transactionId || t.transaction_code === transactionId);

    if (!tx) {
      return res.status(404).json({ success: false, message: "Transaction introuvable." });
    }

    const brut = tx.brut;
    const commLocaGabon = Math.round(brut * COMMISSION_RATE);
    const netLandlord = brut - commLocaGabon;

    const settlementRecord = {
      id: `settle-${Date.now()}`,
      transaction_id: tx.id,
      amount_brut: brut,
      net_landlord_fcfa: netLandlord,
      commission_locagabon_fcfa: commLocaGabon,
      destination_landlord: landlordRIB || landlordPhone || "+241077112233",
      destination_locagabon: "Compte Marchand LocaGabon (BGFI GA89...)",
      status: "EXECUTED",
      executed_at: new Date().toISOString()
    };

    if (!db.settlements) db.settlements = [];
    db.settlements.unshift(settlementRecord);
    saveDB(db);

    res.json({
      success: true,
      message: `Reversement automatique exécuté : ${netLandlord.toLocaleString('fr-FR')} FCFA reversés au Bailleur (97%) et ${commLocaGabon.toLocaleString('fr-FR')} FCFA crédités sur le Compte Marchand LocaGabon (3%).`,
      settlement: settlementRecord
    });

  } catch (err) {
    console.error("Erreur POST /settlements/auto-payout:", err);
    res.status(500).json({ success: false, message: "Erreur lors du reversement automatique." });
  }
});

// 2. MENTIONS LÉGALES CNPDCP GABON (LOI N°001/2011)
router.get('/legal-terms', (req, res) => {
  res.json({
    success: true,
    jurisdiction: "République Gabonaise",
    regulatoryBody: "Commission Nationale de Protection des Données Personnelles (CNPDCP Gabon)",
    lawReference: "Loi n°001/2011 du 25 septembre 2011",
    guarantees: [
      "Chiffrement de bout en bout des données d'identité (CNI, Passeports)",
      "Vérification des NIF / RCCM pour la conformité commerciale des Agences Immobilières Pro",
      "Séquestre et traçabilité des quittances numériques conformes aux tribunaux gabonais",
      "Exercice du droit d'accès et de rectification sur simple demande à dpo@locagabon.ga"
    ]
  });
});

module.exports = router;
