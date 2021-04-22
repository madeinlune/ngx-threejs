import {ChangeDetectionStrategy, Component, Inject, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ObjectTdEvent, OrbitControlsComponent, ThreeJsFontService, ThreeJsService} from 'threejs';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {Content, MenuItem} from './models';
import {CONTENTS, MENU} from './app.providers';
import {Observable} from 'rxjs';
import {Vector3} from 'three';
import {SelectionService} from './selection.service';
import {filter, map, tap} from 'rxjs/operators';
import {gsap} from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  selectedGroupName$: Observable<string | null> = this.selectionService.selectedGroupName$;

  orbitControlsTarget$: Observable<Vector3> = this.selectedGroupName$.pipe(
    map(selectedGroupName => {
      const defaultPosition: Vector3 = new Vector3(0, 5, 0);
      if (selectedGroupName) {
        const position: Vector3 | undefined = this.threeJsService.scene.getObjectByName(selectedGroupName)?.position;
        if (position) {
          defaultPosition.x = position.x;
          defaultPosition.y = 5;
          defaultPosition.z = position.z;
        }
        return defaultPosition;
      }
      return defaultPosition;
    }),
    tap(position => {
      if (this.orbitControlsComponent) {
        gsap.to(this.orbitControlsComponent.controls.target,
          {x: position.x, y: position.y, z: position.z, duration: 0.5}
        );
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
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private fontService: ThreeJsFontService
  ) {
  }

  ngOnInit(): void {
    console.log('menu', this.menu);
    this.fontService.loadFont('assets/font/AauxPro-Thin.ttf');
    this.orbitControlsTarget$.subscribe();
    this.activatedRoute.url.subscribe(url => console.log('url', url));
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: Event) => {
      if ((event as NavigationEnd).url === '/') {
        this.selectionService.contentId = null;
      }
    });
  }

  onMenuObjectClicked($event: ObjectTdEvent | null): void {
    if ($event) {
      console.log('$event.component.data.path', $event.component.data.path);
      this.ngZone.run(() => {
        this.router.navigateByUrl($event.component.data.path);
      });
    }
  }

  onRockClicked($event: ObjectTdEvent | null): void {
    this.ngZone.run(() => {
      this.router.navigateByUrl('/');
    });
  }
}
