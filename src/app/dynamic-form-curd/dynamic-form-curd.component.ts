import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as FormActions from '../store/form/form.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-form-curd',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-form-curd.component.html',
  styleUrl: './dynamic-form-curd.component.css',
})
export class DynamicFormCurdComponent implements OnInit, OnDestroy {
  addressForm: FormGroup;
  states: string[] = ['California', 'New York', 'Illinois', 'Texas', 'Florida'];
  cities: { [key: string]: string[] } = {
    'California': ['Los Angeles', 'San Francisco', 'San Diego'],
    'New York': ['New York City', 'Buffalo', 'Albany'],
    'Illinois': ['Chicago', 'Springfield', 'Peoria'],
    'Texas': ['Houston', 'Austin', 'Dallas'],
    'Florida': ['Miami', 'Orlando', 'Tampa']
  };
  countries: string[] = ['United States', 'Canada', 'Mexico'];
  private storeSubscription: Subscription;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.addressForm = this.fb.group({
      addresses: this.fb.array([])
    });
  }

  ngOnInit() {
    this.storeSubscription = this.store.select(state => state.form.addresses).subscribe(addresses => {
      console.log('Addresses updated:', addresses);
      const addressFormArray = this.addressForm.get('addresses') as FormArray;
      addressFormArray.clear();
      addresses.forEach(address => addressFormArray.push(this.createAddress(address)));
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  createAddress(address: any = {}): FormGroup {
    const addressGroup = this.fb.group({
      address: [address.address || '', [Validators.required, Validators.minLength(5)]],
      state: [address.state || '', Validators.required],
      city: [address.city || '', Validators.required],
      country: [address.country || '', Validators.required],
      zip: [address.zip || '', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    });

    addressGroup.valueChanges.subscribe(value => {
      const index = (this.addressForm.get('addresses') as FormArray).controls.indexOf(addressGroup);
      this.store.dispatch(FormActions.updateAddress({ index, address: value }));
    });

    return addressGroup;
  }

  get addresses(): FormArray {
    return this.addressForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.store.dispatch(FormActions.addAddress());
  }

  removeAddress(index: number): void {
    this.store.dispatch(FormActions.removeAddress({ index }));
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.store.dispatch(FormActions.submitForm({ addresses: this.addressForm.value.addresses }));
    } else {
      this.markFormGroupTouched(this.addressForm);
    }
  }

  clearAllAddresses(): void {
    this.store.dispatch(FormActions.clearAllAddresses());
  }

  getCitiesForState(state: string): string[] {
    return this.cities[state] || [];
  }

  // Helper method to mark all controls in a form group as touched
  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  // Helper methods for template
  isInvalid(addressGroup: FormGroup, controlName: string): boolean {
    const control = addressGroup.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  getErrorMessage(addressGroup: FormGroup, controlName: string): string {
    const control = addressGroup.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength}`;
      }
      if (control.errors['pattern']) {
        return 'Invalid format';
      }
    }
    return '';
  }
}