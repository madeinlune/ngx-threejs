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

  camera: PerspectiveCamera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight);

  ngOnInit(): void {
    this.object3D = this.camera;
    this.object3D.name = this.name;
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
