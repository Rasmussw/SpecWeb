import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hf-landingpage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './landingpage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingpageComponent {}
