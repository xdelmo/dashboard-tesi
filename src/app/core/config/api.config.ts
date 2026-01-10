import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  get baseUrl(): string {
    return environment.apiUrl;
  },
};
