import {AfterViewInit, Component, ElementRef, forwardRef, Input, NgModule, OnInit} from '@angular/core';
import {Camera, Fog, GridHelper, HemisphereLight, PCFSoftShadowMap, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer} from 'three';
import {ThreeJsService} from '../three-js.service';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {CommonModule} from '@angular/common';
import {ThreeJsParent} from '../models/three-js-parent';
import {ObjectTdComponent} from '../object-td';
import {Color} from 'three/src/math/Color';

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
  backgroundColor!: Color | string | number;

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
    // TODO add fog as Scene Param
    this.scene.fog = new Fog(this.backgroundColor, 10, 50);

    this.renderer = new WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(this.backgroundColor);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.outputEncoding = sRGBEncoding;

    this.scene.add(new GridHelper(50, 10));

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

    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
  }

  ngAfterViewInit(): void {
  }

  add(o: ObjectTdComponent, parentName?: string): void {
    if (parentName) {
      this.scene.getObjectByName(parentName)?.add(o.object3D);
    } else {
      this.scene.add(o.object3D);
    }
  }

  remove(o: ObjectTdComponent, parentName?: string): void {
    if (parentName) {
      this.scene.getObjectByName(parentName)?.remove(o.object3D);
    } else {
      this.scene.remove(o.object3D);
    }
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
