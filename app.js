/* ==========================================================================
   LOCAGABON AI - LOGIQUE APPLICATIVE, FICHE DÉTAILLÉE (STYLE SE LOGER / LEBONCOIN)
   ========================================================================== */

const COMMISSION_RATE = 0.03; // 3% LocaGabon

const INITIAL_PROPERTIES = [
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
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Superbe appartement comprenant un grand séjour lumineux, 2 chambres climatisées avec placards intégrés, 2 salles de bain indépendantes, cuisine équipée et balcon privé. Compteur EDAN individuel et surpresseur d'eau SEEG sans aucune coupure. Environnement sécurisé à 2 minutes du goudron principal.",
    verified: true,
    bailleur: "Immo Gabon Pro SA (NIF: 2026-B-89192)"
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
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Studio entièrement rénové et staffé situé en direct propriétaire (Zéro frais d'agence) au cœur du Quartier Louis. Proche du bord de mer et des restaurants. Gardiennage 24h/24, parking privé et surpresseur d'eau.",
    verified: true,
    bailleur: "Mme NTOUTOUME Carine (Particulier Direct)"
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
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Magnifique parcelle plate de 1 000 m² prête à bâtir dans la zone d'Avorbam. Titre Foncier individuel définitif et vérifié auprès de la Conservation Foncière du Gabon. Accès facile, électricité EDAN et eau SEEG en bordure du terrain.",
    verified: true,
    bailleur: "Agence Cabinet Foncier Gabon SA"
  },
  {
    id: "prop-4",
    title: "Villa Duplex 4 Chambres à Vendre - Batterie IV",
    city: "Batterie IV",
    type: "Villa",
    operation: "Vente",
    sellerType: "Particulier",
    price: 180000000,
    cautionMois: 0,
    edan: true,
    seeg: true,
    gardien: true,
    clim: true,
    titreFoncier: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Villa résidentielle haut standing à Batterie IV. Grand jardin, piscine privative, groupe électrogène automatique et réserve d'eau 2000L. Titre Foncier individuel disponible.",
    verified: true,
    bailleur: "M. ONDO Jean-Marc (Particulier)"
  },
  {
    id: "prop-5",
    title: "Chambre Confort Clôturée - Owendo Cité Octra",
    city: "Owendo",
    type: "Chambre",
    operation: "Location",
    sellerType: "Particulier",
    price: 90000,
    cautionMois: 2,
    edan: true,
    seeg: true,
    gardien: false,
    clim: false,
    titreFoncier: false,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Chambre avec salle de douche interne privée et cuisine américaine. Environnement sécurisé à Owendo, idéal pour étudiant ou travailleur.",
    verified: true,
    bailleur: "M. ONDO Paul (Particulier)"
  },
  {
    id: "prop-6",
    title: "Appartement 2 Pièces Rénové - Port-Gentil Ntchoréré",
    city: "Port-Gentil",
    type: "Appartement",
    operation: "Location",
    sellerType: "Agence Pro",
    price: 220000,
    cautionMois: 2,
    edan: true,
    seeg: true,
    gardien: true,
    clim: true,
    titreFoncier: false,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Bel appartement en location sous mandat d'agence à Port-Gentil. Climatisation installée, environnement calme et gardiennage.",
    verified: true,
    bailleur: "Agence Ogooué Immobilier Pro"
  }
];

let TENANT_RECEIPTS = [
  { id: "GAB-2026-771", mois: "Juillet 2026", montant: "250 000 FCFA", methode: "Airtel Money (*150#)", date: "03/07/2026" }
];

let ADMIN_TRANSACTIONS = [
  { id: "TX-99120", bien: "Appartement 3P - Akanda", brut: 250000, comm: 7500, canal: "Airtel Money Gabon", date: "01/08/2026" }
];

let adminFinancials = {
  totalVolumeFCFA: 181030000,
  commissionFCFA: 5430900,
  gabonBankBalanceFCFA: 5430900
};

