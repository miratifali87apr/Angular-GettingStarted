import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, isDevMode } from "@angular/core";
import { Observable, catchError, tap, throwError, map, shareReplay } from "rxjs";

import { IProduct } from "./product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
  private productUrl = 'api/products/products.json';
  private products$: Observable<IProduct[]> | undefined;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    if (!this.products$) {
      this.products$ = this.http.get<IProduct[]>(this.productUrl)
        .pipe(
          tap(data => {
            if (isDevMode()) {
              console.log('Products loaded:', data.length, 'products');
            }
          }),
          shareReplay({ bufferSize: 1, refCount: true }),
          catchError(this.handleError)
        );
    }
    return this.products$;
  }

  // Get one product
  // Since we are working with a json file, we can only retrieve all products
  // So retrieve all products and then find the one we want using 'map'
  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // In a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Network error: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong
      errorMessage = `Server error: ${err.status} - ${err.message}`;
    }
    
    if (isDevMode()) {
      console.error('ProductService Error:', errorMessage, err);
    }
    
    return throwError(() => errorMessage);
  }

}
