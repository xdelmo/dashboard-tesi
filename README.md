# 🔹 ApexFlow - SaaS Enterprise Dashboard (Angular 19 + PrimeNG)

Applicazione gestionale Single Page Application (SPA) **ApexFlow**, basata su un modello di business **SaaS (Software as a Service)**, sviluppata con **Angular 19** e **PrimeNG**. Il progetto è progettato seguendo architetture enterprise moderne, focalizzate su performance, manutenibilità e un design system premium.

## 🚀 Funzionalità Principali

### 🔐 Autenticazione & Sicurezza

- **Reactive Login Flow:** Gestione accesso tramite **Reactive Forms** con validazione avanzata e feedback in tempo reale.
- **Role-Based Access Control (RBAC):** Gestione permessi granulare. Solo gli amministratori possono modificare lo stato dei clienti e accedere all'area Impostazioni.
  - `adminGuard`: Protezione delle rotte amministrative.
  - `customerModal`: Visualizzazione condizionale dei campi sensibili.
- **HTTP Interceptors:**
  - `AuthInterceptor`: Gestione centralizzata del token Bearer per ogni richiesta HTTP.
  - `ErrorInterceptor`: Gestione globale degli errori con notifiche toast tramite **PrimeNG MessageService**.

### ⚙️ Gestione & Manutenzione

- **Area Impostazioni (Admin Only):** Sezione protetta per la manutenzione del sistema.
- **Backup Dati:** Funzionalità di backup one-click che scarica un'istantanea completa del database (`db.json`) in formato JSON direttamente dal browser.

### 💼 Modello di Business (SaaS Domain)

L'applicazione simula una piattaforma gestionale per aziende tecnologiche:

- **Clienti (Anagrafica):**
  - Gestione di aziende con attributi specifici come `Industry` e `Subscription Plan`.
  - **Generazione ID Casuali:** Utilizzo di ID alfanumerici univoci a 16 caratteri (`IdGenerator`).
  - **Form Ottimizzato:** Creazione/Modifica semplificata con gestione implicita dei valori di business (es. Revenue).
- **Prodotti (Catalogo Servizi):**
  - **Gestione Completa:** Visualizzazione lista prodotti con stati (Attivo/Bozza) e dettagli completi.
- **Ordini & Transazioni:**
  - **Creazione Avanzata:** Modale ordini con selezione multipla dei prodotti.
  - **Metriche Finanziarie:** Calcolo dinamico del fatturato totale, MRR (Monthly Recurring Revenue) e crescita mensile basato sui dati reali.

### 📊 Dashboard & Analytics

- **Data Visualization:** Grafici dinamici tramite **PrimeNG Charts** (Chart.js wrapper) che mostrano dati finanziari in tempo reale basati sugli ordini effettivi.
- **Dynamic Filtering:** Possibilità di filtrare le statistiche di fatturato per anno (2024, 2025, 2026) con aggiornamento immediato del grafico.
- **Smart Stat Cards:** Indicatori di performance (KPI) reattivi basati sui dati del server.
- **PrimeNG Integration:** Utilizzo del tema **Aura** personalizzato e icone **PrimeIcons** per un'interfaccia coerente.

### 🛠 Architettura Tecnica

- **Signals & Control Flow:** Utilizzo delle ultime feature di Angular 19 (`signal`, `computed`, `effect`, `input`, `output`) e della nuova sintassi `@if` / `@for`. Esempio concreto nel `ProductDetailComponent` che utilizza `toSignal` per convertire i parametri della rotta.
- **UX/UI Components:** Implementazione di componenti riutilizzabili per **Empty States** e **Loading States** per garantire un'esperienza utente coerente in tutte le liste.
- **Reactive Architecture:** Componenti modulari con caricamento **Lazy Loading**.
- **Custom RxJS Operators:** Utilizzo di operatori custom (es. `notifySuccess`) per standardizzare il feedback utente e pulire il codice dei servizi.
- **CSS Strategy:** Gestione avanzata dei livelli CSS (`@layer`) per risolvere i conflitti tra **Tailwind CSS** e **PrimeNG**.
- **Shared Styles:** Design system centralizzato gestito tramite SCSS (`_forms.scss`, `_cards.scss`, `_loading.scss`).
- **Quality Assurance:** Suite di Unit Test completa per `AuthService` utilizzando **Jasmine** e **Karma**, con mocking delle dipendenze HTTP (`provideHttpClientTesting`) e verifica dei flussi asincroni reattivi (`Observable`).

---

## 🛠 Tech Stack

- **Framework:** [Angular 19](https://angular.dev/)
- **UI Library:** [PrimeNG v19+](https://primeng.org/) (Theme: Aura)
- **Styling:** Tailwind CSS + SCSS Modules
- **State Management:** Angular Signals & RxJS
- **Visualizzazione Dati:** PrimeNG Charts (Chart.js)
- **Tooling:** Angular CLI, JSON Server (Mock API)

---

## 📂 Struttura del Progetto

```text
src/app/
├── core/           # Singleton: Auth, Services, Guards, Interceptors, Models
├── shared/         # Reusable: Components (Cards, Tables, Charts), Styles, Pipes
└── features/       # Modules: Dashboard, Customers, Login (Lazy Loaded)
```

---

## ▶️ Setup & Installazione Locale

1.  **Clona il repository:**
    ```bash
    git clone https://github.com/xdelmo/dashboard-tesi.git
    ```
2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```
3.  **Avvia il Mock Server (Terminale 1):**
    Il server simula un'API REST persistente su `http://localhost:3000`
    ```bash
    npm run server
    ```
4.  **Avvia l'applicazione Angular (Terminale 2):**
    ```bash
    ng serve
    ```
5.  **Accedi:** Vai su `http://localhost:4200`

### 🔑 Credenziali Demo

**Admin:**

- **Email:** `admin@demo.com`
- **Password:** `password`
- _Accesso completo a tutte le funzionalità e modifica dati._

**Utente Standard:**

- **Email:** `user@demo.com`
- **Password:** `password`
- _Visualizzazione limitata (es. no modifica fatturato/stato)._

---

**Autore:** Emanuele Del Monte  
**Progetto:** Advanced Web Development / Tesi Dashboard Reattiva
