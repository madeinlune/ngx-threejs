import {InjectionToken, Provider} from '@angular/core';

export const HELPERS_COLOR = new InjectionToken<number>(
  'HELPERS_COLOR'
);

export const THREE_JS_PROVIDERS: Provider[] = [
  {
    provide: HELPERS_COLOR,
    useValue: 0xFFFFFF,
  }
];
