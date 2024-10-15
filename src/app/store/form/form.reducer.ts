import { createReducer, on } from '@ngrx/store';
import * as FormActions from './form.actions';

export interface FormState {
  addresses: any[];
}

export const initialState: FormState = {
  addresses: []
};

export const formReducer = createReducer(
  initialState,
  on(FormActions.addAddress, state => ({
    ...state,
    addresses: [...state.addresses, {}]
  })),
  on(FormActions.removeAddress, (state, { index }) => ({
    ...state,
    addresses: state.addresses.filter((_, i) => i !== index)
  })),
  on(FormActions.updateAddress, (state, { index, address }) => ({
    ...state,
    addresses: state.addresses.map((addr, i) => i === index ? address : addr)
  })),
  on(FormActions.submitForm, (state, { addresses }) => ({
    ...state,
    addresses
  })),
  on(FormActions.resetForm, () => initialState),
  on(FormActions.clearAllAddresses, () => ({ ...initialState }))
);