let state = {
  properties: [...INITIAL_PROPERTIES],
  currentSection: "section-annonces",
  activePropertyForPay: INITIAL_PROPERTIES[0],
  pendingPayData: null,
  currentUser: null
};

// --- INITIALISATION ---
document.addEventListener("DOMContentLoaded", () => {
  renderProperties(state.properties);
  renderAdminDashboard();
  initDashboardCharts();
  setupNavigation();
  setupSearchTabs();
  setupAISearch();
  setupClassicFilters();
  setupIAChat();
  setupModals();
  setupAuthModal();
  setupThreeStepPaymentSystem();
  setupFAQAccordion();
  setupAdminGabonBankPayout();
  setupPricingAndContact();
});

// --- NAVIGATION ---
function setupNavigation() {
  const navBtns = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".app-section");

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      if (!targetId) return;

      navBtns.forEach(b => b.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      btn.classList.add("active");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("active");
        window.scrollTo({ top: targetSection.offsetTop - 80, behavior: "smooth" });
      }
    });
  });

  document.getElementById("logoBtn")?.addEventListener("click", () => {
    document.querySelector('.nav-btn[data-target="section-annonces"]')?.click();
  });
}

// --- AFFICHAGE DES ANNONCES (AVEC OPTION CONSULTER LA FICHE DÉTAILLÉE) ---
function renderProperties(props) {
  const grid = document.getElementById("propertyGrid");
  const countEl = document.getElementById("resultsCount");
  if (!grid) return;
  countEl.textContent = `${props.length} annonce(s) trouvée(s)`;

  if (props.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--bg-surface); border-radius: var(--radius-lg);">
        <i class="ri-search-eye-line" style="font-size: 3rem; color: var(--accent-gold);"></i>
        <h3 style="margin-top: 1rem;">Aucun bien ne correspond à votre recherche</h3>
      </div>
    `;
    return;
  }

  grid.innerHTML = props.map(p => {
    const isSale = p.operation === "Vente";
    const isAgency = p.sellerType === "Agence Pro";

    return `
      <div class="property-card" data-id="${p.id}">
        <div class="prop-img-wrapper btn-open-detail" data-id="${p.id}">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          
          ${isAgency ? 
            `<span class="badge-seller-pro"><i class="ri-building-2-fill"></i> Agence Pro</span>` : 
            `<span class="badge-seller-private"><i class="ri-user-user-line"></i> Particulier</span>`
          }

          <span class="badge-op-type ${isSale ? 'badge-op-sale' : 'badge-op-rent'}">${p.operation}</span>
          <span class="prop-badge-price">${p.price.toLocaleString('fr-FR')} FCFA${isSale ? '' : '<small>/mois</small>'}</span>
        </div>

        <div class="prop-content">
          <h3 class="prop-title btn-open-detail" data-id="${p.id}">${p.title}</h3>
          <div class="prop-location">
            <i class="ri-map-pin-2-fill"></i> ${p.city} | ${p.bailleur}
          </div>

          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; flex: 1;">
            ${p.description.length > 90 ? p.description.substring(0, 90) + '...' : p.description}
          </p>

          <div class="prop-footer">
            <button class="btn-card-secondary btn-open-detail" data-id="${p.id}">
              <i class="ri-eye-line"></i> Consulter l'annonce
            </button>
            <button class="btn-card-primary btn-pay-prop" data-id="${p.id}">
              <i class="ri-file-text-line"></i> Réserver
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Event Listener : Cliquer sur une carte ou "Consulter l'annonce"
  document.querySelectorAll(".btn-open-detail").forEach(el => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const propId = el.getAttribute("data-id");
      const targetProp = state.properties.find(p => p.id === propId);
      if (targetProp) openPropertyDetailModal(targetProp);
    });
  });

  document.querySelectorAll(".btn-pay-prop").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const propId = btn.getAttribute("data-id");
      const targetProp = state.properties.find(p => p.id === propId);
      if (targetProp) openPaymentModal(targetProp);
    });
  });
}

