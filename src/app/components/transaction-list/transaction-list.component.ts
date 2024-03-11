import { Component, Input } from '@angular/core';
import {
  Transaction,
} from '../../interfaces/transactions.interfaces';
import { CommonModule } from '@angular/common';
import { TransactionListItemComponent } from '../transaction-list-item/transaction-list-item.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionListItemComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
})
export class TransactionListComponent {
  @Input() transactionList?: Transaction[] | null;
}
