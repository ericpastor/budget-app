import { Injectable } from '@angular/core';
import { Operation, Transaction } from '../interfaces/transactions.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private transactions: Transaction[] = [];
  private transactionsSubject = new BehaviorSubject<Transaction[]>(
    this.transactions
  );

  public filtersSubject = new BehaviorSubject<Operation>({
    value: 'all',
    viewValue: 'all',
  });

  constructor() {
    this.loadFromLocalStorage();
  }

  public addTransaction(newTransaction: Transaction) {
    const adjustedQuantity =
      newTransaction.operation === 'expense'
        ? newTransaction.quantity * -1
        : newTransaction.quantity;

    this.transactions.push({ ...newTransaction, quantity: adjustedQuantity });
    this.update();
  }

  public removeTransaction(transactionId: Transaction['id']) {
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== transactionId
    );
    this.update();
  }

  public getTransactions(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  public restartTransactions() {
    this.transactions = [];
    this.update();
  }

  private loadFromLocalStorage() {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      this.transactions = JSON.parse(storedTransactions);
      this.update();
    }
  }

  private update() {
    this.transactionsSubject.next(this.transactions);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }
}
