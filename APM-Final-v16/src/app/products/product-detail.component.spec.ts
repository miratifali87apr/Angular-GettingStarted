import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from './product.service';
import { IProduct } from './product';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProduct: IProduct = {
    productId: 1,
    productName: 'Test Product',
    productCode: 'TEST-001',
    price: 99.99,
    description: 'Test product description',
    starRating: 4.5,
    imageUrl: 'test-image.jpg',
    releaseDate: '2023-01-01'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getProduct']);

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    mockProductService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties set', () => {
    expect(component.pageTitle).toBe('Product Detail');
    expect(component.errorMessage).toBe('');
    expect(component.product).toBeUndefined();
    expect(component.isLoading).toBeTruthy();
  });

  it('should get product on init', () => {
    mockProductService.getProduct.and.returnValue(of(mockProduct));
    
    component.ngOnInit();
    
    expect(mockProductService.getProduct).toHaveBeenCalledWith(1);
    expect(component.product).toEqual(mockProduct);
    expect(component.isLoading).toBeFalsy();
  });

  it('should handle product service error', () => {
    const errorMessage = 'Product not found';
    mockProductService.getProduct.and.returnValue(of(null as any).pipe(() => {
      throw new Error(errorMessage);
    }));
    
    spyOn(component, 'getProduct').and.callThrough();
    component.getProduct(1);
    
    expect(component.isLoading).toBeTruthy();
  });

  it('should identify new products correctly', () => {
    const recentDate = new Date();
    recentDate.setMonth(recentDate.getMonth() - 3);
    
    const oldDate = new Date();
    oldDate.setMonth(oldDate.getMonth() - 12);
    
    expect(component.isNewProduct(recentDate.toISOString())).toBeTruthy();
    expect(component.isNewProduct(oldDate.toISOString())).toBeFalsy();
  });

  it('should handle image error correctly', () => {
    const mockEvent = {
      target: {
        src: 'original-image.jpg',
        includes: jasmine.createSpy('includes').and.returnValue(false)
      }
    } as any;
    
    spyOn(mockEvent.target.src, 'includes').and.returnValue(false);
    
    component.onImageError(mockEvent);
    
    expect(mockEvent.target.src).toBe('assets/images/placeholder.jpg');
  });

  it('should not change src if already placeholder', () => {
    const mockEvent = {
      target: {
        src: 'assets/images/placeholder.jpg',
        includes: jasmine.createSpy('includes').and.returnValue(true)
      }
    } as any;
    
    const originalSrc = mockEvent.target.src;
    
    component.onImageError(mockEvent);
    
    expect(mockEvent.target.src).toBe(originalSrc);
  });

  it('should navigate back to products', () => {
    spyOn(component['router'], 'navigate');
    
    component.onBack();
    
    expect(component['router'].navigate).toHaveBeenCalledWith(['/products']);
  });
});
