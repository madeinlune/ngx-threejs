import {InjectionToken, Provider} from '@angular/core';
import {Content, MenuItem} from './models';
import {SlugifyPipe} from 'ngx-pipes';

export const MENU = new InjectionToken<MenuItem[]>(
  'MENU'
);

export const CONTENTS = new InjectionToken<Content[]>(
  'CONTENTS'
);

export const APP_ROUTING_PROVIDERS: Provider[] = [
  SlugifyPipe,
  {
    provide: MENU,
    deps: [SlugifyPipe],
    useFactory: menuFactory
  },
  {
    provide: CONTENTS,
    deps: [SlugifyPipe],
    useFactory: contentsFactory
  }
];

export function menuFactory(
  slugifyPipe: SlugifyPipe
): MenuItem[] {

  const colors: string[] = ['#042A2B', '#5EB1BF', '#CDEDF6', '#EF7B45', '#D84727'];
  const colorNames: string[] = ['Rich Black', 'Maximum Blue', 'Light Cyan', 'Mandarin', 'Vermilion'];

  const menu: MenuItem[] = [];
  for (let i = 0; i < 5; i++) {
    const label: string = colorNames[i];
    menu.push({
      id: i,
      label,
      path: '/color/' + slugifyPipe.transform(label),
      contentId: i,
      color: colors[i]
    });
  }

  return menu;

}

export function contentsFactory(
  slugifyPipe: SlugifyPipe
): Content[] {

  const colors: string[] = ['#042A2B', '#5EB1BF', '#CDEDF6', '#EF7B45', '#D84727'];
  const colorNames: string[] = ['Rich Black', 'Maximum Blue', 'Light Cyan', 'Mandarin', 'Vermilion'];

  const contents: Content[] = [];
  for (let i = 0; i < 5; i++) {
    const label: string = colorNames[i];
    contents.push({
      id: i,
      label,
      path: '/color/' + slugifyPipe.transform(label),
      color: colors[i]
    });
  }

  return contents;
}
