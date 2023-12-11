import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'hf-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private oidcSecurityService = inject(OidcSecurityService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  isClicked = false;
  hasRoleOrganizer = signal(false);
  hasRoleSpectator = signal(false);
  // The 'frontpage' will be different regarded to the roles
  // organizer will see 'competitions-list'
  // spectater will see 'spectator-frontpage'
  frontpagePath = signal('');

  ngOnInit() {
    let roles: string[] = [];
    this.oidcSecurityService.userData$.subscribe((userdata: UserDataResult) => {
      roles = userdata.userData.groups;

      if (roles.includes('organizer')) {
        console.log('You are an organizer');
        this.hasRoleOrganizer.set(true);
        this.frontpagePath.set('/login-organizer');
      } else if (roles.includes('user')) {
        console.log('You are a spectator');
        this.hasRoleSpectator.set(true);
        this.frontpagePath.set('/spectator-frontpage');
      } else {
        console.log('No roles');
      }
    });

    this.cdr.detectChanges();
  }

  modalOpen() {
    this.isClicked = !this.isClicked;
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => {
      console.log('User is logged out', result);
    });
    this.router.navigate(['/']);
  }
}
