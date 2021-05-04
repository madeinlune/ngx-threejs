import {AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HemisphereLight, Light} from 'three';
import {ObjectTdComponent} from '../object-td/object-td.component';
import {Color} from 'three/src/math/Color';

export interface LightOptions {
  color?: Color | string | number;
  intensity?: number;
  castShadow?: boolean;
}

@Component({
  selector: 'tjs-light',
  template: ''
})
export class LightComponent extends ObjectTdComponent implements OnInit, OnDestroy, AfterViewInit, LightOptions {

  @Input()
  color!: Color | string | number;

  @Input()
  intensity!: number;

  @Input()
  castShadow = false;

  protected light!: Light;

  protected update(changes?: SimpleChanges): void {
    super.update(changes);

    if (this.light) {

      if (!isNaN(this.intensity)) {
        this.light.intensity = this.intensity;
      }

      if (this.color) {
        this.light.color = new Color(this.color);
      }

      if (this.light.type !== 'HemisphereLight') {
        this.light.castShadow = this.castShadow;
      }

    }

  }

}
