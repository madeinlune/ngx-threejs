import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObjectTdComponent} from './object-td/object-td.component';
import {LightComponent} from './lights/light.component';
import {Position3dDirective} from './utils/position-3d.directive';
import {TextShapeComponent} from './texts/text-shape/text-shape.component';
import {ThreeJsPortalComponent} from './three-js-portal/three-js-portal.component';
import {ChildrenManagerDirective} from './utils/children-manager.directive';


@NgModule({
  declarations: [
    ObjectTdComponent,
    LightComponent,
    Position3dDirective,
    TextShapeComponent,
    ThreeJsPortalComponent,
    ChildrenManagerDirective
  ],
  exports: [
    TextShapeComponent,
    ThreeJsPortalComponent,
    ChildrenManagerDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ThreeJsModule {
}
