-- ==========================================================================
-- LOCAGABON AI - SCHÉMA DE BASE DE DONNÉES POSTGRESQL / SUPABASE
-- Conforme aux exigences KYC du Gabon & régulation des baux
-- ==========================================================================

-- 1. Table des Utilisateurs (Locataires, Bailleurs Particuliers, Agences Pro, Super-Admin)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    phone_gabonese VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN ('locataire', 'particulier', 'agence', 'super_admin')),
    nif_rccm VARCHAR(100) DEFAULT NULL,
    kyc_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table des Offres Immobilières (Locations & Ventes)
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Studio', 'Appartement', 'Villa', 'Chambre', 'Terrain')),
    operation VARCHAR(20) NOT NULL CHECK (operation IN ('Location', 'Vente')),
    seller_type VARCHAR(30) NOT NULL CHECK (seller_type IN ('Particulier', 'Agence Pro')),
    price NUMERIC(12, 2) NOT NULL,
    caution_months INT DEFAULT 2 CHECK (caution_months <= 3),
    edan_meter BOOLEAN DEFAULT TRUE,
    seeg_water BOOLEAN DEFAULT TRUE,
    security_guard BOOLEAN DEFAULT FALSE,
    titre_foncier BOOLEAN DEFAULT FALSE,
    description TEXT,
    image_url TEXT,
    verified BOOLEAN DEFAULT TRUE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table des Transactions (Airtel Money, Moov Money, Carte, Virement)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_code VARCHAR(50) NOT NULL UNIQUE,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    amount_brut NUMERIC(12, 2) NOT NULL,
    commission_net NUMERIC(12, 2) NOT NULL,
    payment_channel VARCHAR(50) NOT NULL CHECK (payment_channel IN ('Airtel Money', 'Moov Money', 'Carte Bancaire', 'Virement')),
    phone_sender VARCHAR(20),
    status VARCHAR(30) DEFAULT 'PAID' CHECK (status IN ('PENDING', 'PAID', 'REFUNDED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table des Retraits Administrateur vers Revolut (Euro €)
CREATE TABLE IF NOT EXISTS revolut_payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payout_code VARCHAR(50) NOT NULL UNIQUE,
    amount_fcfa NUMERIC(12, 2) NOT NULL,
    amount_eur NUMERIC(10, 2) NOT NULL,
    iban_destination VARCHAR(50) NOT NULL,
    status VARCHAR(30) DEFAULT 'COMPLETED' CHECK (status IN ('PROCESSING', 'COMPLETED', 'FAILED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table des Quittances et Attestations Numériques
CREATE TABLE IF NOT EXISTS digital_receipts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receipt_code VARCHAR(50) NOT NULL UNIQUE,
    transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
    tenant_name VARCHAR(150) NOT NULL,
    landlord_name VARCHAR(150) NOT NULL,
    period VARCHAR(50) NOT NULL,
    amount_text VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
