import { createAction, props } from '@ngrx/store';

export const addAddress = createAction('[Form] Add Address');
export const removeAddress = createAction('[Form] Remove Address', props<{ index: number }>());
export const updateAddress = createAction('[Form] Update Address', props<{ index: number, address: any }>());
export const submitForm = createAction('[Form] Submit Form', props<{ addresses: any[] }>());
export const resetForm = createAction('[Form] Reset Form');
export const clearAllAddresses = createAction('[Form] Clear All Addresses');