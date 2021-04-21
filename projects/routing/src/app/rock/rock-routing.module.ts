import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RockComponent } from './rock.component';

const routes: Routes = [{ path: '', component: RockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RockRoutingModule { }
