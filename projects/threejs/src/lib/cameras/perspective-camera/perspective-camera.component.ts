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
    this.camera.position.x = -5.417192891642792;
    this.camera.position.y = -5.854422890451136;
    this.camera.position.z = -7.18012891680061;
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
