import {Inject, Injectable} from '@angular/core';
import {CONTENTS, MENU} from './app.providers';
import {Content, MenuItem} from './models';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  contentId$: ReplaySubject<number> = new ReplaySubject<number>(1);

  selectedMenuItem$: Observable<MenuItem | null> = this.contentId$.pipe(
    map(id => {
        if (this.menu && !isNaN(id)) {
          return this.menu.filter(mItem => mItem.contentId === id).shift() as MenuItem;
        }
        return null;
      }
    )
  );

  selectedGroupName$: Observable<string | null> = this.selectedMenuItem$
    .pipe(
      map(selectedMenuItem => {
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

  set contentId(id: number) {
    this.contentId$.next(id);
  }
}
