import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MeshModule, OrbitControlsModule, PointLightModule, ThreeJsPipesModule, ThreeJsStageModule} from 'threejs';
import {PerspectiveCameraModule} from '../../../threejs/src/lib/cameras/perspective-camera/perspective-camera.component';

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
    PerspectiveCameraModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
