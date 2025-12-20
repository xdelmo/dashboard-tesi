# 🔹 Enterprise Dashboard (Angular 19)

Applicazione gestionale Single Page Application (SPA) sviluppata con **Angular 19**, progettata seguendo architetture Enterprise modulari e scalabili.
Il progetto dimostra l'utilizzo avanzato di **Signals**, **RxJS**, **Lazy Loading**, **Authentication Flows** e **Data Visualization**.

## 🚀 Funzionalità Chiave

### 🔐 Autenticazione & Sicurezza

- **Login Flow:** Gestione accesso con validazione form e feedback utente.
- **Signals:** Utilizzo delle nuove primitive reattive di Angular (`signal`, `computed`, `effect`) per la gestione dello stato moderna e performante.
- **Guards:**
  - `AuthGuard`: Protegge le rotte private (Dashboard, Clienti).
  - `PublicGuard`: Impedisce l'accesso al login agli utenti già autenticati.

### 🌐 Backend Mock (JSON Server)

- Integrazione di **JSON Server** per simulare un'API REST completa.
- Dataset persistente su file `db.json`.
- Script dedicato per avviare il server mock in parallelo all'app.

### 📊 Dashboard & Analytics

- Integrazione di **Chart.js** (tramite `ng2-charts`) per la visualizzazione dati.
- Stat Cards riutilizzabili (Componenti "Dumb" ottimizzati).
- Layout Responsivo con Sidebar e Header fissi.

### 👥 Gestione Anagrafiche (CRUD Completo)
**Aggiornato:** Il sistema implementa un ciclo di vita completo per la gestione clienti, interamente reattivo:

- **Create:** Modale di inserimento con validazione.
- **Read:**
  - Lista tabellare con indicatori di stato.
  - Pagina di dettaglio cliente (`/customers/:id`) con routing dedicato.
- **Update:** Modifica dati esistenti riutilizzando la modale intelligente (pre-compilazione tramite Signals).
- **Delete:** Rimozione sicura dei record.
- **Architettura:** Logica separata in `CustomerService` dedicato per una maggiore pulizia del codice.

### ⚠️ Limitazioni Demo Online (Vercel)
L'applicazione deployata utilizza **My JSON Server** come backend mock.
> **Nota:** Questo servizio è **stateless** (sola lettura persistente). Le operazioni di modifica (POST, PUT, DELETE) vengono simulate con successo (risposta 200 OK) e riflesse nella UI locale, ma **non modificano realmente il database remoto**. Ricaricando la pagina, i dati torneranno allo stato originale.
>
> Per testare la persistenza reale, avviare il progetto in locale con `npm run server` (che scrive sul file `db.json`).

### 🎨 UI/UX & Layout Moderno

- **Sidebar Dinamica:** Sidebar collassabile intelligente che mostra solo le icone a riposo e si espande fluidamente al passaggio del mouse.
- **Micro-interactions:** Transizioni curate per hover, focus e cambi di stato per un'esperienza utente "premium".
- **Design System:** Palette colori professionale, tipografia bilanciata e utilizzo consistente di spaziature.
- **Iconografia:** Integrazione completa con **Material Icons**.

---

## 🛠 Tech Stack

- **Framework:** Angular 19
- **Core:** Signals, RxJS
- **Linguaggio:** TypeScript 5.x
- **Stili:** SCSS (Architettura modulare con Partials e BEM-like naming)
- **Visualizzazione Dati:** ng2-charts, Chart.js
- **Tooling:** Angular CLI, JSON Server

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
    git clone https://github.com/xdelmo/dashboard-tesi.git
    ```
2.  **Installa le dipendenze:**
    ```bash
    npm install
    # Nota: Se richiesto, usare --legacy-peer-deps per ng2-charts
    npm install --legacy-peer-deps
    ```
3.  **Avvia il Mock Server (Terminale 1):**
    Questo avvierà l'API simulata su `http://localhost:3000`
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
