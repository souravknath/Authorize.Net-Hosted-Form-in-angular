import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptComponent } from './receipt/receipt.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'receipt', component: ReceiptComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
