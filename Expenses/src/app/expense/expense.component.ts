import { Component, OnInit } from '@angular/core';
import { IExpense } from '../models/expense';
import { ExpenseService } from '../expense.service';



@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  myExpenses: IExpense[];
  
 
  
  constructor(private _expenseService: ExpenseService) 
  { 

  }
  
  

  ngOnInit() {
  
    this._expenseService.getExpenseList().subscribe((expenseData)=>this.myExpenses=expenseData);

  
  }

}
