/* ==========================================================================
   LOCAGABON AI - ROUTER AUTHENTIFICATION & SÉCURITÉ JWT
   ========================================================================== */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loadDB, saveDB } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'locagabon_super_secret_jwt_key_2026';

// 1. INSCRIPTION SÉCURISÉE (LOCATAIRE, BAILLEUR PARTICULIER, AGENCE PRO)
router.post('/register', async (req, res) => {
  try {
    const { fullName, phone, email, password, role, nifRccm } = req.body;

    if (!fullName || !phone || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "Tous les champs obligatoires doivent être renseignés." });
    }

    const db = loadDB();

    // Vérification existence email ou téléphone
    const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() || u.phone_gabonese === phone);
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Un compte existe déjà avec cet email ou ce numéro de téléphone." });
    }

    // Hachage sécurisé du mot de passe
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: `u-${Date.now()}`,
      full_name: fullName,
      phone_gabonese: phone,
      email: email.toLowerCase(),
      password_hash: passwordHash,
      role: role, // 'locataire', 'particulier', 'agence'
      nif_rccm: role === 'agence' ? nifRccm : null,
      kyc_verified: role === 'agence' ? true : false,
      created_at: new Date().toISOString()
    };

    db.users.push(newUser);
    saveDB(db);

    // Génération du jeton JWT
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: "Compte créé avec succès.",
      token,
      user: {
        id: newUser.id,
        fullName: newUser.full_name,
        email: newUser.email,
        phone: newUser.phone_gabonese,
        role: newUser.role,
        nifRccm: newUser.nif_rccm
      }
    });

  } catch (err) {
    console.error("Erreur Inscription:", err);
    res.status(500).json({ success: false, message: "Erreur serveur lors de l'inscription." });
  }
});

// 2. CONNEXION UTILISATEUR
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // Email ou Téléphone

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: "Veuillez saisir votre identifiant et mot de passe." });
    }

    const db = loadDB();
    const user = db.users.find(u => 
      u.email.toLowerCase() === identifier.toLowerCase() || 
      u.phone_gabonese === identifier
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "Identifiant ou mot de passe incorrect." });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Identifiant ou mot de passe incorrect." });
    }

    // Génération du jeton JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: "Connexion réussie.",
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone_gabonese,
        role: user.role,
        nifRccm: user.nif_rccm
      }
    });

  } catch (err) {
    console.error("Erreur Connexion:", err);
    res.status(500).json({ success: false, message: "Erreur serveur lors de la connexion." });
  }
});

module.exports = router;
