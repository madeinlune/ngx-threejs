import {Component, forwardRef, Input, NgModule, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {LightComponent, LightOptions} from '../light.component';
import {Group, Object3D, PointLight, PointLightHelper} from 'three';
import {CommonModule} from '@angular/common';

export interface PointLightOptions extends LightOptions {

  distance?: number;
  decay?: number;

}

@Component({
  selector: 'tjs-point-light',
  templateUrl: './point-light.component.html',
  styleUrls: ['./point-light.component.css'],
  providers: [{provide: LightComponent, useExisting: forwardRef(() => PointLightComponent)}]
})
export class PointLightComponent extends LightComponent implements OnInit, OnDestroy, LightOptions, PointLightOptions {

  @Input()
  distance!: number;

  @Input()
  decay!: number;

  ngOnInit(): void {

    const pointLight: PointLight = new PointLight();
    pointLight.name = 'pointLight-' + this.name;
    this.light = pointLight;
    this.object3D = new Group();
    this.object3D.name = this.name;
    this.object3D.add(this.light);

  }

  protected update(changes?: SimpleChanges): void {
    super.update(changes);
  }

  protected createHelper(): Object3D | null {
    if (this.light) {
      return new PointLightHelper(this.light as PointLight);
    }
    return null;
  }

}

@NgModule({
  declarations: [
    PointLightComponent
  ],
  exports: [PointLightComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class PointLightModule {

}
