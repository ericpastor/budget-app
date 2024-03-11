import { Component, inject } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import {
  Operation,
  Transaction,
} from '../../interfaces/transactions.interfaces';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent {
  private transactionsService = inject(TransactionsService);
  public newTransactionOperation = 'income';
  public newTransactionDescription: string = '';
  public newTransactionQuantity: number = 0;

  operations: Operation[] = [
    { value: 'income', viewValue: 'income' },
    { value: 'expense', viewValue: 'expense' },
  ];

  public addTransaction() {
    const newTransaction: Transaction = {
      id: Math.random(),
      operation: this.newTransactionOperation,
      description: this.newTransactionDescription,
      quantity: this.newTransactionQuantity,
      createdAt: new Date(),
    };

    this.transactionsService.addTransaction(newTransaction);
  }
}
