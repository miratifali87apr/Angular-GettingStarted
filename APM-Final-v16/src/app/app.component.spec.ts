import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as pageTitle 'Acme Product Management'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.pageTitle).toEqual('Acme Product Management');
  });

  it('should render page title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const navbarBrand = compiled.querySelector('.navbar-brand');
    expect(navbarBrand?.textContent).toContain('ACME');
  });

  it('should have brand name and tagline properties', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.brandName).toEqual('ACME');
    expect(app.brandTagline).toEqual('Product Management');
  });

  it('should toggle menu state', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isMenuOpen).toBeFalsy();
    
    app.toggleMenu();
    expect(app.isMenuOpen).toBeTruthy();
    
    app.toggleMenu();
    expect(app.isMenuOpen).toBeFalsy();
  });

  it('should close menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isMenuOpen = true;
    
    app.closeMenu();
    expect(app.isMenuOpen).toBeFalsy();
  });

  it('should render professional navigation with correct classes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const navbar = compiled.querySelector('.navbar');
    expect(navbar).toBeTruthy();
    expect(navbar?.classList.contains('navbar-expand-lg')).toBeTruthy();
    
    const brandIcon = compiled.querySelector('.brand-icon');
    expect(brandIcon).toBeTruthy();
    expect(brandIcon?.querySelector('i.fa-cube')).toBeTruthy();
    
    const brandTitle = compiled.querySelector('.brand-title');
    expect(brandTitle?.textContent?.trim()).toBe('ACME');
    
    const brandSubtitle = compiled.querySelector('.brand-subtitle');
    expect(brandSubtitle?.textContent?.trim()).toBe('Product Management');
  });

  it('should render navigation links with correct structure', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const homeLink = compiled.querySelector('a[routerLink="/welcome"]');
    expect(homeLink).toBeTruthy();
    expect(homeLink?.textContent).toContain('Home');
    
    const productsLink = compiled.querySelector('a[routerLink="/products"]');
    expect(productsLink).toBeTruthy();
    expect(productsLink?.textContent).toContain('Products');
    
    const aboutLink = compiled.querySelector('a[routerLink="/about"]');
    expect(aboutLink).toBeTruthy();
    expect(aboutLink?.textContent).toContain('About');
  });
});
