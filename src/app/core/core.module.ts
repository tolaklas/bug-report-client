import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './auth/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormDirtyGuard } from './form-dirty.guard';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    FormDirtyGuard
  ]
})
export class CoreModule { }
