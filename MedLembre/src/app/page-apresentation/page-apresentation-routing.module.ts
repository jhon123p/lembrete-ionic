import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageApresentationPage } from './page-apresentation.page';

const routes: Routes = [
  {
    path: '',
    component: PageApresentationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageApresentationPageRoutingModule {}
