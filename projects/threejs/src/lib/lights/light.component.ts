import {Component, OnInit} from '@angular/core';
import {Light} from 'three';
import {ObjectTdComponent} from '../object-td/object-td.component';

@Component({
  selector: 'tjs-light',
  template: ''
})
export class LightComponent extends ObjectTdComponent implements OnInit {

  light: Light | undefined;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
