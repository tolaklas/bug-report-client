import { Routes } from '@angular/router';
import { BugTableComponent } from './widgets/bug-table/bug-table.component';
import { BugCreateEditComponent } from './widgets/bug-create-edit/bug-create-edit.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: BugTableComponent},
  {path: 'bug', component: BugCreateEditComponent},
];
