import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionsService } from './services/transactions.service';
import { Subscription } from 'rxjs';
import { Transaction } from './interfaces/transactions.interfaces';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { FormsModule } from '@angular/forms';
import { BalanceComponent } from './components/balance/balance.component';
import { SavingsComponent } from './components/savings/savings.component';
import { SavingPanelFormComponent } from './components/saving-panel-form/saving-panel-form.component';
import { SavingsService } from './services/savings.services';
import { Savings } from './interfaces/savings.interfaces';
import { TransferComponent } from './components/transfer/transfer.component';
import { BalanceService } from './services/balance.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TransactionListComponent,
    TransactionFormComponent,
    FormsModule,
    BalanceComponent,
    SavingPanelFormComponent,
    SavingsComponent,
    TransferComponent,
  ],
  templateUrl: `./app.component.html`,
  styleUrl: './app.component.css',
})
export class AppComponent {
  public title = 'Budget-App';
  public transactions?: Transaction[];
  public savings?: Savings;
  public balance?: number;

  private transactionsService = inject(TransactionsService);
  private transactionsSubscription: Subscription;

  private savingsService = inject(SavingsService);
  private savingsSubscription: Subscription;

  private balanceService = inject(BalanceService);

  public restart() {
    this.savingsService.restartSavings();
    this.transactionsService.restartTransactions();
    this.balanceService.restartBalance();
  }

  constructor() {
    this.transactionsSubscription = this.transactionsService
      .getTransactions()
      .subscribe((transactions) => {
        this.transactions = transactions;
      });

    this.savingsSubscription = this.savingsService
      .getSavingsPanel()
      .subscribe((savings) => {
        this.savings = savings;
      });
  }

  ngDestroy() {
    this.transactionsSubscription.unsubscribe();
    this.savingsSubscription.unsubscribe();
  }
}
