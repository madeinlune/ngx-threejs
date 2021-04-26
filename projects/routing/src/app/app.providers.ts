import {InjectionToken, Provider} from '@angular/core';
import {Content, MenuItem} from './models';
import {SlugifyPipe} from 'ngx-pipes';

export interface Color{
  color: string;
  label: string;
}

export const COLORS = new InjectionToken<Color[]>(
  'COLORS'
);

export const MENU = new InjectionToken<MenuItem[]>(
  'MENU'
);

export const CONTENTS = new InjectionToken<Content[]>(
  'CONTENTS'
);

export const APP_ROUTING_PROVIDERS: Provider[] = [
  SlugifyPipe,
  {
    provide: COLORS,
    useFactory: colorsFactory
  },
  {
    provide: MENU,
    deps: [SlugifyPipe, COLORS],
    useFactory: menuFactory
  },
  {
    provide: CONTENTS,
    deps: [SlugifyPipe, COLORS],
    useFactory: contentsFactory
  }
];

export function colorsFactory(): Color[] {

  const colors: Color[] = [
    {
      color: '#042A2B',
      label: 'Rich Black'
    },
    {
      color: '#5EB1BF',
      label: 'Maximum Blue'
    },
    {
      color: '#CDEDF6',
      label: 'Light Cyan'
    },
    {
      color: '#EF7B45',
      label: 'Mandarin'
    },
    {
      color: '#D84727',
      label: 'Vermilion'
    }
  ];
  return colors;

}

export function menuFactory(
  slugifyPipe: SlugifyPipe,
  colors: Color[]
): MenuItem[] {

  const menu: MenuItem[] = [];
  for (let i = 0; i < 5; i++) {
    const color: Color = colors[i];
    const label: string = color.label;
    menu.push({
      id: i,
      label,
      path: '/color/' + slugifyPipe.transform(label),
      contentId: i,
      color: color.color
    });
  }

  return menu;

}

export function contentsFactory(
  slugifyPipe: SlugifyPipe,
  colors: Color[]
): Content[] {

  const contents: Content[] = [];
  for (let i = 0; i < 5; i++) {
    const color: Color = colors[i];
    const label: string = color.label;
    contents.push({
      id: i,
      label,
      path: '/color/' + slugifyPipe.transform(label),
      color: color.color
    });
  }

  return contents;
}
