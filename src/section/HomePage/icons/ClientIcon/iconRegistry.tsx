import Client1 from './client1';
import Client2 from './client2';
import Client3 from './client3';
import Client4 from './client4';
import Client5 from './client5';
import Client6 from './client6';
import Client7 from './client7';

export const iconClientRegistry = {
  Client1,
  Client2,
  Client3,
  Client4,
  Client5,
  Client6,
  Client7,
};

export type IconClientName = keyof typeof iconClientRegistry;
