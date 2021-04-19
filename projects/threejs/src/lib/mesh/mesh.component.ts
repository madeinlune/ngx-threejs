import {Component, forwardRef, Input, NgModule, OnDestroy, OnInit} from '@angular/core';
import {BufferGeometry, Mesh, MeshNormalMaterial} from 'three';
import {ObjectTdComponent} from '../object-td/object-td.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'tjs-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss'],
  providers: [
    {provide: ObjectTdComponent, useExisting: forwardRef(() => MeshComponent)}
  ]
})
export class MeshComponent extends ObjectTdComponent implements OnInit, OnDestroy {

  @Input()
  geometry!: BufferGeometry;

  @Input()
  material!: MeshNormalMaterial;


  ngOnInit(): void {

    console.log('this.material', this.material);

    this.object3D = new Mesh(this.geometry, this.material);
    this.object3D.castShadow = true;
    this.object3D.name = this.name;

    console.log('this.parent', this.parent);

  }

  render(): void {
  }

}

@NgModule({
  declarations: [
    MeshComponent
  ],
  exports: [MeshComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class MeshModule {

}
