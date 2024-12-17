import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  HostControlDirective,
  IneoErrorStateMatcher,
} from '../../../directives';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ErrorMessagePipe } from '../../../pipes';

@Component({
  selector: 'ineo-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ErrorMessagePipe,
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [HostControlDirective],
  providers: [provideNativeDateAdapter()],
})
export class DatepickerComponent {
  public label = input<string>('');
  public placeholder = input<string>('');
  public minDate = input<Date | undefined>();
  public maxDate = input<Date | undefined>();

  protected matcher = new IneoErrorStateMatcher();
  protected hcd = inject(HostControlDirective);
}
