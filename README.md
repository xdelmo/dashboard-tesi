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

### 🌍 Interfaccia Pubblica

- **Landing Page (Demo Gateway):** Nuova pagina di benvenuto (`/welcome`) presentata come gateway per la "Live Demo".
  - Design premium (Light/Glassmorphism).
  - Footer standalone componentizzato.
  - Percorsi diretti per GitHub e Login Demo.

### ⚙️ Gestione & Manutenzione

- **Area Impostazioni (Admin Only):** Sezione protetta per la manutenzione del sistema.
- **Gestione Utenti:** Interfaccia dedicata (`/settings/users`) per visualizzare gli utenti registrati e modificarne i ruoli (Admin/User).
- **Backup Dati:** Funzionalità di backup one-click che scarica un'istantanea completa del database (`db.json`) in formato JSON direttamente dal browser.

### 💼 Modello di Business (SaaS Domain)

L'applicazione simula una piattaforma gestionale per aziende tecnologiche:

- **Clienti (Anagrafica):**
  - Gestione di aziende con attributi specifici come `Industry` e `Subscription Plan`.
  - **Soft Delete:** Eliminazione logica (stato "Inattivo") per preservare lo storico degli ordini collegati.
  - **Generazione ID Casuali:** Utilizzo di ID alfanumerici univoci a 16 caratteri (`IdGenerator`).
  - **Form Ottimizzato:** Creazione/Modifica semplificata con gestione implicita dei valori di business (es. Revenue).
- **Prodotti (Catalogo Servizi):**
  - **Gestione Completa:** Visualizzazione lista prodotti, dettaglio servizio (`/products/:id`) e modifica stato rapida.
  - **Soft Delete:** Supporto per disattivazione prodotti ("Disattivato") mantenendoli visibili negli ordini storici.
- **Ordini & Transazioni:**
  - **Creazione Avanzata:** Modale ordini reattivo basato su **Signals** con selezione multipla prodotti e **quantità variabile**.
  - **Financial Engine:** Logica integrata per calcolo Subtotale, Sconti Piano (0%, 10%, 20%) e **IVA automatica (11%)**.
  - **Metriche Real-Time:** Dashboard collegata ai dati reali per calcolo fatturato e KPI.

### 📊 Dashboard & Analytics

- **Data Visualization:** Grafici dinamici tramite **PrimeNG Charts** collegati all'`OrderService`.
- **KPI Reattivi:** Card statistiche aggiornate in tempo reale (es. "Fatturato Totale" calcolato al centesimo).
- **PrimeNG Integration:** Utilizzo del tema **Aura** personalizzato e icone **PrimeIcons**.

### 🛠 Architettura Tecnica

- **Angular Signals (Core):** Migrazione estensiva a Signals per componenti chiave (`OrderDetail`, `OrderModal`, `ProductDetail`). Eliminazione di RxJS subscriptions manuali e pipe `async`.
- **Hybrid Reactivity:** Utilizzo di `toSignal` e `toObservable` per il bridging tra form reattivi e segnali.
- **Custom RxJS Operators:** Utilizzo di operatori custom (es. `notifySuccess`) per standardizzare il feedback.
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

## 🔗 Backend Integration (WIP)

Esiste un repository separato per il backend sviluppato con **Spring Boot**, attualmente in fase di sviluppo (Work in Progress).
Il backend replicherà le funzionalità simulate attualmente dal JSON Server.

👉 **Repository Backend:** [github.com/xdelmo/backend-tesi](https://github.com/xdelmo/backend-tesi)

---

## 📂 Struttura del Progetto

```text
src/app/
├── core/           # Singleton: Auth, Services, Guards, Interceptors, Models
├── shared/         # Reusable: Components (Cards, Tables, Charts), Styles, Pipes
├── public/         # Public: Landing Page, Login, Footer (Accessible without Auth)
└── features/       # Modules: Dashboard, Customers, Produtcs (Lazy Loaded)
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
