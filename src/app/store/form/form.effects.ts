import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as FormActions from './form.actions';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class FormEffects {
  submitForm$ = createEffect(() => this.actions$.pipe(
    ofType(FormActions.submitForm),
    tap(({ addresses }) => {
      console.log('Form submitted:', addresses);
      // Here you can add API calls or other side effects
    })
  ), { dispatch: false });

  clearAddressesOnNavigation$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    tap((action: RouterNavigationAction) => {
      if (action.payload.routerState.url !== '/dynamic-crud') {
        console.log('Navigating away from dynamic-crud, clearing addresses');
        this.store.dispatch(FormActions.clearAllAddresses());
      }
    })
  ), { dispatch: false });

  constructor(private actions$: Actions, private store: Store<AppState>) {}
}