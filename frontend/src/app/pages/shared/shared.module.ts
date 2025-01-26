import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importa FormsModule


import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,CalendarModule,
    TableModule,ReactiveFormsModule,
    FormsModule, DataViewModule,
    DialogModule,InputNumberModule,
    InputTextModule,PasswordModule,
    DropdownModule,
  ],
  declarations: [ SharedComponent, FooterComponent,
                  HeaderComponent, NavbarComponent,
  ],
  exports:[
    FooterComponent,HeaderComponent,
    NavbarComponent,

    CalendarModule,ReactiveFormsModule,
    FormsModule, TableModule,
    DataViewModule,InputNumberModule,
    DialogModule,InputTextModule,
    PasswordModule,DropdownModule,
  ]
})
export class SharedModule { }
