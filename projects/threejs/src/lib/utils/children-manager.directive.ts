import {AfterViewInit, ContentChildren, Directive, Input, QueryList} from '@angular/core';
import {ObjectTdComponent} from '../object-td/object-td.component';
import {LightComponent} from '../lights/light.component';

@Directive({
  selector: '[tjsChildrenManager]'
})
export class ChildrenManagerDirective implements AfterViewInit {

  @ContentChildren(ObjectTdComponent) cubes: QueryList<ObjectTdComponent> | undefined;

  @ContentChildren(LightComponent) lights: QueryList<LightComponent> | undefined;

  @Input()
  tjsChildrenManager: any;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.updateChildren();
    if (this.cubes) {
      this.cubes.changes.subscribe(cubes => {
        this.updateChildren();
      });
    }
    this.updateLights();
    if (this.lights) {
      this.lights.changes.subscribe(lights => {
        this.updateLights();
      });
    }
  }

  updateChildren(): void {
    if (this.cubes) {
      this.cubes.forEach(cube => {
        if (!!cube?.object3D && !this.tjsChildrenManager.scene.getObjectByName(cube.object3D.name)) {
          this.tjsChildrenManager.scene.add(cube.object3D);
        }
      });
    }
  }

  updateLights(): void {
    if (this.lights) {
      this.lights.forEach(light => {
        if (!!light?.object3D && !this.tjsChildrenManager.scene.getObjectByName(light.object3D.name)) {
          this.tjsChildrenManager.scene.add(light.object3D);
        }
      });
    }
  }

}
