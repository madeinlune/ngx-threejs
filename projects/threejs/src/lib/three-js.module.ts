import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObjectTdComponent} from './object-td/object-td.component';
import {LightComponent} from './lights/light.component';
import {Position3dDirective} from './utils/position-3d.directive';
import {ThreeJsPortalComponent} from './three-js-portal/three-js-portal.component';


@NgModule({
  declarations: [
    ObjectTdComponent,
    LightComponent,
    Position3dDirective,
    ThreeJsPortalComponent
  ],
  exports: [
    ThreeJsPortalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ThreeJsModule {
}
