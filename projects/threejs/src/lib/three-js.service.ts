import {Injectable, NgZone} from '@angular/core';
import {Camera, Intersection, Raycaster, Scene, Vector2, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Renderable} from './models/renderable';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {ObjectTdComponent} from './object-td';

@Injectable({
  providedIn: 'root'
})
export class ThreeJsService {

  renderer!: WebGLRenderer;
  camera!: Camera;
  scene!: Scene;
  orbitControls!: OrbitControls;
  composer!: EffectComposer;

  renderers: Renderable[] = [];

  mouse: Vector2 = new Vector2();
  raycaster: Raycaster = new Raycaster();

  intersected: ObjectTdComponent | undefined | null;
  clicked: ObjectTdComponent | undefined | null;

  constructor(
    private ngZone: NgZone
  ) {

  }

  onMouseMove(event: MouseEvent): void {

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  }

  onTouchMove(event: TouchEvent): void {

    this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

  }

  onMouseClick(event: MouseEvent): void {

    event.preventDefault();

    if (this.clicked) {
      this.clicked.active = false;
    }

    this.clicked = this.intersected;

    if (this.clicked) {
      this.clicked.active = true;
    }

  }

  onTouchStart(event: TouchEvent): void {

    this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

    if (this.clicked) {
      this.clicked.active = false;
    }

    this.clicked = this.intersected;

    if (this.clicked) {
      this.clicked.active = true;
    }

  }

  addRenderer(renderer: Renderable): void {
    this.renderers.push(renderer);
  }

  animate(): void {

    this.ngZone.runOutsideAngular(() => {

      requestAnimationFrame(this.animate.bind(this));

      const time = performance.now() * .001;

      this.renderers.forEach(renderer => {
        if (typeof renderer?.render === 'function') {
          renderer.render();
        }
      });

      if (!!this.orbitControls) {
        this.orbitControls.update();
      }

      this.raycaster.setFromCamera(this.mouse, this.camera);

      // calculate objects intersecting the picking ray
      const intersects: Intersection[] = this.raycaster.intersectObjects(this.scene.children, true)
        .filter(intersect => intersect.object.userData?.component?.isButton);

      if (intersects.length > 0) {

        const component: ObjectTdComponent = intersects[0].object.userData?.component;
        if (this.intersected !== component) {

          if (this.intersected) {
            this.ngZone.run(() => {
              if (this.intersected) {

                this.intersected.hovered = false;
                this.renderer.domElement.style.cursor = 'auto';
              }
            });
          }

          this.intersected = component;
          this.ngZone.run(() => {
            if (this.intersected) {
              this.intersected.hovered = true;
              this.renderer.domElement.style.cursor = 'pointer';
            }
          });

        }

      } else {

        if (this.intersected) {
          this.ngZone.run(() => {
            if (this.intersected) {
              this.intersected.hovered = false;
              this.renderer.domElement.style.cursor = 'auto';
            }
          });
        }

        this.intersected = null;

      }


      if (this.composer) {
        this.composer.render(time);
      } else if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }

    });

  }

}
