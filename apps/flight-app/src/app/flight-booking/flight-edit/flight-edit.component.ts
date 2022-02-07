import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { validateCity, validateCityWithParams } from '../../shared/validation/city-validator';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnInit/* , ControlValueAccessor */ {
  id: string | undefined;
  showDetails: string | undefined;
  showWarning = false;

  editForm: FormGroup = this.getInitialForm();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
      this.editForm.patchValue(({
        id: this.id
      }));
    });

    this.editForm.valueChanges.subscribe(console.log);
  }

  decide(answer: boolean) {}

  getInitialForm(): FormGroup {
    return this.fb.group({
      id: [0],
      from: ['Zürich', [
        Validators.required,
        Validators.minLength(3),
        validateCity
      ]],
      to: ['Torino', [
        Validators.required,
        Validators.minLength(3),
        validateCityWithParams([
          'Torino', 'Basel'
        ])
      ]],
      flights: [{
        id: 0,
        from: 'Wien'
      }],
      date: [new Date().toISOString()]
    });
  }

  save(): void {
    console.log('value', this.editForm.value);
    console.log('valid', this.editForm.valid);
    console.log('dirty', this.editForm.dirty);
    console.log('touched', this.editForm.touched);
  }
}
