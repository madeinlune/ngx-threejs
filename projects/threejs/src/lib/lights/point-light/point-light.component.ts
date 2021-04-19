import {Component, forwardRef, NgModule, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {LightComponent} from '../light.component';
import {Group, PointLight, PointLightHelper} from 'three';
import {CommonModule} from '@angular/common';
import {ThreeJsParent} from '../../models/three-js-parent';

@Component({
  selector: 'tjs-point-light',
  templateUrl: './point-light.component.html',
  styleUrls: ['./point-light.component.css'],
  providers: [{provide: LightComponent, useExisting: forwardRef(() => PointLightComponent)}]
})
export class PointLightComponent extends LightComponent implements OnInit, OnDestroy {

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
    pointLight.name = '' + Math.random() * 0xFFFFFF;
    this.light = pointLight;
    this.light.castShadow = true;
    this.object3D = new Group();
    this.object3D.name = this.name;
    this.object3D.add(this.light);

    this.parent.add(this);

    const lightHelper: PointLightHelper = new PointLightHelper(pointLight);
    // this.object3D.add(lightHelper);

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
