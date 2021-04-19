import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'tjs-ambiant-light',
  templateUrl: './ambiant-light.component.html',
  styleUrls: ['./ambiant-light.component.css']
})
export class AmbiantLightComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [
    AmbiantLightComponent
  ],
  exports: [AmbiantLightComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class AmbiantLightModule {

}
