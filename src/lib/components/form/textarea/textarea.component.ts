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
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ineo-textarea',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [HostControlDirective],
})
export class TextareaComponent {
  public label = input<string>('');
  public placeholder = input<string>('');
  protected matcher = new IneoErrorStateMatcher();

  protected hcd = inject(HostControlDirective);
}
