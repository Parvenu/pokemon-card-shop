import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollService } from './services/scroll.service';

@NgModule({
  imports: [MaterialModule],
  exports: [MaterialModule, ReactiveFormsModule],
  providers: [ScrollService],
})
export class SharedModule {}
