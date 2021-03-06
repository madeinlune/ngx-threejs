import {Component, forwardRef, Inject, Input, NgModule, OnDestroy, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {LightComponent, LightOptions} from '../light.component';
import {Group, Object3D, PointLight, PointLightHelper} from 'three';
import {CommonModule} from '@angular/common';
import {HELPERS_COLOR} from '../../providers/three-js.providers';
import {ThreeJsParent} from '../../models/three-js-parent';
import {ThreeJsService} from '../../three-js.service';

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

  constructor(
    @Optional() @SkipSelf() protected parent: ThreeJsParent,
    protected threeJsService: ThreeJsService,
    @Inject(HELPERS_COLOR) private helpersColor: number
  ) {
    super(parent, threeJsService);
  }

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
      return new PointLightHelper(this.light as PointLight, undefined, this.helpersColor);
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
