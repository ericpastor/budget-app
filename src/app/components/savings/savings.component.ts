import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Savings } from '../../interfaces/savings.interfaces';
import { SavingsService } from '../../services/savings.services';
import { FormsModule } from '@angular/forms';
import { TransferComponent } from '../transfer/transfer.component';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [CommonModule, FormsModule, TransferComponent],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.css',
})
export class SavingsComponent implements OnInit {
  @Input() savings?: Savings | null;
  private savingsService = inject(SavingsService);

  updateParametersFormDisabled = true;
  updatedTarget: number | undefined;
  updatedAimDescription: string | undefined;

  public targetRemainig(): number {
    if (this.savings?.target && this.savings?.amount) {
      return this.savings?.target - this.savings?.amount;
    } else {
      return 0;
    }
  }

  toggleForm() {
    this.updateParametersFormDisabled = !this.updateParametersFormDisabled;
  }

  public updateTarget() {
    if (this.updatedTarget !== undefined) {
      this.savingsService.updateTarget(this.updatedTarget);
    }
  }

  public updateAimDescription() {
    if (this.updatedAimDescription !== undefined) {
      this.savingsService.updateAimDescription(this.updatedAimDescription);
    }
  }

  ngOnInit(): void {
    const savedSavings = localStorage.getItem('savings');
    if (savedSavings) {
      const initialSavings = JSON.parse(savedSavings);
      this.savingsService.setSavingsPanel(initialSavings);
    }
  }
}
