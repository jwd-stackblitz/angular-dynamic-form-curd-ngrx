import { RouterReducerState } from '@ngrx/router-store';
import { FormState } from './form/form.reducer';

export interface AppState {
  router: RouterReducerState;
  form: FormState;
}