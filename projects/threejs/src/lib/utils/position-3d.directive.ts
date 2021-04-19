import {Directive, Input} from '@angular/core';
import {Vector3} from 'three';
import {ObjectTdComponent} from '../object-td/object-td.component';

@Directive({
  selector: '[position3d]'
})
export class Position3dDirective {

  @Input()
  position3d!: Vector3;

  constructor(
    private host: ObjectTdComponent
  ) {
    console.log('this.host', this.host);
  }

}
