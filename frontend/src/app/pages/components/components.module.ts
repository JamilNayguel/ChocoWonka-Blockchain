import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRoutingModule } from './components.routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,ComponentRoutingModule,
    SharedModule,
  ],
  declarations: [DashboardComponent, TransactionComponent, TransactionListComponent, LoginComponent],

  exports:[
    DashboardComponent, TransactionComponent, TransactionListComponent, SharedModule,LoginComponent,
  ]

})
export class ComponentsModule { }
