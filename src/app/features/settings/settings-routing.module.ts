import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingListComponent } from './pages/setting-list/setting-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: SettingListComponent },
  { path: 'users', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
