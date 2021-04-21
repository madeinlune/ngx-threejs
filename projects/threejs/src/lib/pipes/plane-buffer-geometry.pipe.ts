import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaneBufferGeometry} from 'three';
import {BoxOptions} from './box-buffer-geometry.pipe';

@Pipe({
  name: 'planeBufferGeometry'
})
export class PlaneBufferGeometryPipe implements PipeTransform {

  transform(options: BoxOptions): PlaneBufferGeometry {
    return new PlaneBufferGeometry(
      options.width,
      options.height,
      options.widthSegments,
      options.heightSegments
    );
  }

}

@NgModule({
  declarations: [
    PlaneBufferGeometryPipe
  ],
  exports: [PlaneBufferGeometryPipe],
  imports: [
    CommonModule
  ],
  providers: []
})
export class PlaneBufferGeometryModule {

}

