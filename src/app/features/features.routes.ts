import { Routes } from '@angular/router';
import { BugTableComponent } from './components/bug-table/bug-table.component';
import { BugCreateEditComponent } from './components/bug-create-edit/bug-create-edit.component';
import { FormDirtyGuard } from '../core/form-dirty.guard';

export const featureRoutes: Routes = [
  {path: 'home', component: BugTableComponent},
  {
    path: 'bug',
    component: BugCreateEditComponent,
    canDeactivate: [FormDirtyGuard]
  },
  {
    path: 'bug/:id',
    component: BugCreateEditComponent,
    canDeactivate: [FormDirtyGuard]
  }
];
