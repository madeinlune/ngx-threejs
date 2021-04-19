import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {
  AmbientLightModule,
  MeshModule,
  OrbitControlsModule,
  PerspectiveCameraModule,
  PointLightModule,
  SpotlightModule,
  ThreeJsPipesModule,
  ThreeJsStageModule
} from 'threejs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ThreeJsPipesModule,
    ThreeJsStageModule,
    MeshModule,
    PointLightModule,
    OrbitControlsModule,
    PerspectiveCameraModule,
    AmbientLightModule,
    SpotlightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
