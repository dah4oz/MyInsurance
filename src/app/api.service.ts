import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {retry, catchError, map} from 'rxjs/operators';
import {Customer} from './models/customer';
import {Membership} from './models/membership';
import {Insurance} from './models/insurance';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = 'http://localhost:3000';
  private CUSTOMERS = this.SERVER_URL + '/customers';
  private MEMBERSHIPS = this.SERVER_URL + '/membership';
  private PRODUCTS = this.SERVER_URL + '/products';

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public get() {
    return this.httpClient.get(this.SERVER_URL).pipe(catchError(this.handleError));
  }

  public getCustomers() {
    return this.httpClient.get<Customer[]>(this.CUSTOMERS).pipe(catchError(this.handleError));
  }

  public getMemberships() {
    return this.httpClient.get<any[]>(this.MEMBERSHIPS).pipe(catchError(this.handleError));
  }

  public getProducts() {
    return this.httpClient.get<Insurance>(this.PRODUCTS).pipe(catchError(this.handleError));
  }
}
