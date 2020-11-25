import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbaranPageRoutingModule } from './albaran-routing.module';

import { AlbaranPage } from './albaran.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbaranPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AlbaranPage]
})
export class AlbaranPageModule {}
