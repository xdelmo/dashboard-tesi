import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SharedModule } from '../../shared/shared.module';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [{ path: '', component: ProductListComponent }];

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    ButtonModule,
    TagModule,
    RouterModule.forChild(routes),
  ],
})
export class ProductsModule {}
