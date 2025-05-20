import Customer1 from './customer1';
import Customer2 from './customer2';
import Customer3 from './customer3';
import Customer4 from './customer4';
import Customer5 from './customer5';
import Customer6 from './customer6';

export const iconCustomerRegistry = {
  Customer1,
  Customer2,
  Customer3,
  Customer4,
  Customer5,
  Customer6,
};

export type IconCustomerName = keyof typeof iconCustomerRegistry;
