import {Component, forwardRef, NgModule, OnInit} from '@angular/core';
import {PerspectiveCamera} from 'three';
import {CommonModule} from '@angular/common';
import {CameraComponent, CameraModule} from '../camera.component';

@Component({
  selector: 'tjs-perspective-camera',
  templateUrl: './perspective-camera.component.html',
  styleUrls: ['./perspective-camera.component.css'],
  providers: [{provide: CameraComponent, useExisting: forwardRef(() => PerspectiveCameraComponent)}]
})
export class PerspectiveCameraComponent extends CameraComponent implements OnInit {

  camera: PerspectiveCamera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.camera.position.x = 8.978268137976093;
    this.camera.position.y = 1.4259925772313005;
    this.camera.position.z = 2.766455512629831;
  }

}

@NgModule({
  declarations: [
    PerspectiveCameraComponent
  ],
  exports: [PerspectiveCameraComponent],
  imports: [
    CommonModule,
    CameraModule
  ],
  providers: []
})
export class PerspectiveCameraModule {

}
