import { ChangeDetectionStrategy, Component, effect, inject, input, numberAttribute, Signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { signalOperators } from '@flight-demo/shared/core';
import { validatePassengerStatus } from '../../util-validation/passenger-validator/passenger-status.validator';
import { PassengerService } from '../../logic-passenger/data-access/passenger.service';
import { pipe, switchMap } from 'rxjs';
import { initialPassenger } from '../../logic-passenger/model/passenger';


@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  private readonly passengerService = inject(PassengerService);

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  readonly id = input(0, { transform: numberAttribute });
  private passengerResource = this.passengerService.findByIdAsResource(this.id);
  
  constructor() {
    effect(() => {
      if (this.passengerResource.hasValue()) {
        this.editForm.patchValue(this.passengerResource.value());
      }
    });
  }

  protected save(): void {
    this.passengerResource.set(
      this.editForm.getRawValue()
    );
    console.log(this.editForm.value);
  }
}
