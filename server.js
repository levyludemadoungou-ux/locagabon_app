/* ==========================================================================
   LOCAGABON AI - SERVEUR BACK-END EXPRESS & REST API (PRODUCTION READY)
   ========================================================================== */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const adminRoutes = require('./routes/admin');
const paymentRoutes = require('./routes/payments');
const kycRoutes = require('./routes/kyc');
const settlementRoutes = require('./routes/settlements');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/settlements', settlementRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'LocaGabon AI Back-End API (Production Ready - Mobile Money & CNPDCP Gabon)',
    timestamp: new Date().toISOString()
  });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 SERVEUR BACK-END LOCAGABON AI (PRODUCTION READY) PORT ${PORT}`);
  console.log(`💳 Mobile Money: Airtel (*150#) & Moov (*555#) Active`);
  console.log(`🔒 Coffre-Fort KYC & Titres Fonciers Actif`);
  console.log(`⚖️ Conformité CNPDCP Gabon (Loi n°001/2011) & Reversement 97%/3% Active`);
  console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
