import {Injectable, NgZone} from '@angular/core';
import {Camera, Scene, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Renderable} from './models/renderable';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';

@Injectable({
  providedIn: 'root'
})
export class ThreeJsService {

  renderer: WebGLRenderer | undefined;
  camera: Camera | undefined;
  scene: Scene | undefined;
  orbitControls: OrbitControls | undefined;
  composer: EffectComposer | undefined;

  renderers: Renderable[] = [];

  constructor(
    private ngZone: NgZone
  ) {
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

      if (this.composer) {
        this.composer.render(time);
      } else if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }

    });

  }

}
