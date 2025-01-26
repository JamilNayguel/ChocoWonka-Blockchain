import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { LoginComponent } from './login/login.component';
// ../shared/fire-map/fire-map.component
const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'inicio',component: DashboardComponent },
    { path: 'login',component: LoginComponent },
    { path: 'transaccion',component: TransactionComponent },
    { path: 'list-transactions',component: TransactionListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ComponentRoutingModule { 
  
}