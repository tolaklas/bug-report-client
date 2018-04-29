import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BugTableComponent } from './widgets/bug-table/bug-table.component';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    BugTableComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
