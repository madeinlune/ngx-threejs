import {Component, forwardRef, Inject, Input, NgModule, OnDestroy, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {Group, Object3D, SpotLight, SpotLightHelper} from 'three';
import {CommonModule} from '@angular/common';
import {LightComponent} from '../light.component';
import {PointLightOptions} from '../point-light/point-light.component';
import {ThreeJsParent} from '../../models/three-js-parent';
import {HELPERS_COLOR} from '../../providers';
import {ThreeJsService} from '../../three-js.service';

export interface SportLightOptions extends PointLightOptions {

  penumbra?: number;
  angle?: number;

}

@Component({
  selector: 'tjs-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.css'],
  providers: [{provide: LightComponent, useExisting: forwardRef(() => SpotlightComponent)}]
})
export class SpotlightComponent extends LightComponent implements OnInit, OnDestroy, SportLightOptions {

  @Input()
  penumbra!: number;

  @Input()
  angle!: number;

  constructor(
    @Optional() @SkipSelf() protected parent: ThreeJsParent,
    protected threeJsService: ThreeJsService,
    @Inject(HELPERS_COLOR) private helpersColor: number
  ) {
    super(parent, threeJsService);
  }

  ngOnInit(): void {

    const spotLight: SpotLight = new SpotLight();
    spotLight.name = 'ambientLight-' + this.name;
    this.light = spotLight;
    this.object3D = new Group();
    this.object3D.name = this.name;
    this.object3D.add(this.light);

  }

  protected createHelper(): Object3D | null {
    if (this.light) {
      return new SpotLightHelper(this.light as SpotLight, this.helpersColor);
    }
    return null;
  }

  protected update(changes?: SimpleChanges): void {
    super.update(changes);
    if (this.light) {
      if (!isNaN(this.penumbra)) {
        (this.light as SpotLight).penumbra = this.penumbra;
      }
      if (!isNaN(this.angle)) {
        (this.light as SpotLight).angle = this.angle;
      }
    }
  }

}

@NgModule({
  declarations: [
    SpotlightComponent
  ],
  exports: [SpotlightComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class SpotlightModule {
}
