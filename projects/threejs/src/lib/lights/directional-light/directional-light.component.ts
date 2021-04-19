import {Component, forwardRef, OnInit} from '@angular/core';
import {LightComponent} from '../light.component';
import {DirectionalLight, DirectionalLightHelper, Group} from 'three';

@Component({
  selector: 'tjs-directional-light',
  templateUrl: './directional-light.component.html',
  styleUrls: ['./directional-light.component.css'],
  providers: [{provide: LightComponent, useExisting: forwardRef(() => DirectionalLightComponent)}]
})
export class DirectionalLightComponent extends LightComponent implements OnInit {

  ngOnInit(): void {

    const directionalLight: DirectionalLight = new DirectionalLight();
    directionalLight.name = '' + Math.random() * 0xFFFFFF;
    this.light = directionalLight;
    this.light.castShadow = true;
    this.object3D = new Group();
    this.object3D.name = this.name;
    this.object3D.add(this.light);

    const lightHelper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight);
    // this.object3D.add(lightHelper);

  }

}
