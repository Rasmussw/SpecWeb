import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'hf-root',
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private oidcSecurityService = inject(OidcSecurityService);

  constructor() {}
  title = 'HovedopgaveFrontend';

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe({
      next: () => {
        const redirect = sessionStorage.getItem('postLoginUrl');
        sessionStorage.removeItem('postLoginUrl');
        if (redirect) {
          document.location = redirect;
        }
      },
    });
  }
}
