import {ChangeDetectionStrategy, Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {ObjectTdEvent, OrbitControlsComponent, ThreeJsService} from 'threejs';
import {Router} from '@angular/router';
import {Content, MenuItem} from './models';
import {CONTENTS, MENU} from './app.providers';
import {Observable} from 'rxjs';
import {Vector3} from 'three';
import {SelectionService} from './selection.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  selectedGroupName$: Observable<string | null> = this.selectionService.selectedGroupName$;

  orbitControlsTarget$: Observable<Vector3> = this.selectedGroupName$.pipe(
    map(selectedGroupName => {
      const defaultPosition: Vector3 = new Vector3(0, 5, 0);
      if (selectedGroupName) {
        const position: Vector3 | undefined = this.threeJsService.scene.getObjectByName(selectedGroupName)?.position;
        return position ? position : defaultPosition;
      }
      return defaultPosition;
    }),
    tap(position => {
      if (this.orbitControlsComponent) {
        this.orbitControlsComponent.controls.target.x = position.x;
        this.orbitControlsComponent.controls.target.y = position.y;
        this.orbitControlsComponent.controls.target.z = position.z;
      }
    })
  );

  @ViewChild('orbitControls', {read: OrbitControlsComponent})
  orbitControlsComponent!: OrbitControlsComponent;

  constructor(
    @Inject(MENU) public menu: MenuItem[],
    @Inject(CONTENTS) public contents: Content[],
    private selectionService: SelectionService,
    private threeJsService: ThreeJsService,
    private router: Router,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.orbitControlsTarget$.subscribe();
  }

  onMenuObjectClicked($event: ObjectTdEvent | null): void {
    if ($event) {
      this.ngZone.run(() => {
        this.router.navigateByUrl($event.component.data.path, {state: {data: {parentName: $event.component.name}}});
      });
    }
  }
}
