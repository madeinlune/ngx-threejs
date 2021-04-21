import {InjectionToken, Provider} from '@angular/core';
import {Content, MenuItem} from './models';

export const MENU = new InjectionToken<MenuItem[]>(
  'MENU'
);

export const CONTENTS = new InjectionToken<Content[]>(
  'CONTENTS'
);

export const APP_ROUTING_PROVIDERS: Provider[] = [
  {
    provide: MENU,
    useFactory: menuFactory
  },
  {
    provide: CONTENTS,
    useFactory: contentsFactory
  }
];

export function menuFactory(): MenuItem[] {

  const menu: MenuItem[] = [];
  for (let i = 0; i < 5; i++) {
    menu.push({
      id: i,
      label: 'Rock 0' + (i + 1),
      path: 'rock/' + i,
      contentId: i
    });
  }

  return menu;

}

export function contentsFactory(): Content[] {

  const contents: Content[] = [];
  for (let i = 0; i < 5; i++) {
    contents.push({
      id: i,
      label: 'Node Rock 0' + (i + 1),
      path: 'rock/' + i
    });
  }

  return contents;
}
