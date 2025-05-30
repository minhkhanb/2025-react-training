import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { RegionData, ServiceType } from '@src/stores/api/types';
import { config } from '@src/config/envConfig';

type ApiState = {
  regionConfig: RegionData | null;
};

type ApiActions = {
  getEndpoint: (service: ServiceType, endpointUrl?: string) => string;
  getServiceRegionalUrl: (service: ServiceType) => string;
};

type ApiStore = ApiState & ApiActions;

const defaultInitState: ApiState = {
  regionConfig: null,
};

const isClient = typeof window !== 'undefined';

const createApiStore = (initState: ApiState = defaultInitState) =>
  create<ApiStore>()(
    isClient
      ? devtools(
          persist(
            (_set, getState) => ({
              ...initState,
              // Initial state and actions can be defined here
              getEndpoint: (service: ServiceType, endpointUrl = '') => {
                if (!endpointUrl) {
                  return getState().getServiceRegionalUrl(service);
                }

                return getState().getServiceRegionalUrl(service) + endpointUrl;
              },
              getServiceRegionalUrl: (service: ServiceType) => {
                const state = getState();

                if (!state.regionConfig) {
                  return config.REST_API_URL;
                }

                if (service === 'rest') {
                  return state.regionConfig.endpoints.rest.url;
                }

                if (service === 'api') {
                  return state.regionConfig.endpoints.api.url;
                }

                return '';
              },
            }),
            {
              name: 'api-storage',
              onRehydrateStorage: () => _state => {
                // Actions to perform after rehydration can be defined here
              },
            }
          ),
          { name: 'ApiStore' }
        )
      : _set => ({
          regionConfig: null,
          getEndpoint: (_service, _endpointUrl) => '',
          getServiceRegionalUrl: _service => '',
        })
  );

export const useApiStore = createApiStore();
