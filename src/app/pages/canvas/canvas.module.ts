import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanvasPageRoutingModule } from './canvas-routing.module';

import { CanvasPage } from './canvas.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanvasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CanvasPage]
})
export class CanvasPageModule {}
