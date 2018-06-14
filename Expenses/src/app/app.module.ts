import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';


import { AppComponent } from './app.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseService } from './expense.service';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseDetailComponent } from './expense/expense-detail/expense-detail.component';


const appRoutes: Routes = [
  {path: 'form',component: ExpenseFormComponent},
  {path: 'expenses', component:ExpenseComponent},
  {path: 'expenses/:id', component:ExpenseDetailComponent },
  {path: 'edit/:id',component:ExpenseFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    ExpenseFormComponent,
    ExpenseDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
