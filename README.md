# Dashboard Gestionale (Angular 19 + RxJS)

Progetto di tesi sperimentale per il corso di Laurea in Ingegneria Informatica.
L'applicazione è una Single Page Application (SPA) che simula un pannello di gestione clienti Enterprise.

## 🚀 Tecnologie Utilizzate

- **Framework:** Angular 19 (Component-based architecture)
- **State Management:** RxJS (BehaviorSubject, Observable streams)
- **Styling:** SCSS con design responsive personalizzato
- **Routing:** Lazy Loading dei moduli per ottimizzazione performance

## 🏗 Architettura

Il progetto segue una struttura modulare scalabile:

- `Core Module`: Servizi Singleton, Interfacce e Mock Data.
- `Shared Module`: Componenti UI riutilizzabili.
- `Features Modules`: Logica di business specifica (es. Dashboard), caricata in Lazy Loading.

## 💡 Key Features

- **Gestione Asincrona:** Utilizzo di `AsyncPipe` per la gestione automatica delle sottoscrizioni e prevenzione memory leaks.
- **Mock API:** Simulazione di latenza di rete tramite operatori RxJS (`delay`, `of`).
- **Data Visualization:** Tabella interattiva con rendering condizionale basato sullo stato dei dati.

## 📦 Come avviare il progetto

1.  Clona il repository:
    ```bash
    git clone [https://github.com/xdelmo/dashboard-tesi.git](https://github.com/xdelmo/dashboard-tesi.git)
    ```
2.  Installa le dipendenze:
    ```bash
    npm install
    ```
3.  Avvia il server di sviluppo:
    ```bash
    ng serve
    ```
4.  Apri il browser su `http://localhost:4200`
