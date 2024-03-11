import { Injectable } from '@angular/core';
import { Savings } from '../interfaces/savings.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavingsService {
  private savings: Savings = { amount: 0, target: 0, aimDescription: '' };
  private savingsSubject = new BehaviorSubject<Savings>(this.savings);

  constructor() {
    this.loadFromLocalStorage();
  }

  public setSavingsPanel(savingsPanel: Savings) {
    this.savings = savingsPanel;
    this.update();
  }

  public getSavingsPanel(): Observable<Savings> {
    return this.savingsSubject.asObservable();
  }

  public restartSavings() {
    this.savings = { amount: 0, target: 0, aimDescription: '' };
    this.update();
  }

  public updateAmount(updatedAmount: number) {
    this.savings.amount = updatedAmount;
    this.update();
  }

  public updateTarget(updatedTarget: number) {
    this.savings.target = updatedTarget;
    this.update();
  }

  public updateAimDescription(updatedAimDescription: string) {
    this.savings.aimDescription = updatedAimDescription;
    this.update();
  }

  private loadFromLocalStorage() {
    const storedSavings = localStorage.getItem('savings');
    if (storedSavings) {
      this.savings = JSON.parse(storedSavings);
      this.savingsSubject.next(this.savings);
    }
  }

  private update() {
    this.savingsSubject.next(this.savings);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('savings', JSON.stringify(this.savings));
  }
}
