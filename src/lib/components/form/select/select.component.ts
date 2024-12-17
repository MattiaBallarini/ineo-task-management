import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HostControlDirective,
  IneoErrorStateMatcher,
} from '../../../directives';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ISelectOption } from '../../../interfaces';
import { ErrorMessagePipe } from '../../../pipes';

@Component({
  selector: 'ineo-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    ErrorMessagePipe,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [HostControlDirective],
})
export class SelectComponent {
  public label = input<string>('');
  public placeholder = input<string>('');
  public options = input<ISelectOption[]>([]);
  protected matcher = new IneoErrorStateMatcher();

  protected hcd = inject(HostControlDirective);
}
