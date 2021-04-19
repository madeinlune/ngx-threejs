import {Pipe, PipeTransform} from '@angular/core';
import {Vector3} from 'three';

@Pipe({
  name: 'circleLayout'
})
export class CircleLayoutPipe implements PipeTransform {

  transform(center: { x: number, y: number, z: number }, radius: number, angle: number): Vector3 {
    const x: number = center.x + radius * Math.cos(angle);
    const y = 0;
    const z: number = center.z + radius * Math.sin(angle);
    return new Vector3(x, y, z);
  }

}
