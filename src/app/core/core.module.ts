import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './auth/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormDirtyGuard } from './form-dirty.guard';
import { MenuComponent } from './menu/menu.component';

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
  ],
  declarations: [MenuComponent],
  exports: [
    MenuComponent
  ]
})
export class CoreModule { }
