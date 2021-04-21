import {Component, forwardRef, Inject, NgModule, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {LightComponent} from '../light.component';
import {DirectionalLight, DirectionalLightHelper, Group, Object3D} from 'three';
import {HELPERS_COLOR} from '../../providers';
import {ThreeJsParent} from '../../models/three-js-parent';
import {CommonModule} from '@angular/common';
import {ThreeJsService} from '../../three-js.service';

@Component({
  selector: 'tjs-directional-light',
  templateUrl: './directional-light.component.html',
  styleUrls: ['./directional-light.component.css'],
  providers: [{provide: LightComponent, useExisting: forwardRef(() => DirectionalLightComponent)}]
})
export class DirectionalLightComponent extends LightComponent implements OnInit {

  constructor(
    @Optional() @SkipSelf() protected parent: ThreeJsParent,
    protected threeJsService: ThreeJsService,
    @Inject(HELPERS_COLOR) private helpersColor: number
  ) {
    super(parent, threeJsService);
  }

  ngOnInit(): void {

    const directionalLight: DirectionalLight = new DirectionalLight();
    directionalLight.name = '' + Math.random() * 0xFFFFFF;
    this.light = directionalLight;
    this.object3D = new Group();
    this.object3D.name = this.name;
    this.object3D.add(this.light);

  }

  protected createHelper(): Object3D | null {
    if (this.light) {
      return new DirectionalLightHelper(this.light as DirectionalLight, undefined, this.helpersColor);
    }
    return null;
  }

  protected update(changes?: SimpleChanges): void {
    super.update(changes);

    const dirLight: DirectionalLight = this.light as DirectionalLight;

    if (this.castShadow && dirLight) {
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 500;
      dirLight.shadow.camera.right = 17;
      dirLight.shadow.camera.left = -17;
      dirLight.shadow.camera.top = 17;
      dirLight.shadow.camera.bottom = -17;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.radius = 4;
      dirLight.shadow.bias = -0.0005;
    }

  }

}

@NgModule({
  declarations: [
    DirectionalLightComponent
  ],
  exports: [DirectionalLightComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class DirectionalLightModule {

}
