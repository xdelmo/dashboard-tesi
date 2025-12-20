import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Customer } from '../../../../core/models/customer.model';
import { CustomerService } from '../../../../core/services/customer.service';

@Component({
  selector: 'app-customer-detail',
  standalone: false,
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit {
  customer$!: Observable<Customer>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    // Utilizziamo switchMap per gestire il cambio di parametro ID nell'URL
    this.customer$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.customerService.getCustomer(id);
      })
    );
  }

  deleteCustomer(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo cliente?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }
}


