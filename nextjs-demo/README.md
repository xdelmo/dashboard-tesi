# 🚀 Next.js Dashboard Demo

Questa è una **Mini Applicazione** costruita con **Next.js 16+ (App Router)**, **TypeScript**, e **Tailwind CSS**.
Replica le funzionalità principali di una Dashboard CRM per dimostrare competenze nello sviluppo React moderno, con un focus su Server Components e Server Actions.

## ✨ Funzionalità Chiave

- **Next.js App Router**: Utilizza il moderno paradigma di routing (Server Components di default).
- **Server Actions**: Gestisce l'invio dei form (Login, CRUD Clienti) interamente sul server senza creare API REST manuali.
- **Autenticazione Mock Sicura**:
  - Sistema basato su **Cookie HttpOnly**.
  - Token simulato (Base64) per mimare l'autenticazione JWT.
  - **Middleware** personalizzato per proteggere le rotte sensibili.
- **Data Visualization**: Grafici interattivi implementati con `chart.js` e `react-chartjs-2`.
- **Tailwind CSS**: Styling moderno e responsivo, coerente con il design system del progetto.
- **Persistenza Dati**: Utilizza `json-server` (`data/db.json`) per simulare un database backend REST reale.

## 🛠️ Stack Tecnologico

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Linguaggio**: TypeScript
- **Styling**: Tailwind CSS v4
- **Librerie UI**: PrimeIcons, Chart.js
- **Font**: Google Fonts (Poppins)

## 📦 Come Avviare il Progetto

1.  **Installa le Dipendenze**:

    ```bash
    npm install
    ```

2.  **Avvia il Backend Mock (JSON Server)**:
    In un terminale separato, avvia il server dati:

    ```bash
    npm run server
    ```

    _Il server girerà su `http://localhost:3001`_

3.  **Avvia l'Applicazione Next.js**:

    ```bash
    npm run dev
    ```

4.  **Apri il Browser**:
    Visita `http://localhost:3000`.

## 🔐 Credenziali di Accesso

Usa le seguenti credenziali di test per accedere:

- **Email**: `admin@demo.com`
- **Password**: `password`

## 📂 Struttura del Progetto

- `app/(dashboard)`: Rotte protette (Dashboard, Clienti) che condividono il layout con Sidebar.
- `app/login`: Rotta pubblica di login.
- `app/actions`: Server Actions per la logica di business e mutazioni dati.
- `components`: Componenti UI riutilizzabili (Sidebar, Form, Chart).
- `lib`: Layer di accesso ai dati (chiamate fetch tipizzate verso json-server).
