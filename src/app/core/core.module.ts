import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Avatar } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { LoginComponent } from './auth/pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderProfileComponent } from './layout/components/header-profile/header-profile.component';

@NgModule({
  declarations: [LoginComponent, MainLayoutComponent, HeaderProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterModule,
    Button,
    Avatar,
    Menu,
  ],
  exports: [LoginComponent],
})
export class CoreModule {}
