import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NewLembretePageRoutingModule } from './new-lembrete-routing.module';

import { NewLembretePage } from './new-lembrete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewLembretePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewLembretePage]
})
export class NewLembretePageModule {}
