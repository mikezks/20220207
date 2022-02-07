import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'input[city]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CityValidatorDirective,
    multi: true
  }]
})
export class CityValidatorDirective implements Validator {
  @Input() city: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    const validCities = this.city;

    if (control.value && !validCities.includes(control.value)) {
      return {
        city: {
          actualCity: control.value,
          validCities
        }
      };
    }

    return null;
  }

}
