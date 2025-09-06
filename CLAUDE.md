# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This repository contains three separate Angular applications for the "Angular: Getting Started" Pluralsight course:

- **APM-Start/**: Starter files for following along with the course (Angular v14)
- **APM-Final/**: Completed solution matching the course (Angular v14) 
- **APM-Final-v16/**: Completed solution upgraded to Angular v16 (reference only)

Each folder is a complete Angular application with its own `package.json`.

## Common Commands

Navigate to the appropriate folder (APM-Start, APM-Final, or APM-Final-v16) first:

```bash
# Install dependencies
npm install

# Start development server (opens browser automatically)
npm start

# Build for production
npm build

# Run tests
npm test

# Build and watch for changes
npm run watch
```

## Application Architecture

### APM-Start (Starter Project)
- Basic Angular app with minimal setup
- Bootstrap CSS framework included in APM-Final only
- Uses traditional NgModule-based architecture
- Mock data served from `src/api/products/products.json`

### APM-Final (Complete Solution)
- Product Management application demonstrating core Angular concepts
- **Routing**: App-level routing with lazy-loaded product module
- **Modules**: 
  - `app.module.ts`: Root module with routing configuration
  - `products/product.module.ts`: Feature module for products
  - `shared/shared.module.ts`: Shared components and pipes
- **Services**: HTTP-based product service (`products/product.service.ts`)
- **Components**: 
  - Product list with filtering functionality
  - Product detail view with route guards
  - Reusable star rating component
- **Data Flow**: JSON data from `assets/products/products.json` (note: moved from `api/` folder)

### APM-Final-v16 (Angular 16 Standalone)
- Modern Angular 16 implementation using standalone components
- **Bootstrap Configuration**: Uses `bootstrapApplication` with `app.config.ts`
- **Routing**: Route-based lazy loading with `loadChildren` and `loadComponent`
  - `app.routes.ts`: Main routing configuration
  - `products/product.routes.ts`: Product feature routes
- **Architecture**: No NgModules - all components are standalone
- **Services**: Injectable services with `provideHttpClient()` 
- **Components**:
  - `WelcomeComponent`: Home page component
  - `ProductListComponent`: Product listing with filtering
  - `ProductDetailComponent`: Product details with guard protection
  - `AboutComponent`: Lazy-loaded about page
  - `StarComponent`: Reusable star rating component
- **Guards**: Route guards using functional guards (`ProductDetailGuard`)

## Key Technologies

- Angular 14 (APM-Start, APM-Final) / Angular 16 (APM-Final-v16)
- Bootstrap 5.2.3 and Font Awesome 4.7.0 (APM-Final and APM-Final-v16)
- RxJS ~7.8.0 for reactive programming
- Angular Router for navigation
- HttpClient for data fetching (provided via `provideHttpClient()` in v16)
- Jasmine/Karma for testing

## Development Notes

- **APM-Start & APM-Final**: Use traditional NgModule architecture
- **APM-Final-v16**: Uses modern standalone components (no NgModules)
- Product data is served from static JSON files in the assets folder
- The application includes route guards for protecting product detail routes
- CSS styling note: Use `th` instead of `thead` for table header styling due to CSS specificity issues
- Component prefix is configured as "pm" in angular.json