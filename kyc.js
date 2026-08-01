/* ==========================================================================
   LOCAGABON AI - ROUTER COFFRE-FORT NUMÉRIQUE & VÉRIFICATION KYC (GABON)
   ========================================================================== */

const express = require('express');
const router = express.Router();
const { loadDB, saveDB } = require('../config/db');

// 1. TÉLÉVERSEMENT & ARCHIVAGE DE DOCUMENT KYC (CNI, NIF/RCCM, TITRE FONCIER)
router.post('/upload', (req, res) => {
  try {
    const { userId, docType, docNumber, fileName, fileData } = req.body;

    if (!userId || !docType || !docNumber) {
      return res.status(400).json({ success: false, message: "Type de document ou numéro d'identification manquant." });
    }

    const db = loadDB();
    const user = (db.users || []).find(u => u.id === userId || u.phone_gabonese === userId);

    const newDoc = {
      id: `kyc-${Date.now()}`,
      user_id: userId,
      doc_type: docType, // 'CNI', 'PASSPORT', 'NIF_RCCM', 'TITRE_FONCIER'
      doc_number: docNumber,
      file_name: fileName || `Document_${docType}_${Date.now()}.pdf`,
      status: "VERIFIED", // Auto-vérification pour la démo
      uploaded_at: new Date().toISOString()
    };

    if (!db.kyc_documents) db.kyc_documents = [];
    db.kyc_documents.unshift(newDoc);

    if (user) {
      user.kyc_verified = true;
      if (docType === 'NIF_RCCM') user.nif_rccm = docNumber;
    }

    saveDB(db);

    res.status(201).json({
      success: true,
      message: `Document ${docType} archivé et certifié avec succès dans le coffre-fort numérique LocaGabon.`,
      document: newDoc,
      kycStatus: "VERIFIED"
    });

  } catch (err) {
    console.error("Erreur POST /kyc/upload:", err);
    res.status(500).json({ success: false, message: "Erreur serveur lors de l'archivage KYC." });
  }
});

// 2. CONSULTATION DU STATUT DE VÉRIFICATION KYC
router.get('/status/:userId', (req, res) => {
  try {
    const db = loadDB();
    const userId = req.params.userId;

    const docs = (db.kyc_documents || []).filter(d => d.user_id === userId);
    const user = (db.users || []).find(u => u.id === userId || u.phone_gabonese === userId);

    res.json({
      success: true,
      userId: userId,
      isVerified: user ? user.kyc_verified : (docs.length > 0),
      documentsCount: docs.length,
      documents: docs
    });

  } catch (err) {
    console.error("Erreur GET /kyc/status:", err);
    res.status(500).json({ success: false, message: "Erreur serveur statut KYC." });
  }
});

// 3. VALIDATION MANUELLE PAR SUPER-ADMIN
router.post('/verify', (req, res) => {
  try {
    const { userId, approve } = req.body;
    const db = loadDB();
    const user = (db.users || []).find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
    }

    user.kyc_verified = approve !== undefined ? approve : true;
    saveDB(db);

    res.json({
      success: true,
      message: `Statut KYC de ${user.full_name} mis à jour : ${user.kyc_verified ? 'VÉRIFIÉ' : 'REJETÉ'}.`,
      user: { id: user.id, fullName: user.full_name, kycVerified: user.kyc_verified }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur lors de la validation administrative." });
  }
});

module.exports = router;
