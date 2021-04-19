import {Component, forwardRef, NgModule, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AmbientLight, Group} from 'three';
import {LightComponent, LightOptions} from '../light.component';

@Component({
  selector: 'tjs-ambient-light',
  templateUrl: './ambient-light.component.html',
  styleUrls: ['./ambient-light.component.css'],
  providers: [{provide: LightComponent, useExisting: forwardRef(() => AmbientLightComponent)}]
})
export class AmbientLightComponent extends LightComponent implements OnInit, OnDestroy, LightOptions {

  ngOnInit(): void {

    const ambientLight: AmbientLight = new AmbientLight();
    ambientLight.name = 'ambientLight-' + this.name;
    this.light = ambientLight;
    this.object3D = new Group();
    this.object3D.name = this.name;
    this.object3D.add(this.light);

  }

}

@NgModule({
  declarations: [
    AmbientLightComponent
  ],
  exports: [AmbientLightComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class AmbientLightModule {

}
