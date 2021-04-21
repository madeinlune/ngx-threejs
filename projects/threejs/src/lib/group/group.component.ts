import {Component, forwardRef, NgModule, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObjectTdComponent} from '../object-td';
import {Group} from 'three';
import {ThreeJsParent} from '../models/three-js-parent';

@Component({
  selector: 'tjs-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [
    {provide: ObjectTdComponent, useExisting: forwardRef(() => GroupComponent)},
    {provide: ThreeJsParent, useExisting: forwardRef(() => GroupComponent)}
  ]
})
export class GroupComponent extends ObjectTdComponent implements OnInit, OnDestroy, ThreeJsParent {

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnInit(): void {
    this.object3D = new Group();
    this.object3D.name = this.name;
  }

  add(o: ObjectTdComponent, parentName?: string): void {
    if (parentName) {
      this.object3D.getObjectByName(parentName)?.add(o.object3D);
    } else {
      this.object3D.add(o.object3D);
    }
  }

  remove(o: ObjectTdComponent, parentName?: string): void {
    if (parentName) {
      this.object3D.getObjectByName(parentName)?.remove(o.object3D);
    } else {
      this.object3D.remove(o.object3D);
    }
  }

}

@NgModule({
  declarations: [
    GroupComponent
  ],
  exports: [GroupComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class GroupModule {

}
