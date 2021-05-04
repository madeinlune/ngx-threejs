import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  SkipSelf
} from '@angular/core';
import {Object3D, Vector3} from 'three';
import {ThreeJsParent} from '../models/three-js-parent';
import {ThreeJsService} from '../three-js.service';

export type InteractiveState = 'hover' | 'active' | null;

export interface ObjectTdEvent {
  component: ObjectTdComponent;
}

@Component({
  selector: 'tjs-object-td',
  templateUrl: './object-td.component.html',
  styleUrls: ['./object-td.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectTdComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  interactiveState!: InteractiveState;

  @Input()
  name: string = '' + Math.random() * 0xFFFFFF;

  @Input()
  showHelper!: boolean;

  @Input()
  position!: Vector3;

  @Input()
  scale!: Vector3;

  @Input()
  rotation!: Vector3;

  @Input()
  data!: any;

  @Input()
  isButton = false;

  @Input()
  parentName: string | undefined | null;

  @Output()
  objectHover: EventEmitter<ObjectTdEvent | null> = new EventEmitter<ObjectTdEvent | null>();

  @Output()
  objectClick: EventEmitter<ObjectTdEvent | null> = new EventEmitter<ObjectTdEvent | null>();

  private helper!: Object3D | null;
  #object3D!: Object3D;

  constructor(
    @Optional() @SkipSelf() protected parent: ThreeJsParent,
    protected threeJsService: ThreeJsService
  ) {
  }

  @Input()
  set hovered(hovered: boolean) {
    if (hovered) {
      this.interactiveState = 'hover';
      this.objectHover.emit({component: this});
    } else if (this.interactiveState === 'hover') {
      this.interactiveState = null;
      this.objectHover.emit(null);
    }
  }

  @Input()
  set active(active: boolean) {
    console.log('active', active);
    if (active) {
      this.interactiveState = 'active';
      this.objectClick.emit({component: this});
    } else {
      this.interactiveState = null;
      this.objectClick.emit(null);
    }
  }

  get object3D(): Object3D {
    return this.#object3D;
  }

  set object3D(value: Object3D) {
    this.#object3D = value;
    this.#object3D.userData = {component: this};
    this.update();
  }

  ngOnDestroy(): void {
    this.parent.remove(this, this.parentName);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.parent) {
      this.parent.add(this, this.parentName);
    } else {
      console.warn('no parent for this', this);
    }
    this.update();
    this.updatePosition();
    this.updateScale();
    this.updateRotation();
    this.updateHelper();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update(changes);
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
      }
    } else {
      this.removeHelper();
    }
  }

  protected createHelper(): Object3D | null {
    return null;
  }

  protected removeHelper(): void {
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

}
