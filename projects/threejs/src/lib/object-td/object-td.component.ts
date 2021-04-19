import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Object3D, Vector3} from 'three';

@Component({
  selector: 'tjs-object-td',
  templateUrl: './object-td.component.html',
  styleUrls: ['./object-td.component.css']
})
export class ObjectTdComponent implements OnInit, OnDestroy {

  @Input()
  name: string = '' + Math.random() * 0xFFFFFF;

  #object3D!: Object3D;
  set object3D(value: Object3D) {
    this.#object3D = value;
    this.update();
  }

  get object3D(): Object3D {
    return this.#object3D;
  }

  #position: Vector3 | undefined;
  @Input()
  set position(value: { x: number, y: number, z: number }) {
    this.#position = new Vector3(value.x, value.y, value.z);
    this.update();
  }

  #scale: Vector3 | undefined;
  @Input()
  set scale(value: { x: number, y: number, z: number }) {
    this.#scale = new Vector3(value.x, value.y, value.z);
    this.update();
  }

  #rotation: Vector3 | undefined;
  @Input()
  set rotation(value: { x: number, y: number, z: number }) {
    this.#rotation = new Vector3(value.x, value.y, value.z);
    this.update();
  }

  constructor() {
  }

  ngOnDestroy() {
  }

  ngOnInit(): void {
  }

  protected update(): void {
    this.updatePosition();
    this.updateScale();
    this.updateRotation();
  }

  protected updatePosition(): void {
    if (this.#position && this.object3D) {
      this.object3D.position.set(this.#position.x, this.#position.y, this.#position.z);
    }
  }

  protected updateScale(): void {
    if (this.#scale && this.object3D) {
      this.object3D.scale.set(this.#scale.x, this.#scale.y, this.#scale.z);
    }
  }

  protected updateRotation(): void {
    if (this.#rotation && this.object3D) {
      this.object3D.rotation.set(this.#rotation.x, this.#rotation.y, this.#rotation.z);
    }
  }

}
