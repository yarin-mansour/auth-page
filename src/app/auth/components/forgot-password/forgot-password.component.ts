import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzCardModule,
    ReactiveFormsModule,
    RouterModule,
    NzButtonModule,
    NzGridModule,
    NzAlertModule
],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent implements OnDestroy {

  sub: Subscription;

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  forgotPassword() {
    if (!this.forgotPasswordForm.valid) {
      return;
    }
    this.sub = this.authService.sendResetEmail(this.forgotPasswordForm.value).pipe(
      tap(() => this.router.navigate(['../login']))
    ).subscribe();
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
     }
  }

}