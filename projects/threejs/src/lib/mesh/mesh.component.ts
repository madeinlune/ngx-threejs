import {ChangeDetectionStrategy, Component, forwardRef, Input, NgModule, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BufferGeometry, Mesh, MeshNormalMaterial} from 'three';
import {ObjectTdComponent} from '../object-td/object-td.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'tjs-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss'],
  providers: [
    {provide: ObjectTdComponent, useExisting: forwardRef(() => MeshComponent)}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeshComponent extends ObjectTdComponent implements OnInit, OnDestroy {

  @Input()
  geometry!: BufferGeometry;

  @Input()
  material!: MeshNormalMaterial;

  @Input()
  castShadow = false;

  @Input()
  receiveShadow = false;


  ngOnInit(): void {

    this.object3D = new Mesh(this.geometry, this.material);
    this.object3D.name = this.name;

  }

  render(): void {
  }

  protected update(changes?: SimpleChanges): void {
    super.update(changes);
    if (this.object3D) {
      if (changes?.material) {
        (this.object3D as Mesh).material = this.material;
      }
      (this.object3D as Mesh).castShadow = this.castShadow;
      (this.object3D as Mesh).receiveShadow = this.receiveShadow;
    }
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
