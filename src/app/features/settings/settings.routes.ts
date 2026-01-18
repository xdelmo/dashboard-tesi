import { Routes } from '@angular/router';
import { SettingListComponent } from './pages/setting-list/setting-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const SETTINGS_ROUTES: Routes = [
  { path: '', component: SettingListComponent },
  { path: 'users', component: UserListComponent },
];
