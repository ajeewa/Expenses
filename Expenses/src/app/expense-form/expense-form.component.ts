import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { ExpenseService } from '../expense.service';
import { IExpense } from '../models/expense';
import { NgForm } from '@angular/forms/';


@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {

  //expense={};
  expense: IExpense;
  id;

  constructor(
    //private router: Router,
    private route: ActivatedRoute,
    private expenseService: ExpenseService


  ) {

   //  this.route.snapshot.paramMap.get('id');
     //if(this.id) return 0;//this.expenseService.get(this.id).take(1).subscribe(p=> this.expense=p);

   }
   save(form:NgForm){
      if(form.value.ID == null){
        console.log("Posting");
        this.expenseService.postExpense(form.value)
        .subscribe(data => {
            this.resetForm(form);
            this.expenseService.getExpenseList();
            //alert('saved!');
        });
      }
      else{
        console.log(form.value.ID);
        this.expenseService.putExpense(form.value.ID,form.value).subscribe(data =>{
            this.expenseService.getExpenseList();
        });
      }
    console.log(form.value);

   }
  // save(expense:IExpense){
  //     ///console.log("Saved");
  //     console.log(expense);
      
  // }

  resetForm(form?: NgForm){
    if(form !=null)
      form.reset()

    this.expense={ID:null,Name:'',Cost:0,ExpenseDate:null};
  
    
  }

  ngOnInit() {

    this.resetForm();
    let expenseID=this.route.snapshot.params['id'];
    if(expenseID!=null){
      //console.log("Nurt!!!")
      this.expenseService.getExpense(expenseID).subscribe(
        (expData) => {
          this.expense=expData
          this.expense.ExpenseDate=this.expense.ExpenseDate.split('T')[0];
         // this.adjustDate(this.expense.ExpenseDate);
          console.log(expData);
          console.log(this.expense.ExpenseDate);
        },
        (error) =>{
          //this.statusMessage="Nurtz";
          console.log(error);
        }
      )
    }
    //else
    //  console.log(expenseID);
  }

  adjustDate(thedate:Date){
      
      let foo:string;
      foo=thedate.toDateString();
      console.log(foo);

  }
}
