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
    const id: number = i + 1;
    menu.push({
      id,
      label: 'Cube 0' + id,
      path: '/rock/' + id,
      contentId: id
    });
  }

  return menu;

}

export function contentsFactory(): Content[] {

  const contents: Content[] = [];
  for (let i = 0; i < 5; i++) {
    const id: number = i + 1;
    contents.push({
      id,
      label: 'Cube 0' + id,
      path: '/rock/' + id
    });
  }

  return contents;
}
