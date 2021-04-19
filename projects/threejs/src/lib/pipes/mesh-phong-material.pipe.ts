import {Pipe, PipeTransform} from '@angular/core';
import {MeshPhongMaterial, MeshPhongMaterialParameters} from 'three';

@Pipe({
  name: 'meshPhongMaterial'
})
export class MeshPhongMaterialPipe implements PipeTransform {

  transform(parameters: MeshPhongMaterialParameters): MeshPhongMaterial {
    return new MeshPhongMaterial({
      ...parameters
    });
  }

}
