import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingListComponent } from './pages/setting-list/setting-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [SettingListComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedModule, ButtonModule],
})
export class SettingsModule {}
