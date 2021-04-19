import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CircleLayoutPipe} from './circle-layout.pipe';
import {BoxBufferGeometryPipe} from './box-buffer-geometry.pipe';
import {Vector3Pipe} from './vector3.pipe';
import {MeshPhongMaterialPipe} from './mesh-phong-material.pipe';
import {SidePipe} from './side.pipe';

export const threeJSPipes = [
  CircleLayoutPipe,
  BoxBufferGeometryPipe,
  MeshPhongMaterialPipe,
  SidePipe,
  Vector3Pipe
];

@NgModule({
  declarations: [
    ...threeJSPipes
  ],
  exports: [
    ...threeJSPipes
  ],
  imports: [
    CommonModule
  ]
})
export class ThreeJsPipesModule {
}
