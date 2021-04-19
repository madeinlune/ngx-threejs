import {Component, Input, OnInit} from '@angular/core';
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
export class LightComponent extends ObjectTdComponent implements OnInit, LightOptions {

  @Input()
  color!: Color;

  @Input()
  intensity!: number;

  @Input()
  castShadow!: boolean;

  protected light!: Light;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
