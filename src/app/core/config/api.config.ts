import { isDevMode } from '@angular/core';

export const API_CONFIG = {
  get baseUrl(): string {
    if (isDevMode()) {
      return 'http://localhost:3000';
    } else {
      return 'https://my-json-server.typicode.com/xdelmo/dashboard-tesi';
    }
  },
};
