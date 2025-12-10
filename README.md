# 🔹 Enterprise Dashboard (Angular 19)

Applicazione gestionale Single Page Application (SPA) sviluppata con **Angular 19**, progettata seguendo architetture Enterprise modulari e scalabili.
Il progetto dimostra l'utilizzo avanzato di **RxJS**, **Lazy Loading**, **Authentication Flows** e **Data Visualization**.

## 🚀 Funzionalità Chiave

### 🔐 Autenticazione & Sicurezza

- **Login Flow:** Gestione accesso con validazione form e feedback utente.
- **Guards:**
  - `AuthGuard`: Protegge le rotte private (Dashboard, Clienti).
  - `PublicGuard`: Impedisce l'accesso al login agli utenti già autenticati.
- **Simulazione Backend:** AuthService basato su `Observable` e `BehaviorSubject` con delay artificiale per simulare latenza di rete.

### 📊 Dashboard & Analytics

- Integrazione di **Chart.js** (tramite `ng2-charts`) per la visualizzazione dati.
- Stat Cards riutilizzabili (Componenti "Dumb" con `@Input`).
- Layout Responsivo con Sidebar e Header fissi.

### 👥 Gestione Anagrafiche (CRUD)

- Tabella clienti con rendering ottimizzato.
- **Modulo Separato:** La feature "Customers" è caricata in **Lazy Loading** per performance ottimali.
- **Reactive Forms & Template Driven:** Validazione avanzata degli input con feedback visivo immediato.

### 🎨 UI/UX & Layout Moderno

- **Sidebar Dinamica:** Sidebar collassabile intelligente che mostra solo le icone a riposo e si espande fluidamente (80px -> 260px) al passaggio del mouse.
- **Micro-interactions:** Transizioni curate per hover, focus e cambi di stato per un'esperienza utente reattiva e "premium".
- **Design System:** Palette colori professionale, tipografia bilanciata e utilizzo consistente di spaziature e ombreggiature.
- **Iconografia:** Integrazione completa con **Material Icons** per una navigazione intuitiva.

---

## 🛠 Tech Stack

- **Framework:** Angular 19
- **Linguaggio:** TypeScript 5.x
- **Stili:** SCSS (Architettura modulare con Partials e BEM-like naming)
- **Librerie:** ng2-charts, Chart.js
- **Tooling:** Angular CLI, RxJS

---

## 📂 Architettura del Progetto

La struttura segue le best practices per la scalabilità:

- `src/app/core`: Servizi singleton (Auth, Data), Guard, Interfacce, Costanti.
- `src/app/shared`: Componenti riutilizzabili (Cards, Charts), Direttive, Pipe.
- `src/app/features`: Moduli funzionali (Dashboard, Customers, Login) caricati in lazy loading.

---

## ▶️ Come Avviare il Progetto

1.  **Clona il repository:**
    ```bash
    git clone [https://github.com/xdelmo/dashboard-tesi.git](https://github.com/xdelmo/dashboard-tesi.git)
    ```
2.  **Installa le dipendenze:**
    ```bash
    npm install
    # Nota: Se richiesto, usare --legacy-peer-deps per ng2-charts
    npm install --legacy-peer-deps
    ```
3.  **Avvia il server di sviluppo:**
    ```bash
    ng serve
    ```
4.  **Accedi:** Vai su `http://localhost:4200`

### 🔑 Credenziali Demo

- **Email:** `admin@demo.com`
- **Password:** `password`

---

**Autore:** Emanuele Del Monte
