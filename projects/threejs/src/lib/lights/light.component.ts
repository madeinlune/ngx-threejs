import {AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Light} from 'three';
import {ObjectTdComponent} from '../object-td/object-td.component';
import {Color} from 'three/src/math/Color';

export interface LightOptions {
  color?: Color;
  intensity?: number;
  castShadow?: boolean;
}

@Component({
  selector: 'tjs-light',
  template: ''
})
export class LightComponent extends ObjectTdComponent implements OnInit, OnDestroy, AfterViewInit, LightOptions {

  @Input()
  color!: Color;

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
        this.light.color = this.color;
      }

      this.light.castShadow = this.castShadow;

    }

  }

}
