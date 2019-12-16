import {Price} from './price';
import {Info} from './info';

export interface Insurance {
  [insuranceName: string]: {
    availability: string;
    type: string;
    prices: Price[];
    info: Info;
  };
}
