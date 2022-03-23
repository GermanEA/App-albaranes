import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbaranPage } from './albaran.page';

const routes: Routes = [
  {
    path: '',
    component: AlbaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbaranPageRoutingModule {}
