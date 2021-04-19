import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {Object3D, Vector3} from 'three';
import {ThreeJsParent} from '../models/three-js-parent';

@Component({
  selector: 'tjs-object-td',
  templateUrl: './object-td.component.html',
  styleUrls: ['./object-td.component.css']
})
export class ObjectTdComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input()
  name: string = '' + Math.random() * 0xFFFFFF;

  @Input()
  showHelper!: boolean;

  private helper!: Object3D | null;

  #object3D!: Object3D;
  set object3D(value: Object3D) {
    this.#object3D = value;
    this.update();
  }

  get object3D(): Object3D {
    return this.#object3D;
  }

  @Input()
  position!: Vector3;

  @Input()
  scale!: Vector3;

  @Input()
  rotation!: Vector3;

  constructor(
    @Optional() @SkipSelf() protected parent: ThreeJsParent
  ) {
  }

  ngOnDestroy(): void {
    this.parent.remove(this);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.update();
    this.updatePosition();
    this.updateScale();
    this.updateRotation();
    this.updateHelper();
    if (this.parent) {
      this.parent.add(this);
    } else {
      console.warn('no parent for this light', this);
    }
  }

  protected update(changes?: SimpleChanges): void {
    if (changes?.position) {
      this.updatePosition();
    }
    if (changes?.scale) {
      this.updateScale();
    }
    if (changes?.rotation) {
      this.updateRotation();
    }
    if (changes?.showHelper) {
      this.updateHelper();
    }
  }

  protected updateHelper(): void {
    if (this.showHelper) {
      this.helper = this.createHelper();
      if (this.object3D && this.helper) {
        this.object3D.add(this.helper);
        console.log('updateHelper() this.object3D', this.object3D);
      }
    } else {
      this.removeHelper();
    }
  }

  protected createHelper(): Object3D | null {
    return null;
  }

  protected removeHelper(): void {
    console.log('removeHelper() this.helper', this.helper);
    if (!!this.helper) {
      // TODO if object exists before trying to remove it from parent
      this.object3D.remove(this.helper);
    }
  }

  protected updatePosition(): void {
    if (this.position && this.object3D) {
      this.object3D.position.set(this.position.x, this.position.y, this.position.z);
    }
  }

  protected updateScale(): void {
    if (this.scale && this.object3D) {
      this.object3D.scale.set(this.scale.x, this.scale.y, this.scale.z);
    }
  }

  protected updateRotation(): void {
    if (this.rotation && this.object3D) {
      this.object3D.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update(changes);
  }

}
