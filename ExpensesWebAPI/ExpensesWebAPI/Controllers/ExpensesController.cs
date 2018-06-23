using ExpensesWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ExpensesWebAPI.Controllers
{
    public class ExpensesController : ApiController
    {
        AccountingEntities entities = new AccountingEntities();

        public IEnumerable<Expenses> Get()
        {
           // using (AccountingEntities entities = new AccountingEntities())
           // {
                return entities.Expenses.ToList().OrderByDescending(d=>d.ExpenseDate);
           // }
        }

        public Expenses Get(int id)
        {
           // using (AccountingEntities entities = new AccountingEntities())
           // {
                return entities.Expenses.FirstOrDefault(e => e.ID == id);
          //  }
        }
        [Route("api/Expenses/{start}/{end}")]
        public IEnumerable<Expenses> Get(DateTime start, DateTime end)
        {
            if (start == null)
                start = Convert.ToDateTime("2018-04-01");
            if (end == null)
                end = Convert.ToDateTime("2018-04-30");

            return entities.Expenses.Where(e => e.ExpenseDate >= start
                                                    && e.ExpenseDate <= end)
                                    .ToList().OrderByDescending(d => d.ExpenseDate);
        }
        public IHttpActionResult PostExpense(Expenses expense)
        {
            //using (AccountingEntities entities = new AccountingEntities())
            //{
                entities.Expenses.Add(expense);
                entities.SaveChanges();
                return CreatedAtRoute("DefaultApi", new { id = expense.ID }, expense);

            //}

        }

        [ResponseType(typeof(void))]
        public IHttpActionResult PutExpense(int id,Expenses expenses)
        {
            if (id != expenses.ID)
            {
                return BadRequest();
            }

            //using (AccountingEntities entities = new AccountingEntities())
            //{
              entities.Entry(expenses).State = EntityState.Modified;
                try
                {
                    entities.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ExpenseExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return StatusCode(HttpStatusCode.NoContent);
           // }
        }

        [ResponseType(typeof(Expenses))]
        public IHttpActionResult DeleteExpense(int id)
        {
            Expenses expenses = entities.Expenses.Find(id);
            if (expenses == null)
                return NotFound();

            entities.Expenses.Remove(expenses);
            entities.SaveChanges();

            return Ok(expenses);
        }

        private bool ExpenseExists(int id)
        {
            return entities.Expenses.Count(e => e.ID == id) > 0;
        }
    }
}
