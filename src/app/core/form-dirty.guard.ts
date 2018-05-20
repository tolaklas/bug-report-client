import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { BugCreateEditComponent } from '../features/components/bug-create-edit/bug-create-edit.component';

@Injectable()
export class FormDirtyGuard implements CanDeactivate<BugCreateEditComponent> {

  canDeactivate(component: BugCreateEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean {

                  if (!component.canDeactivate()) {
                    return window.confirm('Are you sure you want to leave the page?');
                  }
                  return true;
                }
}
