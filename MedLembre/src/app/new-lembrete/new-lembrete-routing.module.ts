import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewLembretePage } from './new-lembrete.page';

const routes: Routes = [
  {
    path: '',
    component: NewLembretePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewLembretePageRoutingModule {}
