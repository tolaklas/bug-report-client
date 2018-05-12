import { Routes } from '@angular/router';
import { BugTableComponent } from './features/bug-table/bug-table.component';
import { BugCreateEditComponent } from './features/bug-create-edit/bug-create-edit.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];
