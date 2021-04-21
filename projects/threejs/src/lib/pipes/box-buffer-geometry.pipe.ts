import {Pipe, PipeTransform} from '@angular/core';
import {BoxBufferGeometry} from 'three';

export interface BoxOptions {
  width?: number;
  height?: number;
  depth?: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
}

@Pipe({
  name: 'boxBufferGeometry'
})
export class BoxBufferGeometryPipe implements PipeTransform {

  transform(options: BoxOptions): BoxBufferGeometry {
    return new BoxBufferGeometry(
      options.width,
      options.height,
      options.depth,
      options.widthSegments,
      options.heightSegments,
      options.depthSegments
    );
  }

}
