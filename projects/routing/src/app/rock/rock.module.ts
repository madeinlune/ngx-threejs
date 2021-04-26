import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RockRoutingModule } from './rock-routing.module';
import { RockComponent } from './rock.component';
import {GroupModule, MeshModule, TextShapeModule, ThreeJsPipesModule} from 'threejs';
import {NgMathPipesModule} from 'ngx-pipes';


@NgModule({
  declarations: [RockComponent],
  imports: [
    CommonModule,
    RockRoutingModule,
    ThreeJsPipesModule,
    MeshModule,
    TextShapeModule,
    GroupModule,
    NgMathPipesModule
  ]
})
export class RockModule { }
