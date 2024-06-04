import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    MaterialModule,
    NgxSkeletonLoaderModule.forRoot({ theme: { extendsFromRoot: true, 'background-color': '#444' } }),
  ],
  exports: [MaterialModule, ReactiveFormsModule, NgxSkeletonLoaderModule],
})
export class SharedModule {}
