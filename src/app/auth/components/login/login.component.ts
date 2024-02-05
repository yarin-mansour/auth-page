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
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzSpaceModule} from 'ng-zorro-antd/space'
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzCardModule,
    ReactiveFormsModule,
    RouterModule,
    NzButtonModule,
    NzGridModule,
    NzAlertModule,
    NzCheckboxModule,
    NzIconModule,
    NzSpaceModule
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnDestroy {

  sub: Subscription;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    remember: new FormControl(null)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.sub = this.authService.login(this.loginForm.value).pipe(
      tap(() => this.router.navigate(['../../home']))
    ).subscribe();
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
     }
  }
}