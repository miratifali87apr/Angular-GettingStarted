import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class WelcomeComponent {
  public pageTitle = 'Welcome to Acme Product Management';
  
  heroTitle = 'Manage Products Like a Pro';
  heroSubtitle = 'Discover, organize, and manage your product catalog with our modern, intuitive platform built on Angular 16.';
  angularVersion = '16';
  
  stats = {
    products: 12,
    categories: 6,
    rating: 4.5
  };
  
  features: Feature[] = [
    {
      icon: 'fa-lightning-bolt',
      title: 'Lightning Fast',
      description: 'Optimized performance with Angular 16 standalone components and lazy loading for instant page loads.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Secure & Reliable',
      description: 'Built with TypeScript and modern security practices to ensure your data stays safe and secure.'
    },
    {
      icon: 'fa-cogs',
      title: 'Easy to Use',
      description: 'Intuitive interface with powerful filtering, search, and management capabilities that just work.'
    },
    {
      icon: 'fa-chart-line',
      title: 'Analytics Ready',
      description: 'Track product performance, ratings, and user engagement with built-in analytics features.'
    },
    {
      icon: 'fa-palette',
      title: 'Beautiful Design',
      description: 'Modern, responsive design that looks great on any device with Bootstrap 5 styling.'
    },
    {
      icon: 'fa-rocket',
      title: 'Continuously Updated',
      description: 'Regular updates with new features, performance improvements, and security enhancements.'
    }
  ];
  
  constructor(private router: Router) {}
  
  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
  
  learnMore(): void {
    this.router.navigate(['/about']);
  }
}
