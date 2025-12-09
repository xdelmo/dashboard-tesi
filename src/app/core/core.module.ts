import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, MainLayoutComponent],
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  exports: [LoginComponent],
})
export class CoreModule {}
