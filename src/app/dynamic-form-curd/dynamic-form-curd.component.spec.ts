import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormCurdComponent } from './dynamic-form-curd.component';

describe('DynamicFormCurdComponent', () => {
  let component: DynamicFormCurdComponent;
  let fixture: ComponentFixture<DynamicFormCurdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormCurdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormCurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
