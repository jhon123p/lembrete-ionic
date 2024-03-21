import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageApresentationPageRoutingModule } from './page-apresentation-routing.module';

import { PageApresentationPage } from './page-apresentation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageApresentationPageRoutingModule
  ],
  declarations: [PageApresentationPage]
})
export class PageApresentationPageModule {}
