# 🚀 Next.js Dashboard Demo

Questa è una **Mini Applicazione** costruita con **Next.js 16+ (App Router)**, **TypeScript**, e **Tailwind CSS**.
Replica le funzionalità principali di una Dashboard CRM per dimostrare competenze nello sviluppo React moderno, con un focus su Server Components, Server Actions e un'esperienza utente raffinata.

## ✨ Funzionalità Chiave

- **Next.js App Router**: Utilizza il moderno paradigma di routing (Server Components di default).
- **Server Actions**: Gestisce l'invio dei form (Login, CRUD Clienti).
- **Data Visualization**: Grafici interattivi implementati con `chart.js` e `react-chartjs-2`.
- **Dettaglio Ordini**: Pagina di dettaglio per ogni ordine con riepilogo finanziario completo e stato tramite componenti riutilizzabili (`StatusBadge`).
- **Autenticazione Mock**: Sistema sicuro basato su Cookie HttpOnly per simulare un login reale.
- **Styling Moderno**: Design pulito e professionale con **Tailwind CSS v4**.
- **Flessibilità Backend**:
  - **Locale**: Utilizza `json-server` per sviluppo locale con persistenza su file.
  - **Deploy**: Predisposto per **Netlify** con supporto a `my-json-server` per demo live.

## 🛠️ Stack Tecnologico

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Linguaggio**: TypeScript
- **Styling**: Tailwind CSS v4
- **Librerie UI**: PrimeIcons, Chart.js
- **Tooling**: json-server, Netlify Adapter

## 📦 Come Avviare il Progetto (Locale)

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

## 🚀 Demo Live

L'applicazione è deployata e accessibile qui:
👉 **[https://dashboard-tesi-nextjs-demo.netlify.app/](https://dashboard-tesi-nextjs-demo.netlify.app/)**

_Nota: Il deploy utilizza `my-json-server` per i dati mock._

## 🔐 Credenziali di Accesso

Usa le seguenti credenziali di test per accedere:

- **Email**: `admin@demo.com`
- **Password**: `password`

## 📂 Struttura del Progetto

- `app/(dashboard)`: Rotte protette (Dashboard, Clienti, Ordini, Prodotti) con layout condiviso.
- `app/login`: Rotta pubblica di login.
- `app/actions`: Server Actions per la logica di business e mutazioni dati.
- `components`: Componenti UI riutilizzabili (`StatusBadge`, `StatCard`, `Sidebar`, `RevenueChart`).
- `lib`: Layer di accesso ai dati (incluso client API tipizzato).
- `data/db.json`: Mock database.
