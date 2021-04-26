import {Inject, Injectable} from '@angular/core';
import {CONTENTS, MENU} from './app.providers';
import {Content, MenuItem} from './models';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  contentId$: ReplaySubject<number | string |null> = new ReplaySubject<number | string |null>(1);

  selectedMenuItem$: Observable<MenuItem | null> = this.contentId$.pipe(
    map(id => {
        if (this.menu && id !== null) {
          return this.menu.filter(mItem => mItem.path.split('/').pop() === id).shift() as MenuItem;
        }
        return null;
      }
    )
  );

  currentContent$: Observable<Content | null> = this.selectedMenuItem$.pipe(
    map(selectedMenuItem => {
        if (selectedMenuItem) {
          return this.contents.filter(content => content.id === selectedMenuItem.contentId).shift() as Content;
        }
        return null;
      }
    )
  );

  selectedGroupName$: Observable<string | null> = this.selectedMenuItem$
    .pipe(
      map(selectedMenuItem => {
        console.log('selectedMenuItem', selectedMenuItem);
        if (selectedMenuItem) {
          return 'group-' + selectedMenuItem?.id;
        }
        return null;
      })
    );

  constructor(
    @Inject(MENU) public menu: MenuItem[],
    @Inject(CONTENTS) public contents: Content[]
  ) {
  }

  set contentId(id: number | string |null) {
    this.contentId$.next(id);
  }
}
