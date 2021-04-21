import {Pipe, PipeTransform} from '@angular/core';
import {Vector3} from 'three';

@Pipe({
  name: 'vector3'
})
export class Vector3Pipe implements PipeTransform {

  transform(vector: { x: number, y: number, z: number }): Vector3 {
    return new Vector3(vector.x, vector.y, vector.z);
  }

}
