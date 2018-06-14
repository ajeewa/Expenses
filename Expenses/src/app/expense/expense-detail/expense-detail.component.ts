import { Component, OnInit } from '@angular/core';
import { IExpense } from '../../models/expense';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../../expense.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  expense: IExpense;
  statusMessage:string;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _expenseService: ExpenseService
  ) { }

  ngOnInit() {
    let expenseID=this._activatedRoute.snapshot.params['id'];
    this._expenseService.getExpense(expenseID).subscribe(
      (expData) => this.expense=expData,
      (error) =>{
        this.statusMessage="Nurtz";
        console.log(error);
      }
    );
  }

}
