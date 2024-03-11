import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { BalanceService } from '../../services/balance.service';
import { Transaction } from '../../interfaces/transactions.interfaces';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
})
export class BalanceComponent implements OnInit {
  balance: number = 0;
  operation = '';

  public getAll(all: string) {
    this.operation = all;
  }

  private transactionsService = inject(TransactionsService);
  private balanceService = inject(BalanceService);

  ngOnInit() {
    this.transactionsService.getTransactions().subscribe((transactions) => {
      this.balance = transactions.reduce(
        (total, transaction) => total + Number(transaction.quantity),
        0
      );
      this.balanceService.updateTotalAmount(this.balance);
    });
  }
}
