import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  AmbientLightModule,
  DirectionalLightModule,
  GltfLoaderModule,
  GroupModule,
  HemisphereLightModule,
  MeshModule,
  OrbitControlsModule,
  PerspectiveCameraModule,
  PlaneBufferGeometryModule,
  SpotlightModule,
  THREE_JS_PROVIDERS,
  ThreeJsPipesModule,
  ThreeJsStageModule
} from 'threejs';
import {NgArrayPipesModule, NgMathPipesModule} from 'ngx-pipes';
import {APP_ROUTING_PROVIDERS} from './app.providers';
import {RouteReuseStrategy} from '@angular/router';
import {CustomReuseStrategy} from './custom-reuse-strategy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThreeJsStageModule,
    OrbitControlsModule,
    PerspectiveCameraModule,
    AmbientLightModule,
    SpotlightModule,
    MeshModule,
    ThreeJsPipesModule,
    GltfLoaderModule,
    PlaneBufferGeometryModule,
    NgMathPipesModule,
    DirectionalLightModule,
    NgArrayPipesModule,
    GroupModule,
    HemisphereLightModule
  ],
  providers: [
    THREE_JS_PROVIDERS,
    APP_ROUTING_PROVIDERS,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
