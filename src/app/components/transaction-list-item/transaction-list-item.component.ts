import { Component, Input, inject } from '@angular/core';
import { Transaction } from '../../interfaces/transactions.interfaces';
import { CommonModule } from '@angular/common';

import { TransactionsService } from '../../services/transactions.service';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-transaction-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list-item.component.html',
  styleUrl: './transaction-list-item.component.css',
})
export class TransactionListItemComponent {
  @Input() transaction?: Transaction;
  @Input() balance?: Transaction;

  private transactionsService = inject(TransactionsService);
  private balanceService = inject(BalanceService);

  public removeTransaction() {
    if (!this.transaction) return;
    const currentBalance = this.balanceService.getBalance();
    if (currentBalance - this.transaction.quantity < 0) {
      alert('We cannot delete this transfer, your balance will become negative');
    } else {
      this.transactionsService.removeTransaction(this.transaction.id);
    }
  }
}
