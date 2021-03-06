import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BugCreateEditComponent } from './components/bug-create-edit/bug-create-edit.component';
import { BugTableComponent } from './components/bug-table/bug-table.component';
import { RouterModule } from '@angular/router';
import { featureRoutes } from './features.routes';
import { HttpService } from './services/http.service';
import { BugCommentComponent } from './components/bug-comment/bug-comment.component';
import { BugCommentTableComponent } from './components/bug-comment-table/bug-comment-table.component';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(featureRoutes)
  ],
  declarations: [
    BugCreateEditComponent,
    BugTableComponent,
    BugCommentComponent,
    BugCommentTableComponent,
  ],
  providers: [
    HttpService
  ]
})
export class FeaturesModule { }
