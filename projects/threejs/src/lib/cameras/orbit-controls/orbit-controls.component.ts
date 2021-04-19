import {Component, Input, NgModule, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Camera, Vector3, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {CommonModule} from '@angular/common';

export interface OrbitControlsOptions {
  minDistance?: number;
  maxDistance?: number;

  minZoom?: number;
  maxZoom?: number;

  minPolarAngle?: number;
  maxPolarAngle?: number;

  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;

  enableDamping?: boolean;
  dampingFactor?: number;

  enableZoom?: boolean;
  zoomSpeed?: number;

  enableRotate?: boolean;
  rotateSpeed?: number;

  enablePan?: boolean;
  panSpeed?: number;
  screenSpacePanning?: boolean;
  keyPanSpeed?: number;

  autoRotate?: boolean;
  autoRotateSpeed?: number;

  enableKeys?: boolean;
}

interface IAction<K extends keyof OrbitControlsOptions> {
  name: K;
  value: OrbitControlsOptions[K];
}


@Component({
  selector: 'tjs-orbit-controls',
  templateUrl: './orbit-controls.component.html',
  styleUrls: ['./orbit-controls.component.css']
})
export class OrbitControlsComponent implements OnInit, OnChanges {

  constructor() {
  }

  @Input()
  target!: Vector3;

  @Input()
  camera!: Camera;

  @Input()
  renderer!: WebGLRenderer;

  @Input()
  options: OrbitControlsOptions | undefined;

  public controls!: OrbitControls;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.camera && this.renderer) {

      if (!this.controls) {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
      }

    }
    if (this.controls) {
      if (this.target) {
        this.controls.target.set(this.target.x, this.target.y, this.target.z);
      }
      if (this.options) {
        const options: OrbitControlsOptions = this.options;
        type OrbitControlsOption = keyof OrbitControlsOptions;
        Object.keys(options).forEach((key) => {
          const prop: OrbitControlsOption = key as OrbitControlsOption;
          if (prop && options.hasOwnProperty(prop) && this.controls?.hasOwnProperty(prop)) {
            this.assign(this.controls, {name: prop, value: options[prop]});
          }
        });
      }
    }

  }

  assign<K extends keyof OrbitControlsOptions>(orbitControls: OrbitControlsOptions, action: IAction<K>): void {
    orbitControls[action.name] = action.value;
  }

}

@NgModule({
  declarations: [
    OrbitControlsComponent
  ],
  exports: [OrbitControlsComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class OrbitControlsModule {

}
