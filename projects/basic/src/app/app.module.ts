import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {
    AmbientLightModule, DirectionalLightModule,
    MeshModule,
    OrbitControlsModule,
    PerspectiveCameraModule,
    PointLightModule,
    SpotlightModule, THREE_JS_PROVIDERS,
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
        SpotlightModule,
        DirectionalLightModule
    ],
  providers: [
    THREE_JS_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
