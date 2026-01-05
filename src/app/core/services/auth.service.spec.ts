import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { API_CONFIG } from '../config/api.config';

// 'describe' definisce una suite di test (un gruppo di test correlati)
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController; // Il nostro finto gestore di richieste HTTP
  let routerSpy: jasmine.SpyObj<Router>; // Una "spia" sul router per controllare i redirect senza navigare davvero

  // 'beforeEach' viene eseguito PRIMA di OGNI singolo test ('it').
  // Serve a resettare l'ambiente per garantire che i test non si influenzino a vicenda.
  beforeEach(() => {
    // 1. Puliamo il LocalStorage per partire da zero
    localStorage.clear();

    // 2. Creiamo un oggetto "Spia" per il Router.
    // Non vogliamo navigare davvero nel browser durante i test, vogliamo solo sapere SE il metodo 'navigate' viene chiamato.
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    // 3. Configuriamo il modulo di test (TestBed) come se fosse un @NgModule
    TestBed.configureTestingModule({
      providers: [
        AuthService, // Il servizio che stiamo testando
        provideHttpClient(), // Fornisce le funzionalità HTTP base
        provideHttpClientTesting(), // Intercetta le chiamate HTTP reali e ci permette di risponderci noi (Mocking)
        { provide: Router, useValue: spy }, // Quando il service chiede il Router, dagli la nostra spia
      ],
    });

    // 4. Iniettiamo le istanze configurate per usarle nei test
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  // 'afterEach' viene eseguito DOPO ogni test.
  afterEach(() => {
    httpMock.verify(); // Verifica finale: Assicurati che non ci siano richieste HTTP in sospeso non gestite.
    localStorage.clear(); // Pulizia finale
  });

  // --- I TEST ---

  // Test 1: Sanity Check
  it('dovrebbe essere creato correttamente', () => {
    expect(service).toBeTruthy(); // Verifica che l'istanza del servizio esista
  });

  // Test 2: Login con successo
  it('dovrebbe effettuare il login con credenziali corrette', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        email: 'admin@demo.com',
        password: 'password',
        name: 'Admin',
        role: 'admin',
      },
    ];

    // 1. Chiamiamo il metodo login vero.
    service.login('admin@demo.com', 'password').subscribe((user) => {
      // 3. Queste aspettative ("expect") vengono verificate IMMEDIATAMENTE dopo il flush
      expect(user).toBeTruthy();
      expect(user?.email).toBe('admin@demo.com');
      expect(service.isLoggedIn()).toBeTrue(); // Verifica che il signal sia stato aggiornato
    });

    // 2. Intercettiamo la richiesta HTTP che il servizio ha appena lanciato
    const req = httpMock.expectOne(`${API_CONFIG.baseUrl}/users`);
    expect(req.request.method).toBe('GET'); // Verifichiamo che sia una GET

    // 3. Rispondiamo noi alla richiesta ("flush") con i nostri dati finti (mockUsers).
    // Questo innesca la subscribe qui sopra in modo sincrono.
    req.flush(mockUsers);
  });

  // Test 3: Login fallito
  it('dovrebbe fallire il login con credenziali errate', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        email: 'admin@demo.com',
        password: 'password',
        name: 'Admin',
        role: 'admin',
      },
    ];

    service.login('wrong@email.com', 'wrongpass').subscribe((user) => {
      expect(user).toBeUndefined(); // Ci aspettiamo che l'utente sia null/undefined
      expect(service.isLoggedIn()).toBeFalse(); // Il signal deve rimanere false
    });

    const req = httpMock.expectOne(`${API_CONFIG.baseUrl}/users`);
    req.flush(mockUsers); // Ritorniamo comunque la lista utenti, ma la logica del service filtrerà e non troverà corrispondenza
  });

  // Test 4: Ruolo Admin
  it('dovrebbe ritornare true per isAdmin se il ruolo utente è admin', () => {
    // Creiamo un utente mock con ruolo 'admin'
    const adminUser = {
      id: 1,
      email: 'a',
      password: 'p',
      name: 'A',
      role: 'admin',
    };

    // Eseguiamo il login per settare lo stato interno del servizio
    service.login('a', 'p').subscribe();

    // Gestiamo la richiesta HTTP simulata
    const req = httpMock.expectOne(`${API_CONFIG.baseUrl}/users`);
    req.flush([adminUser]); // Rispondiamo con l'utente admin

    // Verifichiamo che il metodo isAdmin() ritorni true
    expect(service.isAdmin()).toBeTrue();
  });

  // Test 5: Logout
  it('dovrebbe effettuare il logout e reindirizzare al login', () => {
    // Non serve fakeAsync qui perché logout() è sincrono (non ha delay o chiamate HTTP)
    service.logout();

    expect(service.isLoggedIn()).toBeFalse(); // Signal deve essere false
    expect(service.currentUser()).toBeNull(); // Signal utente deve essere null

    // Verifichiamo che la spia del router abbia registrato una chiamata verso '/login'
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