// --- OUVERTURE DE LA FICHE DÉTAILLÉE D'UNE ANNONCE (STYLE SELOGER / LEBONCOIN) ---
function openPropertyDetailModal(p) {
  const modalContent = document.getElementById("propertyDetailContent");
  if (!modalContent) return;

  const isSale = p.operation === "Vente";
  const isAgency = p.sellerType === "Agence Pro";
  const gallery = p.gallery || [p.image];

  modalContent.innerHTML = `
    <div class="detail-header">
      <div class="detail-meta-row">
        ${isAgency ? 
          `<span class="badge-seller-pro" style="position:static;"><i class="ri-building-2-fill"></i> Agence Immobilière Pro</span>` : 
          `<span class="badge-seller-private" style="position:static;"><i class="ri-user-user-line"></i> Particulier Direct</span>`
        }
        <span class="badge-op-type ${isSale ? 'badge-op-sale' : 'badge-op-rent'}" style="position:static;">${p.operation}</span>
        ${p.titreFoncier ? `<span class="tag-item highlight"><i class="ri-file-shield-2-line"></i> Titre Foncier Certifié</span>` : ''}
      </div>

      <h2 style="margin-top:0.6rem;">${p.title}</h2>
      <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem;">
        <i class="ri-map-pin-2-fill" style="color: var(--accent-emerald);"></i> <strong>${p.city}</strong> | Référence : #${p.id.toUpperCase()}
      </div>

      <div class="detail-price-tag">
        ${p.price.toLocaleString('fr-FR')} FCFA ${isSale ? '' : '/ mois'}
      </div>
    </div>

    <!-- GALERIE PHOTOS HD -->
    <div class="prop-gallery-container">
      <div class="prop-main-photo">
        <img id="mainGalleryPhoto" src="${gallery[0]}" alt="${p.title}">
      </div>
      ${gallery.length > 1 ? `
        <div class="prop-thumbs-row">
          ${gallery.map((imgUrl, idx) => `
            <div class="prop-thumb ${idx === 0 ? 'active' : ''}" onclick="changeMainGalleryPhoto('${imgUrl}', this)">
              <img src="${imgUrl}" alt="Photo ${idx+1}">
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <!-- ÉQUIPEMENTS & FICHE TECHNIQUE -->
    <div class="detail-features-grid">
      <div class="feature-box">
        <i class="ri-flashlight-line"></i>
        <div>
          <span>Électricité</span>
          <strong>${p.edan ? 'EDAN Individuel' : 'Inclus'}</strong>
        </div>
      </div>
      <div class="feature-box">
        <i class="ri-drop-line"></i>
        <div>
          <span>Eau potable</span>
          <strong>${p.seeg ? 'SEEG avec Surpresseur' : 'Forage privé'}</strong>
        </div>
      </div>
      <div class="feature-box">
        <i class="ri-user-protect-line"></i>
        <div>
          <span>Sécurité</span>
          <strong>${p.gardien ? 'Gardien H24 & Clôture' : 'Portail Sécurisé'}</strong>
        </div>
      </div>
      <div class="feature-box">
        <i class="ri-shield-keyhole-line"></i>
        <div>
          <span>Garantie Légal</span>
          <strong>${isSale ? 'Titre Foncier' : `Caution : ${p.cautionMois} mois`}</strong>
        </div>
      </div>
    </div>

    <!-- DESCRIPTION DÉTAILLÉE RÉDIGÉE -->
    <div class="detail-description-card">
      <h4><i class="ri-article-line"></i> Description détaillée du bien</h4>
      <p style="font-size: 0.92rem; color: var(--text-primary); line-height: 1.7;">
        ${p.description}
      </p>
    </div>

    <!-- ANNONCEUR / BAILLEUR -->
    <div class="detail-landlord-card">
      <div>
        <span style="font-size: 0.78rem; color: var(--text-secondary);">Annonce proposée par :</span>
        <h4 style="font-size: 1rem; color: var(--text-primary);">${p.bailleur}</h4>
      </div>
      <span class="badge-status-ok"><i class="ri-shield-check-fill"></i> Annonceur Vérifié CNPDCP</span>
    </div>

    <!-- BOUTONS D'ACTION (RÉSERVED / PAIEMENT MOBILE MONEY) -->
    <div class="confirm-actions-grid">
      <button class="btn-pay-submit" id="btnBookFromDetail" style="padding: 1rem; font-size: 1.05rem;">
        <i class="ri-file-text-line"></i> ${isSale ? 'Réserver & Générer le Compromis de Vente' : 'Réserver & Générer mon Contrat de Bail IA'}
      </button>
      <button class="btn-secondary" onclick="closeModal('propertyDetailModal')">
        <i class="ri-close-line"></i> Fermer la fiche
      </button>
    </div>
  `;

  // Bouton Réserver depuis la fiche détaillée
  document.getElementById("btnBookFromDetail")?.addEventListener("click", () => {
    closeModal("propertyDetailModal");
    openPaymentModal(p);
  });

  openModal("propertyDetailModal");
}

function changeMainGalleryPhoto(imgUrl, thumbEl) {
  const mainImg = document.getElementById("mainGalleryPhoto");
  if (mainImg) mainImg.src = imgUrl;
  document.querySelectorAll(".prop-thumb").forEach(t => t.classList.remove("active"));
  thumbEl.classList.add("active");
}

function setupFAQAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(q => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      const isActive = item.classList.contains("active");
      
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
}

function generateAILeaseContract(prop, phone, method) {
  const isSale = prop.operation === "Vente";
  const cautionAmount = prop.cautionMois ? (prop.price * prop.cautionMois) : (prop.price * 2);
  const currentDate = new Date().toLocaleDateString('fr-FR');

  if (isSale) {
    return `
      <div style="text-align: center; margin-bottom: 1rem;">
        <span class="lease-badge-ia"><i class="ri-robot-2-line"></i> CONTRAT GÉNÉRÉ PAR L'IA LOCAGABON</span>
        <h2>COMPROMIS DE VENTE IMMOBILIÈRE</h2>
        <small>Conforme au Droit Foncier de la République Gabonaise</small>
      </div>

      <div class="lease-section">
        <h4>1. PARTIES CONTRACTANTES</h4>
        <p><strong>Vendeur :</strong> ${prop.bailleur}</p>
        <p><strong>Acheteur :</strong> Mme/M. KASSA Marc (Téléphone : ${phone})</p>
      </div>

      <div class="lease-section">
        <h4>2. DÉSIGNATION DU BIEN & TITRE FONCIER</h4>
        <p><strong>Objet :</strong> Vente définitive de : <em>${prop.title}</em> situé à <strong>${prop.city}</strong>.</p>
        <p><strong>Garantie Foncière :</strong> Bien certifié avec Titre Foncier authentifié auprès de la Conservation Foncière du Gabon.</p>
      </div>

      <div class="lease-section">
        <h4>3. PRIX DE VENTE & MODALITÉS DE RÈGLEMENT</h4>
        <p><strong>Prix convenu :</strong> <strong style="color: #059669;">${prop.price.toLocaleString('fr-FR')} FCFA</strong></p>
        <p><strong>Paiement :</strong> Réglé par ${method}. Reçu certifié avec séquestre sur Compte Marchand Gabon.</p>
      </div>
    `;
  }

  return `
    <div style="text-align: center; margin-bottom: 1rem;">
      <span class="lease-badge-ia"><i class="ri-robot-2-line"></i> CONTRAT DE BAIL GÉNÉRÉ PAR L'IA LOCAGABON</span>
      <h2>CONTRAT DE BAIL À USAGE D'HABITATION</h2>
      <small>Conforme à la Réglementation du Bail d'Habitation en République Gabonaise</small>
    </div>

    <div class="lease-section">
      <h4>ARTICLE 1 : DÉSIGNATION DES PARTIES</h4>
      <p><strong>Bailleur / Agence :</strong> ${prop.bailleur}</p>
      <p><strong>Locataire :</strong> Mme/M. KASSA Marc (Téléphone enregistré : ${phone})</p>
    </div>

    <div class="lease-section">
      <h4>ARTICLE 2 : OBJET DU CONTRAT & ÉQUIPEMENTS</h4>
      <p>Location à usage d'habitation exclusive du bien : <strong>${prop.title}</strong> situé à <strong>${prop.city}</strong>.</p>
      <p><strong>Raccordements :</strong> Compteur Électrique EDAN individuel et abonnement Eau SEEG conforme.</p>
    </div>

    <div class="lease-section">
      <h4>ARTICLE 3 : LOYER & CAUTION LÉGALE (PLAFOND GABON)</h4>
      <p><strong>Loyer Mensuel :</strong> <strong style="color: #059669;">${prop.price.toLocaleString('fr-FR')} FCFA</strong> payable avant le 5 de chaque mois par <em>Airtel Money (*150#) ou Moov Money (*555#)</em>.</p>
      <p><strong>Dépôt de Garantie (Caution Légale) :</strong> Fixée à <strong>${prop.cautionMois || 2} mois de loyer</strong> (soit ${cautionAmount.toLocaleString('fr-FR')} FCFA), strictement conforme au plafond légal gabonais.</p>
    </div>

    <div class="lease-section">
      <h4>ARTICLE 4 : DUREE DU BAIL & PRÉAVIS</h4>
      <p>Bail conclu pour une durée de 1 an renouvelable. Le locataire dispose d'un préavis légal de 1 à 3 mois pour donner congé par lettre ou notification numérique certifiée.</p>
    </div>

    <div class="lease-section" style="background: #f1f5f9; padding: 0.6rem; border-radius: 6px; font-size: 0.8rem;">
      <p><strong>Horodatage & Scellé IA :</strong> Document généré le ${currentDate} par LocaGabon AI. Valable sans signature manuscrite dès validation de la transaction Mobile Money.</p>
    </div>
  `;
}

function setupThreeStepPaymentSystem() {
  const btnGoToLease = document.getElementById("btnGoToAILeaseContract");
  const btnApproveLease = document.getElementById("btnApproveLeaseAndGoToPay");
  const btnFinalConfirm = document.getElementById("btnFinalConfirmPayment");
  const btnBackToStep1 = document.getElementById("btnBackToStep1");
  const btnBackToLease = document.getElementById("btnBackToLeaseStep");

  if (!btnGoToLease) return;

  btnGoToLease.addEventListener("click", () => {
    const phone = document.getElementById("payPhoneNumber").value.trim();
    const selectedMethod = document.querySelector('input[name="payMethod"]:checked').value;

    if ((selectedMethod === "airtel" || selectedMethod === "moov") && !phone) {
      alert("Veuillez saisir votre numéro de téléphone Mobile Money Gabon.");
      return;
    }

    let methodName = "Airtel Money Gabon (*150#)";
    if (selectedMethod === "moov") methodName = "Moov Money (*555#)";
    if (selectedMethod === "card") methodName = "Carte Bancaire Visa/Mastercard";
    if (selectedMethod === "transfer") methodName = "Virement Bancaire BGFI/UGB";

    const currentProp = state.activePropertyForPay;

    state.pendingPayData = {
      title: currentProp.title || currentProp.name || "Location / Service LocaGabon",
      amount: currentProp.price || currentProp.amount || 250000,
      phone: phone ? `+241 ${phone}` : "Compte Bancaire",
      method: methodName,
      bailleur: currentProp.bailleur || "Bailleur / Agence Pro",
      propObj: currentProp
    };

    const contractHTML = generateAILeaseContract(currentProp, state.pendingPayData.phone, methodName);
    document.getElementById("leaseContractContent").innerHTML = contractHTML;

    closeModal("paymentModal");
    openModal("leaseContractModal");
  });

  btnBackToStep1?.addEventListener("click", () => {
    closeModal("leaseContractModal");
    openModal("paymentModal");
  });

  btnApproveLease?.addEventListener("click", () => {
    const chk = document.getElementById("chkAcceptAILease");
    if (chk && !chk.checked) {
      alert("Veuillez cocher la case d'acceptation du contrat de bail pour continuer.");
      return;
    }

    const data = state.pendingPayData;
    document.getElementById("confirmTitleVal").textContent = data.title;
    document.getElementById("confirmAmountVal").textContent = `${data.amount.toLocaleString('fr-FR')} FCFA`;
    document.getElementById("confirmMethodVal").textContent = data.method;
    document.getElementById("confirmPhoneVal").textContent = data.phone;

    closeModal("leaseContractModal");
    openModal("paymentConfirmModal");
  });

  btnBackToLease?.addEventListener("click", () => {
    closeModal("paymentConfirmModal");
    openModal("leaseContractModal");
  });

  btnFinalConfirm?.addEventListener("click", () => {
    btnFinalConfirm.disabled = true;
    btnFinalConfirm.innerHTML = `<i class="ri-loader-4-line spin"></i> Envoi de la demande USSD sur votre mobile...`;

    setTimeout(() => {
      btnFinalConfirm.disabled = false;
      btnFinalConfirm.innerHTML = `<i class="ri-check-double-line"></i> Confirmer & Payer Maintenant`;

      const receiptId = `GAB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const data = state.pendingPayData;

      TENANT_RECEIPTS.unshift({
        id: receiptId,
        mois: "Août 2026",
        montant: `${data.amount.toLocaleString('fr-FR')} FCFA`,
        methode: data.method,
        date: new Date().toLocaleDateString('fr-FR')
      });

      adminFinancials.totalVolumeFCFA += data.amount;
      adminFinancials.commissionFCFA += Math.round(data.amount * COMMISSION_RATE);

      ADMIN_TRANSACTIONS.unshift({
        id: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
        bien: data.title,
        brut: data.amount,
        comm: Math.round(data.amount * COMMISSION_RATE),
        canal: data.method.split(" ")[0] + " Money",
        date: new Date().toLocaleDateString('fr-FR')
      });

      renderAdminDashboard();

      closeModal("paymentConfirmModal");
      openReceiptModal(receiptId, "Mme/M. KASSA Marc", data.bailleur, data.title, `${data.amount.toLocaleString('fr-FR')} FCFA`, data.method);
    }, 1200);
  });
}

function setupAuthModal() {
  const btnOpen = document.getElementById("btnOpenAuthModal");
  const modal = document.getElementById("authModal");
  const btnClose = document.getElementById("closeAuthModal");

  if (!modal) return;
  btnOpen?.addEventListener("click", () => openModal("authModal"));
  btnClose?.addEventListener("click", () => closeModal("authModal"));
}

function setupPricingAndContact() {
  const planBtns = document.querySelectorAll(".btn-select-plan");
  planBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const planName = btn.getAttribute("data-plan");
      if (planName.includes("Gratuit")) {
        alert("Formule Découverte sélectionnée.");
      } else {
        openPaymentModal({ title: planName, price: planName.includes("2 500") ? 2500 : 15000, bailleur: "LocaGabon Services", operation: "Location" });
      }
    });
  });
}

function setupSearchTabs() {
  const tabAI = document.getElementById("tabSmartAI");
  const tabFilter = document.getElementById("tabClassicFilter");
  if (!tabAI || !tabFilter) return;
  tabAI.addEventListener("click", () => {
    tabAI.classList.add("active");
    tabFilter.classList.remove("active");
    document.getElementById("aiSearchContainer").classList.remove("hidden");
    document.getElementById("classicFilterContainer").classList.add("hidden");
  });
  tabFilter.addEventListener("click", () => {
    tabFilter.classList.add("active");
    tabAI.classList.remove("active");
    document.getElementById("classicFilterContainer").classList.remove("hidden");
    document.getElementById("aiSearchContainer").classList.add("hidden");
  });
}

function setupAISearch() {
  const btn = document.getElementById("btnRunAISearch");
  if (btn) btn.addEventListener("click", () => renderProperties(INITIAL_PROPERTIES));
}

function setupClassicFilters() {
  const btn = document.getElementById("btnApplyClassicFilter");
  if (btn) btn.addEventListener("click", () => renderProperties(INITIAL_PROPERTIES));
}

function setupIAChat() {
  const btnSend = document.getElementById("btnSendChatMessage");
  if (btnSend) btnSend.addEventListener("click", () => alert("Assistant IA à votre service."));
}

function openPaymentModal(property) {
  state.activePropertyForPay = property;
  const payVal = document.getElementById("payAmountVal");
  if (payVal) payVal.textContent = `${(property.price || property.amount || 250000).toLocaleString('fr-FR')} FCFA`;
  openModal("paymentModal");
}

function openReceiptModal(id, tenant, landlord, address, amount, method) {
  document.getElementById("recIdVal").textContent = id;
  document.getElementById("recTenantName").textContent = tenant;
  document.getElementById("recLandlordName").textContent = landlord;
  document.getElementById("recAddress").textContent = address;
  document.getElementById("recAmount").textContent = amount;
  document.getElementById("recMethod").textContent = `Payé via ${method}`;
  openModal("receiptModal");
}

function initDashboardCharts() {
  if (typeof Chart === 'undefined') return;
  const ctxGrowth = document.getElementById('growthChart')?.getContext('2d');
  if (ctxGrowth) {
    new Chart(ctxGrowth, {
      type: 'line',
      data: {
        labels: ['Juin', 'Juillet', 'Août 2026'],
        datasets: [{ label: 'Inscriptions', data: [920, 1100, 1250], borderColor: '#10b981' }]
      }
    });
  }
}

function renderAdminDashboard() {
  const volEl = document.getElementById("adminTotalVolume");
  const commFcfaEl = document.getElementById("adminCommissionFCFA");
  const gabonBankEl = document.getElementById("adminGabonBankBalance");

  if (volEl) volEl.textContent = `${adminFinancials.totalVolumeFCFA.toLocaleString('fr-FR')} FCFA`;
  if (commFcfaEl) commFcfaEl.textContent = `${adminFinancials.commissionFCFA.toLocaleString('fr-FR')} FCFA`;
  if (gabonBankEl) gabonBankEl.textContent = `${adminFinancials.gabonBankBalanceFCFA.toLocaleString('fr-FR')} FCFA`;
}

function setupAdminGabonBankPayout() {
  const btnPayout = document.getElementById("btnTriggerGabonBankTransfer");
  if (btnPayout) btnPayout.addEventListener("click", () => alert("Virement exécuté !"));
}

function renderBailleurTable() {}
function renderTenantReceipts() {}

function setupModals() {
  document.getElementById("closePayModal")?.addEventListener("click", () => closeModal("paymentModal"));
  document.getElementById("closeLeaseModal")?.addEventListener("click", () => closeModal("leaseContractModal"));
  document.getElementById("closePayConfirmModal")?.addEventListener("click", () => closeModal("paymentConfirmModal"));
  document.getElementById("closeReceiptModal")?.addEventListener("click", () => closeModal("receiptModal"));
  document.getElementById("closePropertyDetailModal")?.addEventListener("click", () => closeModal("propertyDetailModal"));
}

function openModal(id) { document.getElementById(id)?.classList.remove("hidden"); }
function closeModal(id) { document.getElementById(id)?.classList.add("hidden"); }

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}
