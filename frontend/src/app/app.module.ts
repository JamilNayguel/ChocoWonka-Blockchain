import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from 'primeng/api';
import { PagesModule } from './pages/pages.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [	
    AppComponent,
    // PagesComponent,
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    // SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // PagesModule,
    CommonModule,
    ReactiveFormsModule,
    
],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
