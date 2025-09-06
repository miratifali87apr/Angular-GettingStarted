import { Component, OnInit, computed, signal, ChangeDetectionStrategy, inject, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { ConvertToSpacesPipe } from "../shared/convert-to-spaces.pipe";
import { StarComponent } from "../shared/star.component";
import { RouterLink } from "@angular/router";
import { NgIf, NgFor, LowerCasePipe, CurrencyPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, NgIf, NgFor, 
      RouterLink, StarComponent, LowerCasePipe, 
      CurrencyPipe, ConvertToSpacesPipe]
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  isLoading = true;
  private destroyRef = inject(DestroyRef);

  // Use the new Angular signals feature to perform the filter
  listFilter = signal('');
  filteredProducts = computed(() => this.performFilter(this.listFilter()));
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
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
        },
        error: err => {
          this.errorMessage = err;
          this.isLoading = false;
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
}
