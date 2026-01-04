# 🔹 SaaS Enterprise Dashboard (Angular 19 + PrimeNG)

Applicazione gestionale Single Page Application (SPA) basata su un modello di business **SaaS (Software as a Service)**, sviluppata con **Angular 19** e **PrimeNG**. Il progetto è progettato seguendo architetture enterprise moderne, focalizzate su performance, manutenibilità e un design system premium.

## 🚀 Funzionalità Principali

### 🔐 Autenticazione & Sicurezza

- **Reactive Login Flow:** Gestione accesso tramite **Reactive Forms** con validazione avanzata e feedback in tempo reale.
- **HTTP Interceptors:**
  - `AuthInterceptor`: Gestione centralizzata del token Bearer per ogni richiesta HTTP.
  - `ErrorInterceptor`: Gestione globale degli errori con notifiche toast tramite **PrimeNG MessageService**.

### 💼 Modello di Business (SaaS Domain)

L'applicazione simula una piattaforma gestionale per aziende tecnologiche:

- **Clienti (Anagrafica):** Gestione di aziende con attributi specifici come `Industry` e `Subscription Plan` (Basic, Professional, Enterprise).
- **Ordini:** Monitoraggio di transazioni storiche, rinnovi di abbonamenti e servizi professionali.
- **Metriche Finanziarie:** Calcolo dinamico del fatturato totale, MRR (Monthly Recurring Revenue) e crescita mensile.

### 📊 Dashboard & Analytics

- **Data Visualization:** Grafici dinamici tramite `Chart.js` e `ng2-charts` che mostrano 12 mesi di dati finanziari.
- **Smart Stat Cards:** Indicatori di performance (KPI) reattivi basati sui dati del server.
- **PrimeNG Integration:** Utilizzo del tema **Aura** personalizzato e icone **PrimeIcons** per un'interfaccia coerente.

### 🛠 Architettura Tecnica

- **Signals & Control Flow:** Utilizzo delle ultime feature di Angular 19 (`signal`, `computed`, `effect`) e della nuova sintassi `@if` / `@for`.
- **Reactive Architecture:** Componenti modulari con caricamento **Lazy Loading**.
- **CSS Strategy:** Gestione avanzata dei livelli CSS (`@layer`) per risolvere i conflitti tra **Tailwind CSS** e **PrimeNG**.
- **Shared Styles:** Design system centralizzato gestito tramite SCSS (`_forms.scss`, `_cards.scss`).

---

## 🛠 Tech Stack

- **Framework:** [Angular 19](https://angular.dev/)
- **UI Library:** [PrimeNG v19](https://primeng.org/) (Theme: Aura)
- **Styling:** Tailwind CSS + SCSS Modules
- **State Management:** Angular Signals & RxJS
- **Visualizzazione Dati:** ng2-charts / Chart.js
- **Tooling:** Angular CLI, JSON Server (Mock API)

---

## 📂 Struttura del Progetto

```text
src/app/
├── core/           # Singleton: Auth, Services, Guards, Interceptors, Models
├── shared/         # Reusable: Components (Cards, Tables), Styles, Pipes
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

- **Email:** `admin@demo.com`
- **Password:** `password`

---

**Autore:** Emanuele Del Monte  
**Progetto:** Advanced Web Development / Tesi Dashboard Reattiva
