import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPhotosModalComponent } from './components/upload-photos-modal/upload-photos-modal.component';

@NgModule({
  declarations: [UploadPhotosModalComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UploadPhotosModalComponent
  ]
})
export class UploadPhotosModalModule { }
