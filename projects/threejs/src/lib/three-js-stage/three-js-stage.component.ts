import {AfterViewInit, Component, ElementRef, forwardRef, Input, NgModule, OnInit} from '@angular/core';
import {Camera, GridHelper, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {ThreeJsService} from '../three-js.service';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {CommonModule} from '@angular/common';
import {ThreeJsParent} from '../models/three-js-parent';
import {ObjectTdComponent} from '../object-td';

@Component({
  selector: 'tjs-three-js-stage',
  templateUrl: './three-js-stage.component.html',
  styleUrls: ['./three-js-stage.component.scss'],
  providers: [
    {provide: ThreeJsParent, useExisting: forwardRef(() => ThreeJsStageComponent)}
  ]
})
export class ThreeJsStageComponent implements OnInit, AfterViewInit, ThreeJsParent {

  scene!: Scene;
  renderer!: WebGLRenderer;

  @Input()
  camera!: Camera;

  @Input()
  set orbitControls(value: OrbitControls) {
    this.threeJsService.orbitControls = value;
  }

  constructor(
    private hostElement: ElementRef,
    public threeJsService: ThreeJsService
  ) {
  }

  ngOnInit(): void {

    this.scene = new Scene();

    this.renderer = new WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x303030);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene.add(new GridHelper(50, 1));

    this.hostElement.nativeElement.appendChild(this.renderer.domElement);

    if (this.camera) {
      this.threeJsService.camera = this.camera;
    }
    this.threeJsService.scene = this.scene;
    this.threeJsService.renderer = this.renderer;

    this.threeJsService.animate();

    window.addEventListener('resize', this.onWindowResize.bind(this), false);

  }

  onWindowResize(): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;

    this.renderer.setSize(width, height);

    const pixelRatio = this.renderer.getPixelRatio();

    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
  }

  ngAfterViewInit(): void {
  }

  add(o: ObjectTdComponent): void {
    this.scene.add(o.object3D);
  }

  remove(o: ObjectTdComponent): void {
    this.scene.remove(o.object3D);
  }

}

@NgModule({
  declarations: [
    ThreeJsStageComponent
  ],
  exports: [ThreeJsStageComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class ThreeJsStageModule {

}
