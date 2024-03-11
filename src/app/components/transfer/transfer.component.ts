import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Savings } from '../../interfaces/savings.interfaces';
import { SavingsService } from '../../services/savings.services';
import { BalanceService } from '../../services/balance.service';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../interfaces/transactions.interfaces';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css',
})
export class TransferComponent implements OnInit {
  @Input() transactions?: Transaction | null;
  @Input() savings?: Savings | null;
  @Input() balance?: number | null;

  public amount: number | null = 0;

  private savingsService = inject(SavingsService);
  private balanceService = inject(BalanceService);
  private transactionsService = inject(TransactionsService);

  public transferToBalance(amount: number): void {
    if (
      this.savings?.amount &&
      this.balance &&
      this.savings?.amount >= amount
    ) {
      this.balance += amount;
      this.savings.amount -= amount;

      const newTransaction: Transaction = {
        id: Math.random(),
        operation: 'income',
        description: 'Money transfered to savings',
        quantity: amount,
        createdAt: new Date(),
      };

      this.savingsService.updateAmount(this.savings.amount);
      this.transactionsService.addTransaction(newTransaction);
      this.balanceService.updateTotalAmount(this.balance);
    }
  }

  public transferToSavings(amount: number): void {
    const savedSavings = localStorage.getItem('savings');
    const savedBalance = localStorage.getItem('balance');
    if (this.savings?.target === 0 || this.savings?.target === null) {
      alert('Please, set up the taget savings panel firts!');
      return;
    }
    if (savedSavings) {
      this.savings = JSON.parse(savedSavings);
    }
    if (savedBalance) {
      this.balance = JSON.parse(savedBalance);
    }

    if (
      this.balance &&
      this.savings &&
      this.savings.amount !== null &&
      this.savings?.amount >= 0 &&
      this.balance >= amount
    ) {
      const amountNumber = parseInt(amount.toString(), 10);
      this.savings.amount += amountNumber;
      this.balance -= amountNumber;

      const newTransaction: Transaction = {
        id: Math.random(),
        operation: 'expense',
        description: 'Money transfered to savings',
        quantity: amount,
        createdAt: new Date(),
      };

      this.savingsService.updateAmount(this.savings.amount);
      this.transactionsService.addTransaction(newTransaction);
      this.balanceService.updateTotalAmount(this.balance);
    }
  }

  ngOnInit() {
    this.balanceService.balanceAmount.subscribe((newBalance) => {
      this.balance = newBalance;
    });
    if (this.balance && this.balance >= 0) {
      this.balanceService.updateTotalAmount(this.balance);
    }

    this.savingsService.getSavingsPanel().subscribe((savings) => {
      this.savings = savings;
    });

    if (
      this.savings &&
      this.savings.amount !== null &&
      this.savings?.amount >= 0
    ) {
      this.savingsService.updateAmount(this.savings.amount);
    }
  }
}
