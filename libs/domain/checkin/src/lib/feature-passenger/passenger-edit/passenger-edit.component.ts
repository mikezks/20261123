import { ChangeDetectionStrategy, Component, inject, input, numberAttribute } from '@angular/core';
import { form, FormField, FormRoot, required, schema } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { PassengerService } from '../../logic-passenger/data-access/passenger.service';
import { Passenger } from '../../logic-passenger/model/passenger';


// (3) Field Logic: Validators, Conditional Disabled, Readonly, Hidden, Metadata
const passengerSchema = schema<Passenger>(passengerPath => {
  required(passengerPath.name, {
    message: 'The lastname is mandatory!'
  });
});

@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-passenger-edit',
  imports: [
    RouterLink,
    // (4) UI Control: Template Binding
    FormField, FormRoot
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  private passengerService = inject(PassengerService);
  protected id = input(0, { transform: numberAttribute });

  // (1) Data Model: Writable Signal
  protected passengerResource = this.passengerService.findByIdAsResource(this.id);

  // (2) Field State: valid, dirty, touched, value
  private readonly editForm = form(
    this.passengerResource.value,
    passengerSchema,
    { submission: { action: async () => this.save() }}
  );

  protected save(): void {
    console.log({
      resource: this.passengerResource.value(),
      form: this.editForm().value()
    });
  }
}
