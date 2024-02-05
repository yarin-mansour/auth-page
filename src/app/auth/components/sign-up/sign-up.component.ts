
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';

import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { CustomValidators } from './custom-validator';
import { AuthService } from '../../services/auth.service';
import { PasswordStrengthComponent } from "./password-strength";
import { RegisterRequest } from '../../interfaces';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.less'],
    imports: [
        CommonModule,
        NzFormModule,
        NzCardModule,
        ReactiveFormsModule,
        RouterModule,
        NzButtonModule,
        NzGridModule,
        NzAlertModule,
        PasswordStrengthComponent,
        NzCheckboxModule
    ]
})
export class SignUpComponent implements OnDestroy {

  sub: Subscription; 

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    agree: new FormControl(false, [Validators.required, Validators.requiredTrue])
    }, { validators: CustomValidators.matchingPasswords }
  )

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    this.sub = this.authService.register(this.registerForm.value).pipe(
      tap(() => this.router.navigate(['../login']))
    ).subscribe();
  }

  ngOnDestroy(): void {
    if(this.sub){
     this.sub.unsubscribe();
    }
  }

}