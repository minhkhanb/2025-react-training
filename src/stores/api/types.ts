export interface Rest {
  url: string;
}

export interface Api {
  url: string;
}

export interface Endpoints {
  rest: Rest;
  api: Api;
}

export interface RegionData {
  endpoints: Endpoints;
}

export type ServiceType = 'rest' | 'api';
