import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Avatar } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Message } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderProfileComponent } from './layout/components/header-profile/header-profile.component';

import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [MainLayoutComponent, HeaderProfileComponent, SidebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
    Button,
    InputText,
    Password,
    Message,
    Avatar,
    Menu,
    AccordionModule,
  ],
})
export class CoreModule {}
