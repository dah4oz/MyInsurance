import {Insurance} from './insurance';

export interface Customer {
  name: string;
  membership_type: string;
  password: string;
  age: number;
  selected_insurances: string[];
}
