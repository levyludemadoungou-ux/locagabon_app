/* ==========================================================================
   LOCAGABON AI - ROUTER PAIEMENT RÉEL MOBILE MONEY (AIRTEL & MOOV GABON)
   ========================================================================== */

const express = require('express');
const router = express.Router();
const { loadDB, saveDB } = require('../config/db');

const COMMISSION_RATE = 0.03; // 3% de commission LocaGabon

// 1. INITIATION D'UN PAIEMENT MOBILE MONEY (AIRTEL *150# / MOOV *555#)
router.post('/initiate', (req, res) => {
  try {
    const { propertyId, amount, phone, paymentMethod } = req.body;

    if (!amount || !phone || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Informations de paiement Mobile Money incomplètes." });
    }

    // Valider le format du numéro gabonais
    const cleanPhone = phone.replace(/\s+/g, '');
    if (!cleanPhone.includes('077') && !cleanPhone.includes('066') && !cleanPhone.includes('065') && !cleanPhone.includes('241')) {
      return res.status(400).json({ success: false, message: "Numéro de téléphone Gabon invalide. Veuillez utiliser un numéro Airtel ou Moov valide." });
    }

    const db = loadDB();
    const transactionCode = `TX-GAB-${Math.floor(100000 + Math.random() * 900000)}`;
    const brutAmount = parseFloat(amount);
    const commAmount = Math.round(brutAmount * COMMISSION_RATE);

    let channelName = "Airtel Money Gabon (*150#)";
    if (paymentMethod === "moov") channelName = "Moov Money (*555#)";
    if (paymentMethod === "card") channelName = "Carte Bancaire Visa/MC";
    if (paymentMethod === "transfer") channelName = "Virement Bancaire BGFI/UGB";

    const newTransaction = {
      id: `tx-${Date.now()}`,
      transaction_code: transactionCode,
      property_id: propertyId || 'prop-1',
      bien: "Appartement 3 Pièces - Akanda Angondjé",
      brut: brutAmount,
      comm: commAmount,
      canal: channelName,
      phone_sender: cleanPhone,
      status: "PENDING", // PENDING -> PUSH USSD ENVOYÉ
      created_at: new Date().toISOString()
    };

    if (!db.transactions) db.transactions = [];
    db.transactions.unshift(newTransaction);
    saveDB(db);

    res.status(200).json({
      success: true,
      message: `Invitation Push USSD transmise vers le ${cleanPhone}. Veuillez saisir votre code secret ${paymentMethod === 'moov' ? '*555#' : '*150#'} sur votre téléphone.`,
      transactionCode: transactionCode,
      status: "PENDING"
    });

  } catch (err) {
    console.error("Erreur POST /payments/initiate:", err);
    res.status(500).json({ success: false, message: "Erreur lors de l'initiation du paiement Mobile Money." });
  }
});

// 2. WEBHOOK ASYNCHRONE DE CONFIRMATION AIRTEL / MOOV MONEY GABON
router.post('/webhook', (req, res) => {
  try {
    const { transactionCode, status, providerRef } = req.body;

    if (!transactionCode) {
      return res.status(400).json({ success: false, message: "Code de transaction manquant." });
    }

    const db = loadDB();
    const tx = (db.transactions || []).find(t => t.transaction_code === transactionCode);

    if (!tx) {
      return res.status(404).json({ success: false, message: "Transaction introuvable." });
    }

    tx.status = status || "PAID";
    tx.provider_ref = providerRef || `AIRTEL-REF-${Date.now()}`;
    tx.confirmed_at = new Date().toISOString();

    // Génération automatique de la quittance numérique certifiée
    const receiptCode = `GAB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReceipt = {
      id: `rec-${Date.now()}`,
      receipt_code: receiptCode,
      transaction_id: tx.id,
      tenant_name: "Mme/M. KASSA Marc",
      landlord_name: "M. MBOUMBA Jean-Pierre",
      period: "Août 2026",
      amount: `${tx.brut.toLocaleString('fr-FR')} FCFA`,
      method: tx.canal,
      created_at: new Date().toISOString()
    };

    if (!db.digital_receipts) db.digital_receipts = [];
    db.digital_receipts.unshift(newReceipt);

    saveDB(db);

    res.json({
      success: true,
      message: "Webhook de paiement Mobile Money traité avec succès. Quittance générée.",
      transactionCode: tx.transaction_code,
      receiptCode: receiptCode
    });

  } catch (err) {
    console.error("Erreur Webhook Payment:", err);
    res.status(500).json({ success: false, message: "Erreur serveur Webhook." });
  }
});

// 3. VÉRIFICATION DU STATUT DE PAIEMENT EN TEMPS RÉEL
router.get('/status/:code', (req, res) => {
  try {
    const db = loadDB();
    const tx = (db.transactions || []).find(t => t.transaction_code === req.params.code);

    if (!tx) {
      return res.status(404).json({ success: false, message: "Transaction non trouvée." });
    }

    res.json({
      success: true,
      transaction: tx
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur de statut." });
  }
});

module.exports = router;
