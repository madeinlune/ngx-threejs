import {Component, forwardRef, Input, NgModule, OnDestroy, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {LightComponent, LightOptions} from '../light.component';
import {Group, Object3D, PointLight, PointLightHelper} from 'three';
import {CommonModule} from '@angular/common';
import {ThreeJsParent} from '../../models/three-js-parent';

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
export class PointLightComponent extends LightComponent implements OnInit, OnDestroy, LightOptions {

  @Input()
  distance!: number;

  @Input()
  decay!: number;

  constructor(
    @Optional() @SkipSelf() private parent: ThreeJsParent
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.parent.remove(this);
  }

  ngOnInit(): void {

    const pointLight: PointLight = new PointLight(0xffffff, 5);
    pointLight.name = 'pointLight-' + this.name;
    this.light = pointLight;
    this.light.castShadow = true;
    this.object3D = new Group();
    this.object3D.name = this.name;
    this.object3D.add(this.light);

    this.parent.add(this);

  }

  protected update(changes?: SimpleChanges): void {
    super.update(changes);
  }

  protected createHelper(): Object3D | null {
    return new PointLightHelper(this.light as PointLight);
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
