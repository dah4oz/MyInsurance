import { Component, OnInit } from '@angular/core';
import {Customer} from '../models/customer';
import {Insurance} from '../models/insurance';
import {ApiService} from '../api.service';
import {Price} from '../models/price';
import {currentUser} from '../global';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customersList: Customer[];
  membershipList: any[];
  products: Insurance;
  selectedCustomer: Customer;
  availableInsurances: Insurance = {} as Insurance;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getCustomers().subscribe((data) => {
      this.customersList = data;
      for (const customer of this.customersList) {
        if (customer.name === currentUser.username) {
          this.selectedCustomer = customer;
        }
      }
    });
    this.apiService.getMemberships().subscribe((data) => {
      this.membershipList = data;
      console.log('memberships', this.membershipList);
    });
    this.apiService.getProducts().subscribe((data) => {
      this.products = data;
      console.log('Products', this.products);
      this.checkAvailableInsurances();
    });
  }

  keys(membership: any): Array<string> {
    return Object.keys(membership);
  }

  checkAvailableInsurances() {
    for (const insurance of this.selectedCustomer.selected_insurances) {
      const productLevel = this.membershipList[0][this.products[insurance].availability];
      const customerLevel = this.membershipList[0][this.selectedCustomer.membership_type];
      if (productLevel <= customerLevel) {
        this.availableInsurances[insurance] = this.products[insurance];
      }
    }
  }

  showPrice(prices: Price[]) {
    for (const price of prices) {
      if (price.maxAge >= this.selectedCustomer.age && price.minAge <= this.selectedCustomer.age) {
        return `${price.currency}${price.price}`;
      }
    }
  }

}
