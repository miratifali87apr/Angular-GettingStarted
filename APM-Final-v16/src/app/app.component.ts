import { Component } from "@angular/core";
import { RouterLinkActive, RouterLink, RouterOutlet } from "@angular/router";

@Component({
    selector: 'pm-root',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-gradient fixed-top shadow-lg">
      <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center" routerLink="/welcome">
          <div class="brand-icon me-2">
            <i class="fa fa-cube"></i>
          </div>
          <div class="brand-text">
            <div class="brand-title">{{brandName}}</div>
            <div class="brand-subtitle">{{brandTagline}}</div>
          </div>
        </a>

        <!-- Mobile toggle button -->
        <button 
          class="navbar-toggler" 
          type="button" 
          [class.collapsed]="!isMenuOpen"
          (click)="toggleMenu()"
          aria-controls="navbarNav" 
          [attr.aria-expanded]="isMenuOpen">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation items -->
        <div class="collapse navbar-collapse" [class.show]="isMenuOpen" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" 
                 routerLinkActive="active" 
                 routerLink="/welcome"
                 (click)="closeMenu()">
                <i class="fa fa-home me-2"></i>Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                 routerLinkActive="active" 
                 routerLink="/products"
                 (click)="closeMenu()">
                <i class="fa fa-shopping-cart me-2"></i>Products
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                 routerLinkActive="active" 
                 routerLink="/about"
                 (click)="closeMenu()">
                <i class="fa fa-info-circle me-2"></i>About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <!-- Main content with proper spacing for fixed navbar -->
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    `,
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterLinkActive, RouterLink, RouterOutlet]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  brandName = 'ACME';
  brandTagline = 'Product Management';
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
