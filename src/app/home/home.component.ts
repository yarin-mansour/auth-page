import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzCardModule, NzButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnDestroy {

  sub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  logout() {
    this.sub = this.authService.logout().subscribe(() => {
        this.router.navigate(['../../']);
    })
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
     }
  }

}