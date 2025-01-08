import * as L from 'leaflet';

declare module 'leaflet' {
  export * from '@types/leaflet'
  export = L;
}

