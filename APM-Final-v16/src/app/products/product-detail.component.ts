import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { StarComponent } from '../shared/star.component';
import { NgIf, LowerCasePipe, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, StarComponent, LowerCasePipe, CurrencyPipe, DatePipe, ConvertToSpacesPipe]
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: IProduct | undefined;
  isLoading = true;
  private destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.isLoading = true;
    this.productService.getProduct(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: product => {
          this.product = product;
          this.isLoading = false;
          this.cdr.markForCheck(); // Trigger change detection
        },
        error: err => {
          this.errorMessage = err;
          this.isLoading = false;
          this.cdr.markForCheck(); // Trigger change detection
        }
      });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      // Prevent infinite loops by checking if already set to placeholder
      if (!target.src.includes('placeholder.jpg')) {
        target.src = 'assets/images/placeholder.jpg';
      }
    }
  }

  isNewProduct(releaseDate: string): boolean {
    const productDate = new Date(releaseDate);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return productDate >= sixMonthsAgo;
  }
}
