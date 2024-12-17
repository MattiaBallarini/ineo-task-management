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
import { ErrorMessagePipe } from '../../../pipes';

@Component({
  selector: 'ineo-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ErrorMessagePipe,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [HostControlDirective],
})
export class InputComponent {
  public label = input<string>('');
  public placeholder = input<string>('');
  public type = input<'textarea' | 'text' | 'tel'>('text');
  protected matcher = new IneoErrorStateMatcher();

  protected hcd = inject(HostControlDirective);
}
