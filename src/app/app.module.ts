import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReceiptComponent } from './receipt/receipt.component';
@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [ { provide: Window, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
