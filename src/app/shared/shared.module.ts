import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [MaterialModule],
  exports: [MaterialModule, ReactiveFormsModule],
})
export class SharedModule {}
