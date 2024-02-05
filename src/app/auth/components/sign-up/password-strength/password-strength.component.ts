import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule, NzProgressModule, NzGridModule],
  styleUrls: ['./password-strength.component.less'],
  templateUrl: './password-strength.component.html',
})
export class PasswordStrengthComponent implements OnChanges {

  @Input() passwordToCheck: string;

  @Output() passwordStrength = new EventEmitter<boolean>();

  readonly messageToColor: Record<string, string> = {
    'Poor' : 'darkred', 
    'Average': 'orange', 
    'Good': 'yellowgreen',
    'Excellent': 'green'
};

readonly messageToPercent: Record<string, number> = {
    'Poor' : 25, 
    'Average': 50, 
    'Good': 75,
    'Excellent': 100
};

  message: string;
  messageColor: string;

  checkStrength(password: string) {
    let force = 0;

    const reg = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerCaseLetters = /[a-z]+/.test(password);
    const upperCaseLetters = /[A-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = reg.test(password);

    const flags = [lowerCaseLetters, upperCaseLetters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }
    force += 2 * password.length + (password.length >= 10 ? 1 : 0);
    force += passedMatches * 10;
    force = password.length <= 6 ? Math.min(force, 10) : force;
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;
    force = passedMatches === 4 ? Math.min(force, 40) : force;

    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;

    if (password) {
      const pwdStrength = this.checkStrength(password);
      pwdStrength === 40 ? this.passwordStrength.emit(true) : this.passwordStrength.emit(false);

      switch (pwdStrength) {
        case 10:
          this.message = 'Poor';
          break;
        case 20:
          this.message = 'Average';
          break;
        case 30:
          this.message = 'Good';
          break;
        case 40:
          this.message = 'Excellent';
          break;
      }
    } else {
      this.message = '';
    }
  }
}
