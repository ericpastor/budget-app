import { Component, Input, inject } from '@angular/core';
import { SavingsService } from '../../services/savings.services';
import { Savings } from '../../interfaces/savings.interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saving-panel-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './saving-panel-form.component.html',
  styleUrl: './saving-panel-form.component.css',
})
export class SavingPanelFormComponent {
  private savingsService = inject(SavingsService);
  @Input() savings?: Savings | null;

  public savingsAmout: number = 0;
  public savingsTarget: number = 100;
  public savingsAimDescription: string = 'Nothing thought yet';

  public setSavingsPanel() {
    const initialPanel: Savings = {
      amount: this.savingsAmout,
      target: this.savingsTarget,
      aimDescription: this.savingsAimDescription,
    };

    this.savingsService.setSavingsPanel(initialPanel);
  }
}
