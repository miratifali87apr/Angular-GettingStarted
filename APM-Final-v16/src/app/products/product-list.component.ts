import { Component, OnInit, computed, signal, ChangeDetectionStrategy, inject, DestroyRef, ChangeDetectorRef } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { ConvertToSpacesPipe } from "../shared/convert-to-spaces.pipe";
import { StarComponent } from "../shared/star.component";
import { RouterLink } from "@angular/router";
import { NgIf, NgFor, LowerCasePipe, CurrencyPipe, DatePipe, SlicePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, NgIf, NgFor, 
      RouterLink, StarComponent, LowerCasePipe, 
      CurrencyPipe, DatePipe, SlicePipe, ConvertToSpacesPipe]
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Our Products';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  isLoading = true;
  viewMode: 'grid' | 'list' = 'grid';
  sortBy: 'name' | 'price' | 'rating' | 'newest' = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  private destroyRef = inject(DestroyRef);

  // Use the new Angular signals feature to perform the filter
  listFilter = signal('');
  filteredProducts = computed(() => this.getSortedAndFilteredProducts());
  products: IProduct[] = [];

  // View options
  viewOptions: Array<{value: 'grid' | 'list', label: string, icon: string}> = [
    { value: 'grid', label: 'Grid View', icon: 'fa-th' },
    { value: 'list', label: 'List View', icon: 'fa-list' }
  ];

  // Sort options
  sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
    { value: 'newest', label: 'Newest' }
  ];

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy) ||
      product.description.toLocaleLowerCase().includes(filterBy) ||
      product.productCode.toLocaleLowerCase().includes(filterBy)
    );
  }

  getSortedAndFilteredProducts(): IProduct[] {
    let filteredProducts = this.performFilter(this.listFilter());
    
    // Sort products
    return filteredProducts.sort((a, b) => {
      let comparison = 0;
      
      switch (this.sortBy) {
        case 'name':
          comparison = a.productName.localeCompare(b.productName);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.starRating - b.starRating;
          break;
        case 'newest':
          comparison = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
          break;
      }
      
      return this.sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  onSortChange(sortBy: string): void {
    if (this.sortBy === sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy as 'name' | 'price' | 'rating' | 'newest';
      this.sortOrder = 'asc';
    }
  }

  onViewModeChange(viewMode: 'grid' | 'list'): void {
    this.viewMode = viewMode;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: products => {
          this.products = products;
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

  trackByProductId(index: number, product: IProduct): number {
    return product.productId;
  }

  onFilterChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.listFilter.set(target.value);
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  isNewProduct(releaseDate: string): boolean {
    const productDate = new Date(releaseDate);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return productDate >= sixMonthsAgo;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/images/placeholder.jpg';
    }
  }
}
