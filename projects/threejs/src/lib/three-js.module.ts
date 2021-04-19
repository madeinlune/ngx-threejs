import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GltfLoaderComponent} from './loaders/gltf-loader/gltf-loader.component';
import {ObjectTdComponent} from './object-td/object-td.component';
import {LightComponent} from './lights/light.component';
import {DirectionalLightComponent} from './lights/directional-light/directional-light.component';
import {Position3dDirective} from './utils/position-3d.directive';
import {TextShapeComponent} from './texts/text-shape/text-shape.component';
import {ThreeJsPortalComponent} from './three-js-portal/three-js-portal.component';
import {ChildrenManagerDirective} from './utils/children-manager.directive';
import { AmbiantLightComponent } from './lights/ambiant-light/ambiant-light.component';


@NgModule({
  declarations: [
    GltfLoaderComponent,
    ObjectTdComponent,
    LightComponent,
    DirectionalLightComponent,
    Position3dDirective,
    TextShapeComponent,
    ThreeJsPortalComponent,
    ChildrenManagerDirective
  ],
  exports: [
    GltfLoaderComponent,
    DirectionalLightComponent,
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
