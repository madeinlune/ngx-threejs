import {AfterViewInit, Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {Camera} from 'three';
import {CommonModule} from '@angular/common';
import {ObjectTdComponent} from '../object-td';

@Component({
  selector: 'tjs-camera',
  template: ''
})
export class CameraComponent extends ObjectTdComponent implements OnInit, OnDestroy, AfterViewInit {

  camera!: Camera;

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
