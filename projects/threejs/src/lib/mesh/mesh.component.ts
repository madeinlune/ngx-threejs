import {Component, ElementRef, forwardRef, Input, NgModule, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {BufferGeometry, Mesh, MeshNormalMaterial} from 'three';
import {ThreeJsService} from '../three-js.service';
import {ObjectTdComponent} from '../object-td/object-td.component';
import {CommonModule} from '@angular/common';
import {ThreeJsParent} from '../models/three-js-parent';

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

  constructor(
    @Optional() @SkipSelf() private parent: ThreeJsParent,
    private hostElement: ElementRef,
    private threeJsService: ThreeJsService
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.parent.remove(this);
  }

  ngOnInit(): void {

    console.log('this.material', this.material);

    this.object3D = new Mesh(this.geometry, this.material);
    this.object3D.castShadow = true;
    this.object3D.name = this.name;
    this.parent.add(this);

    this.threeJsService.addRenderer(this);

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
