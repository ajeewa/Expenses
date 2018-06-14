import { Injectable } from '@angular/core';
import { IExpense } from './models/expense';
import {Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ExpenseService {

  selectedExpense: IExpense;
  expenseList:IExpense[];
  //url="http://localhost:50106/api/Expenses";
  constructor(private _http: Http){

  }

  postExpense(exp:IExpense){
    let body=JSON.stringify(exp);
    let headerOptions = new Headers({'Content-Type':'application/json'});
    let requestOptions = new RequestOptions({method: RequestMethod.Post,headers:headerOptions});
    return this._http.post("http://localhost:50106/api/Expenses",body,requestOptions).map(x =>x.json());
  }

  putExpense(id,exp){
    let body=JSON.stringify(exp);
    let headerOptions = new Headers({'Content-Type':'application/json'});
    let requestOptions = new RequestOptions({method: RequestMethod.Put,headers:headerOptions});
    return this._http.put("http://localhost:50106/api/Expenses"+"/"+id,body,requestOptions).map(x =>x.json());
  }

  // getExpenseList(){
  //   this._http.get('http://localhost:50106/api/Expenses')
  //   .map((data: Response) => {
  //     return data.json() as IExpense[];
  //   }).toPromise().then(x =>{
  //       this.expenseList=x;
  //   });
  // }

  getExpenseList():Observable<IExpense[]>{
    return this._http.get('http://localhost:50106/api/Expenses')
            .map((data: Response)=> <IExpense[]>data.json())
  }

  getExpense(id:number):Observable<IExpense>{
    return this._http.get('http://localhost:50106/api/Expenses'+"/"+id)
            .map((data: Response)=> <IExpense>data.json())
  }

  deleteExpense(id:number){
    return this._http.delete('http://localhost:50106/api/Expenses'+"/"+id).map(res => res.json());
  }

  // getExpenses(): Observable<IExpense[]>{
  //   return this._http.get(this.url)
  //                    .map((response: Response) => <IExpense[]>response.json());
  // }

  // addExpense(newexpense: IExpense){
  //     var body=JSON.stringify(newexpense);
  //     var headerOptions=new Headers({'Content-Type':'application/json'});
  //     var requestOptions=new RequestOptions({method:RequestMethod.Post,headers: headerOptions});
  //     return this._http.post(this.url,body,requestOptions).map(x=>x.json());


  // }

  get(expenseId){
    return "No connection to Api!";
  }

}
