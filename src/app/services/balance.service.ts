import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private balance: number = 0;
  private balanceSubject = new BehaviorSubject<number>(this.balance);
  balanceAmount = this.balanceSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  public getBalance(): number {
    return this.balance;
  }

  public restartBalance() {
    this.balance = 0;
    this.update();
  }

  public updateTotalAmount(newBalance: number): void {
    this.balance = newBalance;
    this.update();
  }

  private loadFromLocalStorage() {
    const storedBalance = localStorage.getItem('balance');
    if (storedBalance) {
      this.balance = JSON.parse(storedBalance);
    }
  }

  private update() {
    this.balanceSubject.next(this.balance);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('balance', JSON.stringify(this.balance));
  }
}
