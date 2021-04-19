import {Component, NgModule, OnInit} from '@angular/core';
import {Camera} from 'three';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'tjs-camera',
  template: ''
})
export class CameraComponent implements OnInit {

  camera!: Camera;

  constructor() {
  }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [
    CameraComponent
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class CameraModule {

}
