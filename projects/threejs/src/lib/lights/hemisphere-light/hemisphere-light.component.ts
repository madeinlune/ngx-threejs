import {Component, forwardRef, Inject, Input, NgModule, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {LightComponent} from '../light.component';
import {ThreeJsParent} from '../../models/three-js-parent';
import {ThreeJsService} from '../../three-js.service';
import {HELPERS_COLOR} from '../../providers';
import {Group, HemisphereLight} from 'three';
import {Color} from 'three/src/math/Color';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'tjs-hemisphere-light',
  templateUrl: './hemisphere-light.component.html',
  styleUrls: ['./hemisphere-light.component.css'],
  providers: [{provide: LightComponent, useExisting: forwardRef(() => HemisphereLightComponent)}]
})
export class HemisphereLightComponent extends LightComponent implements OnInit {

  @Input()
  groundColor!: Color | string | number;

  constructor(
    @Optional() @SkipSelf() protected parent: ThreeJsParent,
    protected threeJsService: ThreeJsService,
    @Inject(HELPERS_COLOR) private helpersColor: number
  ) {
    super(parent, threeJsService);
  }

  ngOnInit(): void {

    const hemisphereLight: HemisphereLight = new HemisphereLight();
    hemisphereLight.name = 'hemisphereLight-' + this.name;
    this.light = hemisphereLight;
    this.object3D = new Group();
    this.object3D.name = this.name;
    this.object3D.add(this.light);

  }

  protected update(changes?: SimpleChanges): void {
    super.update(changes);

    const hemisphereLight: HemisphereLight = this.light as HemisphereLight;

    if (hemisphereLight) {

      if (this.groundColor) {
        hemisphereLight.groundColor = new Color(this.groundColor);
      }

    }

  }

}

@NgModule({
  declarations: [
    HemisphereLightComponent
  ],
  exports: [HemisphereLightComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class HemisphereLightModule {

}
