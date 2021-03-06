import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CONTENTS, MENU} from '../app.providers';
import {Content, MenuItem} from '../models';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {SelectionService} from '../selection.service';

@Component({
  selector: 'app-rock',
  templateUrl: './rock.component.html',
  styleUrls: ['./rock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RockComponent implements OnInit {

  id$: Observable<number> = this.activatedRoute.params.pipe(
    filter(params => !!params?.id),
    map(params => params.id)
  );

  selectedGroupName$: Observable<string | null> = this.selectionService.selectedGroupName$;
  currentContent$: Observable<Content | null> = this.selectionService.currentContent$;

  constructor(
    @Inject(MENU) public menu: MenuItem[],
    @Inject(CONTENTS) public contents: Content[],
    private selectionService: SelectionService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id$.subscribe(id => {
      console.log('id', id);
      this.selectionService.contentId = id;
    });
  }

}
